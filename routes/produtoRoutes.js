import { Router } from 'express';
import { criar, listar, obterPorId, atualizar, deletar } from '../controllers/ProdutoController.js';

const router = Router();

router.post('/', criar);
router.get('/', listar);
router.get('/:id', obterPorId);
router.put('/:id', atualizar);
router.delete('/:id', deletar);

export default router;
