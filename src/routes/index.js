import { Router } from 'express';
import AuthRoutes from './auth.routes';
import HealthRoutes from './health.routes';

const routes = Router();
routes.use('/health', HealthRoutes);
routes.use('', AuthRoutes);
export default routes;
