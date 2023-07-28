import express from 'express';
import userController from '../controller/user-controller';
import { authorizationMiddleware } from '../middleware/authorization-middleware';

const router = express.Router();
router.post('/registration', userController.registration);
router.post('/self', authorizationMiddleware, userController.findSelf);
router.post('/login', userController.login);
router.post('/logout', authorizationMiddleware, userController.logout);
router.post('/activate/:link', userController.activate);
router.post('/send-otp', authorizationMiddleware, userController.sendOtp);
router.get('/refresh', userController.refresh);

export { router as userRouter };
