import express from 'express';
import userController from '../controller/user-controller';
import { authorizationMiddleware } from '../middleware/authorization-middleware';
import avatarController from '../controller/avatar-controller';

const router = express.Router();
router.post('/registration', userController.registration);
router.post('/self', authorizationMiddleware, userController.findSelf);
router.post('/login', userController.login);
router.post('/logout', authorizationMiddleware, userController.logout);
router.post('/activate/:link', userController.activate);
router.post('/send-otp', authorizationMiddleware, userController.sendOtp);
router.get('/refresh', userController.refresh);

router.post('/avatar', authorizationMiddleware, avatarController.create);
router.get('/:id/avatar', avatarController.findAllByUserId);

export { router as userRouter };
