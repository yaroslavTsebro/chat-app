import { NextFunction, Request, Response } from 'express';
import logger from '../utility/logger';
import settingsService from '../service/settings-service';
import { plainToInstance } from 'class-transformer';
import { UpdateSettingsDto } from '../entity/dto/settings/update-settings-dto';

class SettingsController {
  async getSelf(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info('getSelf started');
      const userId = req.user.id;
      logger.info('userId: ', userId);
      const settings = await settingsService.getSelf(userId);

      logger.info('getSelf ended');
      return res.json(settings).end();
    } catch (e) {
      logger.error('Occurred in getSelf');
      next(e);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info('update started');
      const userId = req.user.id;
      const dto = plainToInstance(UpdateSettingsDto, req.body);
      logger.info('userId: ', userId);

      const settings = await settingsService.update(dto, userId);
      logger.info('update ended');
      return res.json(settings).end();
    } catch (e) {
      logger.error('Occurred in update');
      next(e);
    }
  }
}

export default new SettingsController();
