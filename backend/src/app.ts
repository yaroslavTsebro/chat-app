import 'reflect-metadata';
import logger from './utility/logger';
import { Server } from './server';

function startApp() {
  const server = new Server();
  server
    .start()
    .then(() => {
      logger.info(`Server started apply configurations`);
    })
    .catch((e) => {
      logger.error(e, `Error happened during starting up`);
    });
}

startApp(); 