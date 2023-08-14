import { NextFunction, Request, Response } from 'express';
import logger from '../utility/logger';
import userService from '../service/user-service';
import { CreateUserDto } from '../entity/dto/user/create-user-dto';
import { plainToInstance } from 'class-transformer';
import { LoginUserDto } from '../entity/dto/user/login-user-dto';
import { config } from '../config/config';

class UserController {
  async findSelf(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.user.id;
      const user = await userService.findById(id);
      res.json(user).end();
    } catch (e) {
      logger.error('Occurred during findById');
      next(e);
    }
  }

  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = plainToInstance(CreateUserDto, req.body);
      const data = await userService.register(dto);
      UserController.addRefreshTokenToCookie(res, data.refreshToken);

      res.json(data).end();
    } catch (e) {
      logger.error('Occurred during registration');
      next(e);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = plainToInstance(LoginUserDto, req.body);
      const data = await userService.login(dto);
      UserController.addRefreshTokenToCookie(res, data.refreshToken);

      res.json(data).end();
    } catch (e) {
      logger.error('Occurred during login');
      next(e); 
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');

      return res.json(token).end();
    } catch (e) {
      logger.error('Occurred during logout');
      next(e);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      UserController.addRefreshTokenToCookie(res, userData.refreshToken);

      return res.json(userData).end();
    } catch (e) {
      logger.error('Occurred during logout');
      next(e);
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const activationLink = req.params.link;

      await userService.activate(activationLink);

      logger.info('activate ended');
      return res.json({ success: true }).end();
    } catch (e) {
      next(e);
    }
  }

  async sendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info('sendOtp started');
      const userId = req.user._id;
      logger.info('userId: ', userId);
      await userService.createAndSendOtp(userId);

      logger.info('sendOtp ended');
      return res.json({ success: true });
    } catch (e) {
      next(e);
    }
  }

  public static addRefreshTokenToCookie(res: Response, token: string) {
    res.cookie('chat_refreshToken', token, {
      maxAge: config.server.jwt.expiresInRefreshCookie,
      httpOnly: true,
    });
    logger.info('Refresh token was added to the cookie');
  }
}

export default new UserController();
