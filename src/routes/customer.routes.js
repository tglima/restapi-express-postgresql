import { Router } from 'express';
import controller from '../app/controllers/CustomerController';

const router = Router();
router.get('/find/id=:id?', controller.findById);
router.get('/find/document=:document?', controller.findByNuDocument);
router.post('/save', controller.save);
router.put('/update/id=:id', controller.update);
export default router;
