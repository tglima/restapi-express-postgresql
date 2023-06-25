/* eslint-disable no-console */

import express from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import morganBody from 'morgan-body';
import Youch from 'youch';
import authServices from './app/services/auth.services';
import dbUtil from './app/utils/db.util';
import routes from './routes';

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 120,
  statusCode: 429,
  message: 'Limite de requisições ultrapassado, por favor, aguarde.',
});

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.loadRoutes();
    dbUtil.testConnection();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(helmet());
    this.server.use('/', apiLimiter);
    morganBody(this.server, { prettify: false });
    this.server.use(authServices.checkAuth);
  }

  loadRoutes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, request, response, next) => {
      const errors = await new Youch(err, request).toJSON();
      return response.status(500).json(errors);
    });
  }
}

export default new App().server;
