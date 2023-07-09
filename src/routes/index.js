import { Router } from 'express';
import AuthRoutes from './auth.routes';
import ContactRoutes from './contactMessage.routes';
import DocRoutes from './doc.routes';
import HealthRoutes from './health.routes';
import ProductRoutes from './product.routes';

const nuVersion = +process.env.NU_VERSION || 1;
const urlBase = `/api/v${nuVersion}`;

const routes = Router();
routes.use('/doc', DocRoutes);
routes.use(`${urlBase}/`, AuthRoutes);
routes.use(`${urlBase}/health`, HealthRoutes);
routes.use(`${urlBase}/product`, ProductRoutes);
routes.use(`${urlBase}/contact`, ContactRoutes);

export default routes;
