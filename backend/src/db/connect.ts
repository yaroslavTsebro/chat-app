import { connect } from 'mongoose';
import { config } from '../config/config';
import logger from '../utility/logger';

export default async () => {
  try {
    const uri = `mongodb://${config.db.DB_HOST}:${config.db.DB_PORT}/${config.db.DB_NAME}`;
    await connect(uri);
    logger.info('database connected');
  } catch (error0) {
    logger.error('connection failed');
  }
};
