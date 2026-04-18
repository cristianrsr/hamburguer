import Categoria from "../models/Categoria.js";
import Produto from "../models/Produto.js";

 const CategoriaController = {
  create: async (req, res) => {
    try {
      const categoria = await Categoria.create(req.body);
      const categoriaComProdutos = await Categoria.findByPk(categoria.id, {
        include: {
          model: Produto,
          as: 'produtos'
        }
      });
      res.status(201).json(categoriaComProdutos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
   },
  findAll: async (req, res) => { 
    try
    {
      const categorias = await Categoria.findAll({
        include: {
          model: Produto,
          as: 'produtos'
        }
      });
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
        const categoria = await Categoria.findByPk(req.params.id, {
          include: {
            model: Produto,
            as: 'produtos'
          }
        });
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
          const categoriaAtualizada = await Categoria.findByPk(req.params.id, {
            include: {
              model: Produto,
              as: 'produtos'
            }
          });
          res.status(200).json(categoriaAtualizada);
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