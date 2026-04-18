import { Router } from 'express';
import EntregaController from '../controllers/EntregaController.js';

const router = Router();

router.get('/', EntregaController.index);
router.post('/', EntregaController.store);
router.get('/:id', EntregaController.show);
router.put('/:id', EntregaController.update);
router.delete('/:id', EntregaController.destroy);

export default router;
