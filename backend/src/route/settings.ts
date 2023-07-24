import express from 'express';
import { authorizationMiddleware } from '../middleware/authorization-middleware';
import settingsController from '../controller/settings-controller';

let router = express.Router();
router.get('/', authorizationMiddleware, settingsController.getSelf);
router.patch('/', authorizationMiddleware, settingsController.update);

export { router as settingsRouter };
