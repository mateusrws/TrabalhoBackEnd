const knex = require('../database/index');

module.exports = {  
    async getVendas(req,res){
      try{
        
        let vendas = await knex('vendas')

        res.send(vendas).status(200)
      }catch(error){
        console.log(error);
      }
    },
    async createVendas(req,res){
      try {
        
        let respostaProduto = await knex('produtos').select('pro_qtda')
        let respostaCliente = await knex('cliente').where('cli_cod', req.body.cli_cod).select('cli_qtdavendas')
        
        let a = respostaProduto[0].pro_qtda - req.body.ven_qtda

        await knex('produtos').where('pro_cod', req.body.pro_cod).update({
          pro_qtda: a
        })
        await knex('cliente').where('cli_cod', req.body.cli_cod).update({
          cli_qtdavendas: respostaCliente[0].cli_qtdavendas + 1
        })

        await knex('vendas').insert({
          "ven_valor": req.body.ven_valor,
          "pro_cod": req.body.pro_cod,
          "cli_cod": req.body.cli_cod,
          "ven_qtda": req.body.ven_qtda
        })

        

        res.send("Venda feita com sucesso!").status(200)
      } catch (error) {
        console.log(error);
      }
    }
}