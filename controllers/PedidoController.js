import Pedido from "../models/Pedido.js";
import Entrega from "../models/Entrega.js";
import Avaliacao from "../models/Avaliacao.js";

const PedidoController = {
    create : async (req, res) =>{
        try{
            const pedido = await Pedido.create(req.body);
            const pedidoComRelacoes = await Pedido.findByPk(pedido.id, {
                include: [
                    {
                        model: Entrega,
                        as: 'entrega'
                    },
                    {
                        model: Avaliacao,
                        as: 'avaliacoes'
                    }
                ]
            });
            res.status(201).json(pedidoComRelacoes);
        }catch(error){
            res.status(500).json({ error: error.message });
        }
    },

    findAll : async (req,res) =>{
        try{
            const pedidos = await Pedido.findAll({
                include: [
                    {
                        model: Entrega,
                        as: 'entrega'
                    },
                    {
                        model: Avaliacao,
                        as: 'avaliacoes'
                    }
                ]
            });
            if (pedidos.length === 0){
                throw new Error("Não há pedidos");
            }
            res.status(200).json(pedidos);  
        }
        catch(error){
            res.status(500).json({ error: error.message });
        }
    }

};

export default PedidoController;