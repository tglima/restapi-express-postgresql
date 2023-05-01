import { Router } from 'express';
import controller from '../app/controllers/HealthController';

const router = Router();
router.get('', controller.healthCheck);

export default router;
