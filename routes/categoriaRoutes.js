import { Router } from 'express';

import CategoriaController from  '../controllers/CategoriaController.js';

const router = Router();

router.post('/', CategoriaController.create);
router.get('/', CategoriaController.findAll);
router.get('/:id', CategoriaController.findById);
router.put('/:id', CategoriaController.update);
router.delete('/:id', CategoriaController.delete);
router.put('/restaure/:id', CategoriaController.restaure);

export default router;