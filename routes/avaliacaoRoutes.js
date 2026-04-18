import { Router } from 'express';
import AvaliacaoController from '../controllers/AvaliacaoController.js';

const router = Router();

router.post('/', AvaliacaoController.create);
router.get('/', AvaliacaoController.findAll);
router.get('/:id', AvaliacaoController.findById);
router.get('/pedido/:pedido_id', AvaliacaoController.findByPedido);
router.put('/:id', AvaliacaoController.update);
router.delete('/:id', AvaliacaoController.delete);
router.put('/restaure/:id', AvaliacaoController.restore);

export default router;
