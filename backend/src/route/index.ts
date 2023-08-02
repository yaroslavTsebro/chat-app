import express from 'express';
import { userRouter } from './user';
import { settingsRouter } from './settings';

const router = express.Router();
router.use('/user', userRouter);
router.use('/settings', settingsRouter);

export { router as mainRouter };
