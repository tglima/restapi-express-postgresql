/* eslint-disable no-console */

import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morganBody from 'morgan-body';
import Youch from 'youch';
import authServices from './app/services/auth.services';
import routes from './routes';

const rateLimit = require('express-rate-limit');

const config = process.env;
config.NODE_ENV = config.NODE_ENV || 'development';

dotenv.config({ path: `./config/env/${config.NODE_ENV}.env` });
const urlBase = `/api/v${config.NU_VERSION}`;

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
    this.loadDB();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(helmet());
    this.server.use('/', apiLimiter);
    morganBody(this.server, { prettify: false });
    this.server.use(authServices.checkAuth);
  }

  loadDB() {}

  loadRoutes() {
    this.server.use(urlBase, routes);
  }

  exceptionHandler() {
    this.server.use(async (err, request, response, next) => {
      const errors = await new Youch(err, request).toJSON();
      return response.status(500).json(errors);
    });
  }

}

export default new App().server;
