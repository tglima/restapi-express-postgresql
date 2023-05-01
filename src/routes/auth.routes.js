import { Router } from 'express';
import controller from '../app/controllers/AuthController';

const router = Router();
router.post('/auth', controller.auth);
export default router;
