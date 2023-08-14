import mongoose from 'mongoose';
import { config } from '../../config/config';
import logger from '../../utility/logger';

export const db = async () => {
  try {
    // await mongoose.connect(`mongodb://${config.db.DB_HOST}:${config.db.DB_PORT}/${config.db.DB_NAME}`, {
    //   authSource: config.db.DB_NAME,
    //   user: config.db.DB_USER,
    //   pass: config.db.DB_PASSWORD,
    // })
    await mongoose.connect(
      `mongodb+srv://yaroslavcebro:6vXul2Z6gq0oOcmv@cluster0.4jjc9pz.mongodb.net/?retryWrites=true&w=majority`
    );
    logger.info('database connected');
  } catch (e) {
    logger.error(e, 'connection failed');
  }
};
