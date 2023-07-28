import { config } from '../config/config';
import fs from 'node:fs';
import pino from 'pino';

const logDirectory = config.server.logger.path.substring(
  0,
  config.server.logger.path.lastIndexOf('/')
);
fs.mkdirSync(logDirectory, { recursive: true });

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
