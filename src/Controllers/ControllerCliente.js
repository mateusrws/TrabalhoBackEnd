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
  async updateCliente(req, res) {
    try {
      const newData = {
        cli_nome: req.body.cli_nome,
        cli_email: req.body.cli_email,
        cli_tel: req.body.cli_tel
      };

      await knex('cliente')
        .where({ cli_cod: req.params.cli_cod }) // Use req.params para acessar os parâmetros da URL
        .update(newData);

      res.status(200).send('Cliente atualizado com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      res.status(500).send('Erro ao atualizar cliente');
    }
  },
  async deleteCliente(req,res){
    try{
      let Cliente = knex("cliente").where("cli_cod", req.params.cli_cod).select('cli_nome')

      Cliente.then( async (resultado) => {
        if (resultado.length > 0) {
            let nomeDoCliente = resultado[0].cli_nome;
            await knex("cliente")
            .where("cli_cod",req.params.cli_cod)
            .delete();
            res.send(`A conta de ${nomeDoCliente} foi deletada com sucesso!`).status(200)
        } else {
            console.log('Nenhum cliente encontrado com esse código');
        }
    }).catch((erro) => {
        console.error('Erro ao acessar o nome do cliente:', erro);
    });

      
    }catch(error){
      console.log("ERRO AO DELETAR CLIENTE",error);
    }
  }
}
