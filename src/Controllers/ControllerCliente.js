const knex = require('../database/index');

module.exports = {
  async getClientes(req, res) {
    try {
      const clientes = await knex('cliente').select('*');
      return res.status(200).json(clientes);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao obter clientes' });
    }
  },

  async getClientesSpecify(req, res) {
    try {
      let cli_pass = req.params.cli_pass;
      const cli_qtdavendas = await knex('cliente')
        .where('cli_password', cli_pass)
        .select('*');

      if (cli_qtdavendas.length === 0) {
        return res.status(404).send('Cliente não encontrado');
      }

      return res.status(200).json(cli_qtdavendas);
    } catch (error) {
      console.error('Erro ao obter a quantidade de vendas do cliente:', error);
      return res.status(500).send('Erro ao obter a quantidade de vendas do cliente');
    }
  },

  async createCliente(req, res) {
    try {
      console.log('Dados recebidos:', req.body);

      const { cli_nome, cli_email, cli_tel, cli_password } = req.body;

      if (!cli_nome || !cli_email || !cli_tel || !cli_password) {
        console.log('Dados incompletos:', req.body);
        return res.status(400).json({ error: 'Dados incompletos' });
      }

      await knex('cliente').insert({
        cli_nome: cli_nome.toLowerCase(),
        cli_email: cli_email.toLowerCase(),
        cli_tel: cli_tel.toLowerCase(),
        cli_password: cli_password.toLowerCase()
      });

      const resp = {
        msg: 'CLIENTE CADASTRADO!!!',
        cli_nome,
        cli_email,
        cli_tel
      };

      return res.status(201).json(resp);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao cadastrar cliente' });
    }
  },

  async updateCliente(req, res) {
    try {
      const { cli_nome, cli_email, cli_tel } = req.body;
      const { cli_cod } = req.params;

      if (!cli_nome || !cli_email || !cli_tel) {
        console.log('Dados incompletos:', req.body);
        return res.status(400).json({ error: 'Dados incompletos' });
      }

      const updatedRows = await knex('cliente')
        .where({ cli_cod })
        .update({ cli_nome, cli_email, cli_tel });

      if (updatedRows === 0) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      return res.status(200).json({ msg: 'Cliente atualizado com sucesso' });
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      return res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
  },

  async deleteCliente(req, res) {
    try {
      const { cli_cod } = req.params;

      const cliente = await knex('cliente').where({ cli_cod }).first();

      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      await knex('cliente').where({ cli_cod }).delete();

      return res.status(200).json({ msg: `A conta de ${cliente.cli_nome} foi deletada com sucesso!` });
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
      return res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
  }
};
