import { NextFunction, Request, Response } from 'express';
import logger from '../utility/logger';
import avatarService from '../service/avatar-service';
import { CreateAvatarDto } from '../entity/dto/avatar/create-avatar-dto';
import { plainToInstance } from 'class-transformer';
import fileUpload from 'express-fileupload';

class AvatarController {

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const avatar = await avatarService.findById(id);
      res.json(avatar).end();
    } catch (e) {
      logger.error('Occurred during findById');
      next(e);
    }
  }

  
  async findAllByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const place = Number(req.query.place);
      const avatar = await avatarService.findByUserId(id, place);
      res.json(avatar).end();
    } catch (e) {
      logger.error('Occurred during findById');
      next(e);
    }
  }

  async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const avatar = await avatarService.deleteById(id);
      res.json(avatar).end();
    } catch (e) {
      logger.error('Occurred during findById');
      next(e);
    }
  }

  
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.user.id;
      const img =  req.files?.avatar as fileUpload.UploadedFile | undefined;
      const avatarSettings = plainToInstance(CreateAvatarDto, req.body);
      const avatar = await avatarService.create(id, img, avatarSettings);
      res.json(avatar).end();
    } catch (e) {
      logger.error('Occurred during findById');
      next(e);
    }
  }
}

export default new AvatarController();
