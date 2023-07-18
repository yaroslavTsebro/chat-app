import { config } from '../config/config';
import pino from 'pino';

const logger = pino({
  timestamp: true,
  prettyPrint: {
    colorize: true,
    translateTime: true,
  },
  transport: {
    targets: [
      {
        level: config.server.logger.level,
        target: 'pino-pretty',
        options: {},
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
