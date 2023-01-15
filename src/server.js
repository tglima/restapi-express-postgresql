/* eslint-disable no-console */
import dotenv from 'dotenv';
import app from './app';

const config = process.env;
config.NODE_ENV = config.NODE_ENV || 'development';
dotenv.config({ path: `./config/env/${config.NODE_ENV}.env` });
const urlBase = `/api/v${config.NU_VERSION}`;
const port = config.SERVER_PORT;

console.log(`Env mode: ${config.NODE_ENV}!`);

app.listen(port, console.warn(`App listening on ${port}`));

if (config.NODE_ENV === 'development') {
  console.log(`http://localhost:${port}${urlBase}`);
}
