const knex = require('../database/index');

module.exports = {
  async getClientes(req, res) {
    try {
      const clientes = await knex('cliente').select('*'); 

      return res.status(200).send(clientes);
    } catch (err) {
      console.error(err); 
      return res.status(500).send('Erro ao obter clientes');
    }
  },
  async createCliente(req, res) {
    try {
      console.log('Dados recebidos:', req.body); // Adiciona um log para verificar o corpo da solicitação
  
      if (!req.body || !req.body.cli_nome || !req.body.cli_email || !req.body.cli_tel) {
        console.log('Dados incompletos:', req.body); // Adiciona um log para dados incompletos
        return res.status(400).send('Dados incompletos');
      }
  
      await knex('cliente').insert({
        cli_nome: req.body.cli_nome,
        cli_email: req.body.cli_email,
        cli_tel: req.body.cli_tel
      });
  
      const resp = {
        msg: 'CLIENTE CADASTRADO!!!',
        cli_nome: req.body.cli_nome,
        cli_email: req.body.cli_email,
        cli_tel: req.body.cli_tel
      };
  
      return res.status(201).send(resp);
    } catch (err) {
      console.error(err);
      return res.status(500).send('Erro ao cadastrar cliente');
    }
  }, 
  async updateCliente(req,res){
    try{

      

      knex('cliente')
      .where({cli_cod: req.body.cli_cod})
      .update();

    }catch (error) {
      console.error('Erro ao atualizar cliente:', error);
    }
  }
}