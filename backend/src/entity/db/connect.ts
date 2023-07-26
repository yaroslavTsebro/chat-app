import { connect } from 'mongoose';
import { config } from '../../config/config';
import logger from '../../utility/logger';

export const db = async () => {
  try {
    let uri;
    if (config.env.APP_MODE_IS_PROD) {
      uri = `mongodb://${config.db.DB_USER}:${config.db.DB_PASSWORD}@${config.db.DB_HOST}:${config.db.DB_PORT}/${config.db.DB_NAME}`;
    } else {
      uri = `mongodb+srv://${config.db.DB_USER}:${config.db.DB_PASSWORD}@cluster0.sryeyft.mongodb.net/?retryWrites=true&w=majority`;
    }
    logger.info(uri);
    await connect(uri);
    logger.info('database connected');
  } catch (e) {
    logger.error(e, 'connection failed');
  }
};
