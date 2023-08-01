import express from 'express';
import { authorizationMiddleware } from '../middleware/authorization-middleware';
import avatarController from '../controller/avatar-controller';

const router = express.Router();

router.get('/:id', avatarController.findById);
router.delete('/:id', authorizationMiddleware, avatarController.deleteById);

export { router as settingsRouter };
