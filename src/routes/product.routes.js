import { Router } from 'express';
import controller from '../app/controllers/ProductController';

const router = Router();
router.get('/find', controller.findAll);
router.get('/find/id=:id?', controller.findById);

export default router;
