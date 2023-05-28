import { Router } from 'express';
import AuthRoutes from './auth.routes';
import HealthRoutes from './health.routes';
import ProductRoutes from './product.routes';

const routes = Router();
routes.use('', AuthRoutes);
routes.use('/health', HealthRoutes);
routes.use('/product', ProductRoutes);

export default routes;
