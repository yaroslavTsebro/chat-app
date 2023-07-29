import mongoose from 'mongoose';

export const db = async () => {
  await mongoose.connect(
    `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    {
      authSource: process.env.DB_NAME,
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
    }
  );
};
