import Pedido from "../models/Pedido.js";

const PedidoController = {
    create : async (req, res) =>{
        try{
            const pedido = await Pedido.create(req.body);
            res.status(201).json(pedido);
        }catch(error){
            res.status(500).json({ error: error.message });
        }
    },

    findAll : async (req,res) =>{
        try{
            const pedidos = await Pedido.findAll();
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