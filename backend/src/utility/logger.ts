import { config } from '../config/config';
import pino from 'pino';

const logger = pino({
  timestamp: true,
  transport: {
    targets: [
      {
        level: config.server.logger.level,
        target: 'pino-pretty',
        options: {
          levelFirst: true,
          translateTime: true,
          colorize: true,
        },
      },
      {
        level: config.server.logger.level,
        target: 'pino/file',
        options: { destination: config.server.logger.path },
      },
    ],
  },
});

export default logger;
