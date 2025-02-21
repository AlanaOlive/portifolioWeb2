const Keyword = require('../../model/keywords_model');

class KeywordsClass{
    async addKeyword(req,res) {
        try {
            const { keyword, active, last_update } = req.body;
            const newKeyword = await Keyword.create({ keyword, active, last_update });           
          } catch (error) {
            console.log({ error: 'Erro ao criar palavra-chave', details: error.message });
          }
    }

    async getAllKeywords(req,res){
        try {
            const keywords = await Keyword.findAll(
                {
                    where:{
                        active:1
                    }
                }                
            );            
            return keywords;
          } catch (error) {
            console.log({ error: 'Erro ao listar palavras-chave', details: error.message });
          }
    }

    async getKeywordById(req,res){
        try {
            const keyword = await Keyword.findByPk(req.params.id);
            if (!keyword) {
              console.log({ error: 'Palavra-chave não encontrada' });
            }
            return keyword;
          } catch (error) {
            console.error({ error: 'Erro ao buscar palavra-chave', details: error.message });
          }
    }

    async updateKeyword(req,res){
        try {
            const { keyword, active, last_update } = req.body;
            const updatedKeyword = await Keyword.update(
              { keyword, active, last_update },
              { where: { id: req.params.id }, returning: true }
            );
            if (updatedKeyword[0] === 0) {
              console.log({ error: 'Palavra-chave não encontrada' });
            }
            console.log(updatedKeyword[1][0]);
          } catch (error) {
            console.log({ error: 'Erro ao atualizar palavra-chave', details: error.message });
          }
    }

    async deleteKeyword(req,res){
        try {
            const id_keyword = req.params.id;
            const keyword = await Keyword.findByPk(id);
            if (!deletedKeyword) {
              console.log({ error: 'Palavra-chave não encontrada' });
            }
            keyword.active = 0;
            keyword.last_update = new Date();
            alert({ message: 'Palavra-chave excluída com sucesso' });
          } catch (error) {
            console.error({ error: 'Erro ao excluir palavra-chave', details: error.message });
          }
    }
}

module.exports = KeywordsClass;
