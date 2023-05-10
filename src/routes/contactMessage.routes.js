import { Router } from 'express';
import controller from '../app/controllers/ContactMessageController';

const router = Router();
router.post('', controller.save);
export default router;
