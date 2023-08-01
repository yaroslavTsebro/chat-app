import { UploadedFile } from 'express-fileupload';
import { ServiceHelper } from './service-helper';
import { AppError } from '../entity/error/app-error';
import { ErrorCodes } from '../constant/error-codes';
import { ErrorMessages } from '../constant/error-messages';
import { CreateAvatarDto } from '../entity/dto/avatar/create-avatar-dto';
import logger from '../utility/logger';
import mongoose from 'mongoose';
import avatarRepository from '../repository/avatar-repository';
import fileService from './file-service';
import { IAvatar } from '../entity/db/model/avatar';

class AvatarService extends ServiceHelper {
  async create(
    userId: string,
    img: UploadedFile | undefined,
    avatarSettings: CreateAvatarDto
  ) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      AvatarService.validateId(userId);
      AvatarService.validateDto(avatarSettings);
      if (!img) {
        throw new AppError(ErrorCodes.BAD_REQUEST, ErrorMessages.BAD_REQUEST);
      }
      const extension = img.name.split('.')[-1];

      if (
        extension !== 'jpg' &&
        extension !== 'png' &&
        extension !== 'mp4' &&
        extension !== 'gif' &&
        extension !== 'webp'
      ) {
        throw new AppError(ErrorCodes.BAD_REQUEST, ErrorMessages.BAD_REQUEST);
      }
      const createdFile = await fileService.create(img, session);
      await avatarRepository.create(
        userId,
        createdFile._id.toString(),
        avatarSettings,
        session
      );
      return avatarRepository.getAvatarByUserId(userId);
    } catch (e) {
      await session.abortTransaction();
      logger.error('Error occurred in service');
      throw e;
    } finally {
      await session.endSession();
    }
  }

  async findById(id: string): Promise<IAvatar> {
    try {
      const avatar = await avatarRepository.getById(id);
      if (avatar) {
        return avatar;
      }
      throw new AppError(
        ErrorCodes.DATA_NOT_FOUND,
        ErrorMessages.DATA_NOT_FOUND
      );
    } catch (e) {
      logger.error('Error occurred in service');
      throw e;
    }
  }

  async deleteById(id: string): Promise<IAvatar> {
    try {
      AvatarService.validateId(id);
      const avatar = await avatarRepository.findAndDeleteById(id);
      if (avatar) {
        return avatar;
      }
      throw new AppError(
        ErrorCodes.DATA_NOT_FOUND,
        ErrorMessages.DATA_NOT_FOUND
      );
    } catch (e) {
      logger.error('Error occurred in service');
      throw e;
    }
  }

  async findByUserId(id: string, place: number): Promise<{avatar: IAvatar, count: number}> {
    try {
      AvatarService.validateId(id);
      const count = await avatarRepository.countByUserId(id);
      if (count > place) {
        throw new AppError(ErrorCodes.BAD_REQUEST, ErrorMessages.BAD_REQUEST);
      }

      const avatar = await avatarRepository.findByUserIdOrderByCreatedAtAscByPlace(id, place);
      if (avatar) {
        return {avatar, count};
      }
      throw new AppError(
        ErrorCodes.DATA_NOT_FOUND,
        ErrorMessages.DATA_NOT_FOUND
      );
    } catch (e) {
      logger.error('Error occurred in service');
      throw e;
    }
  }
}

export default new AvatarService();
