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
};

const router = Router();
router.use('', swaggerUi.serve);
router.get('', swaggerUi.setup(swaggerDocument, options));

export default router;
