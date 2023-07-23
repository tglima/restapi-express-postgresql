import { Router } from 'express';
import controller from '../app/controllers/CustomerController';

const router = Router();
router.get('/find/id=:id?', controller.findById);
router.get('/find/document=:document?', controller.findByNuDocument);
export default router;
