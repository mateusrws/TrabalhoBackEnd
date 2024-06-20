const knex = require('../database/index');

module.exports = {
  async login(req, res) {
    try {
      const result = await knex('cliente')
        .where('cli_nome', req.body.cli_nome)
        .select('cli_password');
      
      if (result.length == 0) {
        return res.status(404).send('Este usuário não existe');
      }

      const senhaCliente = result[0].cli_password;
      
      if (senhaCliente === req.body.cli_password) {
        return res.status(200).send('Acesso Liberado');
      } else {
        return res.status(401).send('Senha incorreta');
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send('Erro interno do servidor');
    }
  }
};