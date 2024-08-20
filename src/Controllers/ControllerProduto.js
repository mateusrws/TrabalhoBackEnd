const knex = require('../database/index');

module.exports = {
  async getProdutos(req, res) {
    try {
      const produtos = await knex('produtos').select('*');
      return res.status(200).json(produtos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao obter produtos' });
    }
  },

  async getProdutoSpecify(req, res) {
    try {
      const { pro_cod } = req.params;

      const produto = await knex('produtos')
        .where({ pro_cod })
        .first();

      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      return res.status(200).json(produto);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao obter o produto' });
    }
  },

  async createProduto(req, res) {
    try {
      const { pro_nome, pro_descri, pro_fabricante, pro_qtda, pro_preco } = req.body;

      if (!pro_nome || !pro_descri || !pro_fabricante || !pro_qtda || !pro_preco) {
        console.log('Dados incompletos:', req.body);
        return res.status(400).json({ error: 'Dados incompletos' });
      }

      await knex('produtos').insert({
        pro_nome: pro_nome.toLowerCase(),
        pro_descri: pro_descri.toLowerCase(),
        pro_fabricante: pro_fabricante.toLowerCase(),
        pro_qtda,
        pro_preco
      });

      return res.status(201).json({ message: 'Produto cadastrado com sucesso' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao cadastrar produto' });
    }
  },

  async updateProduto(req, res) {
    try {
      const { pro_nome, pro_descri, pro_fabricante, pro_qtda, pro_preco } = req.body;
      const { pro_cod } = req.params;

      const updatedRows = await knex('produtos')
        .where({ pro_cod })
        .update({ pro_nome, pro_descri, pro_fabricante, pro_qtda, pro_preco });

      if (updatedRows === 0) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      return res.status(200).json({ message: 'Produto alterado com sucesso' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
  },

  async deleteProduto(req, res) {
    try {
        const { pro_cod } = req.params;

        // Primeiro, exclua as vendas associadas
        await knex('vendas')
            .where({ pro_cod })
            .del();

        // Agora, exclua o produto
        const deletedRows = await knex('produtos')
            .where({ pro_cod })
            .del();

        if (deletedRows === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        return res.status(200).json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        return res.status(500).json({ error: 'Erro ao deletar produto' });
    }
  }
};
