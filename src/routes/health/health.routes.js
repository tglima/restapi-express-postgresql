import { Router } from 'express';
import HealthController from '../../app/controllers/HealthController';

const router = Router();

router.get('', HealthController.healthCheck);

module.exports = router;
