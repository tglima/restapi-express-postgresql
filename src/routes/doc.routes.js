import dotenv from 'dotenv';
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

// Carrega as variáveis do arquivo .env
dotenv.config();

const swaggerDocument = require('../swagger.json');

if (
  swaggerDocument.servers &&
  swaggerDocument.servers.length > 0 &&
  swaggerDocument.servers[0].url
) {
  let { url } = swaggerDocument.servers[0];
  url = url.replace('{{URL_API}}', process.env.URL_API);
  swaggerDocument.servers[0].url = url;
}

const customCss = `.swagger-ui .response-col_links { display: none; } `;

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
