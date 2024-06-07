const knex = require('../database/index');

module.exports = {
  async getProdutos(req,res){

    try{

      let produtos = await knex('produtos');

      res.send(produtos).status(200);

    }catch(error){
      console.log(error);
    }    

  },
  async createProduto(req,res){
    try{  

      if (!req.body || !req.body.pro_nome || !req.body.pro_descri || !req.body.pro_fabricante || !req.body.pro_qtda || !req.body.pro_preco) {
        console.log('Dados incompletos:', req.body);
        return res.status(400).send('Dados incompletos');
      }

      await knex('produtos').insert({
        pro_nome: req.body.pro_nome,
        pro_descri: req.body.pro_descri,
        pro_fabricante: req.body.pro_fabricante,
        pro_qtda: req.body.pro_qtda,
        pro_preco: req.body.pro_preco
      })
      res.send('produto cadastrado').status(200);
    }catch(error){
      console.log(error);
    }
  }, 
  async updateProduto(req, res){
    try{

      const newData = {
        pro_nome: req.body.pro_nome,
        pro_descri: req.body.pro_descri,
        pro_fabricante: req.body.pro_fabricante,
        pro_qtda: req.body.pro_qtda,
        pro_preco: req.body.pro_preco
      }

      await knex('produtos')
        .where({ pro_cod: req.params.pro_cod })
        .update(newData);
      
      res.send('Produto alterado com sucesso').status(200)

    }catch(error){
      console.log(error);
    }
  },
  async deleteProduto(req, res) {
    let produto = knex("produtos").where("pro_cod", req.params.pro_cod).select('pro_nome');

    produto.then(async (resultado) => {
        if (resultado.length > 0) {
            let nomeDoProduto = resultado[0].pro_nome;
            await knex("produtos")
                .where("pro_cod", req.params.pro_cod)
                .delete();
            res.send(`O produto ${nomeDoProduto} foi deletado com sucesso!`).status(200);
        } else {
            console.log('Nenhum produto encontrado com esse código');
            res.status(404).send('Nenhum produto encontrado com esse código');
        }
    }).catch((erro) => {
        console.error('Erro ao deletar produto:', erro);
        res.status(500).send('Erro ao deletar produto');
    });
}
}