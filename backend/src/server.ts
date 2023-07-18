import 'reflect-metadata';
import express, { Application } from 'express';
import { createServer, Server as HttpServer } from 'http';
import logger from './utility/logger';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { pinoHttp } from 'pino-http';
import { mainRouter } from './route';
import { errorHandlerMiddleware } from './middleware/error-handler-middleware';
import connect from './db/connect';
import { config } from './config/config';
import * as socket from 'socket.io';

export class Server {
  private readonly PORT: number;
  private readonly app: Application;
  private readonly httpServer: HttpServer;

  constructor() {
    this.PORT = config.server.port;
    this.app = express();
    this.httpServer = createServer(this.app);
    logger.info(`Configured server variables`);
    this.configureServer();
    logger.info(`Configured app settings`);
  }

  private configureServer() {
    const corsOptions = {
      origin: config.server.cors.origin,
    };
    this.app.use(
      pinoHttp({
        logger,
      })
    );
    connect().then();
    this.app.use(cors(corsOptions));
    this.app.use(cookieParser());
    this.app.use(express.json());

    this.app.use('/api', mainRouter);
    this.app.use(errorHandlerMiddleware);

    global.io = new socket.Server(this.httpServer, { cors: corsOptions });
  }

  public async start() {
    this.httpServer.listen(this.PORT, () => {
      const startUpMessage = `Server is working on ${this.PORT}`;
      logger.info(startUpMessage);
    });
  }
}
