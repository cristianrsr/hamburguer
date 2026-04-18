import Avaliacao from "../models/Avaliacao.js";
import Pedido from "../models/Pedido.js";

const AvaliacaoController = {
    create: async (req, res) => {
        try {
            const avaliacao = await Avaliacao.create(req.body);
            res.status(201).json(avaliacao);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    findAll: async (req, res) => {
        try {
            const avaliacoes = await Avaliacao.findAll({
                include: {
                    model: Pedido,
                    as: 'pedido'
                }
            });
            if (avaliacoes.length === 0) {
                throw new Error("Não há avaliações");
            }
            res.status(200).json(avaliacoes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    findById: async (req, res) => {
        try {
            const avaliacao = await Avaliacao.findByPk(req.params.id, {
                include: {
                    model: Pedido,
                    as: 'pedido'
                }
            });
            if (avaliacao) {
                res.status(200).json(avaliacao);
            } else {
                res.status(404).json({ error: 'Avaliação não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    findByPedido: async (req, res) => {
        try {
            const avaliacoes = await Avaliacao.findAll({
                where: { pedido_id: req.params.pedido_id },
                include: {
                    model: Pedido,
                    as: 'pedido'
                }
            });
            if (avaliacoes.length === 0) {
                throw new Error("Nenhuma avaliação encontrada para este pedido");
            }
            res.status(200).json(avaliacoes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const avaliacao = await Avaliacao.findByPk(req.params.id);
            if (avaliacao) {
                await avaliacao.update(req.body);
                const avaliacaoAtualizada = await Avaliacao.findByPk(req.params.id, {
                    include: {
                        model: Pedido,
                        as: 'pedido'
                    }
                });
                res.status(200).json(avaliacaoAtualizada);
            } else {
                res.status(404).json({ error: 'Avaliação não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const avaliacao = await Avaliacao.findByPk(req.params.id);
            if (avaliacao) {
                await avaliacao.destroy();
                res.status(200).json({ message: 'Avaliação excluída com sucesso' });
            } else {
                res.status(404).json({ error: 'Avaliação não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    restore: async (req, res) => {
        try {
            const avaliacao = await Avaliacao.findByPk(req.params.id, { paranoid: false });
            if (avaliacao) {
                await avaliacao.restore();
                res.status(200).json({ message: 'Avaliação restaurada com sucesso' });
            } else {
                res.status(404).json({ error: 'Avaliação não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default AvaliacaoController;
