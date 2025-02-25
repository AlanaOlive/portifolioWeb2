const Keyword = require('../../model/keywords_model');

class KeywordsClass{
    async addKeyword(req,res) {
        try {
            const { keyword, active, last_update } = req.body;
            const newKeyword = await Keyword.create({ keyword, active, last_update }); 
            return res.status(201).json(newKeyword);          
          } catch (error) {
            console.log({ error: 'Erro ao criar palavra-chave', details: error.message });
            return res.status(500).json({ message: 'Erro ao criar palavra-chave.' });
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
          const { id } = req.params;
          const { keyword, active, last_update } = req.body;
      
          const keywords = await Keyword.findByPk(id);
          if (keywords) {
            keywords.keyword = keyword || keywords.keyword;
            keywords.active = active || keywords.active;
            keywords.last_update = new Date();
            
            await keywords.save();
            return res.status(200).json(keywords);
          } else {
            return res.status(404).json({ message: 'Palavra-chave não encontrada.' });
          }
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Erro ao atualizar palavra-chave.' });
        }
    }

    async deleteKeyword(req,res){
      try {
        const { id } = req.params;
        const keyword = await Keyword.findByPk(id);
        if (keyword) {
          keyword.active = 0;
          keyword.last_update = new Date();
          keyword.save()
          return res.status(200).json({ message: 'Palavra-chave deletada com sucesso.' });
        } else {
          return res.status(404).json({ message: 'Palavra-chave não encontrada.' });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao deletar palavra-chave.' });
      }
    }
}

module.exports = KeywordsClass;