import Categoria from "../models/Categoria.js";

 const CategoriaController = {
  create: async (req, res) => {
    try {
      const categoria = await Categoria.create(req.body);
      res.status(201).json(categoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
   },
  findAll: async (req, res) => { 
    try
    {
      const categorias = await Categoria.findAll();
      if (categorias.length === 0) {
        throw new Error('Nenhuma categoria encontrada');
      }
      res.status(200).json(categorias);
    }catch (error) {
      res.status(500).json({ error: error.message });
    }
   },

  findById: async (req, res) => { 
    try{
        const categoria = await Categoria.findByPk(req.params.id);
        if (categoria) {
          res.status(200).json(categoria);
        } else {
          res.status(404).json({ error: 'Categoria nao encontrada' });
        }
    }catch(error){
      res.status(500).json({ error: error.message });
    }
   },
  update: async (req, res) => {
    try{
        const categoria = await Categoria.findByPk(req.params.id);
        if (categoria) {
          await categoria.update(req.body);
          res.status(200).json(categoria);
        } else {
          res.status(404).json({ error: 'Categoria nao encontrada' });
        }
    }catch(error){
      res.status(500).json({ error: error.message });
    }
  },
  delete: async (req, res) => { 
    try{
        const categoria = await Categoria.findByPk(req.params.id);
        if (categoria) {
          await categoria.destroy();
          res.status(200).json({ message: 'Categoria excluida com sucesso' });
        } else {
          res.status(404).json({ error: 'Categoria nao encontrada' });
        }
    }catch(error){
      res.status(500).json({ error: error.message });
    }
  },
  restaure : async (req,res) =>{
    try{
        const categoria = await Categoria.findByPk(req.params.id, {paranoid : false});
        if (categoria){
            await categoria.restore();
            res.status(200).json({ message: 'Categoria restaurada com sucesso' });
        }else{
            res.status(404).json({ error: 'Categoria nao encontrada' });
        }
    }catch(error){
        res.status(500).json({ error: error.message });
    }
  }
};

export default CategoriaController;