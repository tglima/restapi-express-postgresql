import { Router } from 'express';
import HealthRouter from './health/health.routes';

const routes = Router();
routes.use('/health', HealthRouter);
export default routes;
