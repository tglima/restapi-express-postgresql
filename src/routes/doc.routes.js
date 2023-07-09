import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

const swaggerDocument = require('../swagger.json');

const customCss = `
  .swagger-ui .response-col_links {
    display: none;
  }
`;

const options = {
  customCss,
  swaggerOptions: {
    url: '/doc/swagger.json',
  },
};

const router = Router();
router.get('/swagger.json', (req, res) => res.json(swaggerDocument));
router.use(
  '',
  swaggerUi.serveFiles(null, options),
  swaggerUi.setup(null, options)
);

export default router;
