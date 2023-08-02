import { UploadedFile } from 'express-fileupload';
import { CreateMessageDto } from '../entity/dto/message/create-message-dto';
import { ServiceHelper } from './service-helper';
import { IMessage } from '../entity/db/model/message';
import logger from '../utility/logger';
import fileService from './file-service';
import mongoose from 'mongoose';
import messageRepository from '../repository/message-repository';
import groupRepository from '../repository/group-repository';
import { AppError } from '../entity/error/app-error';
import { ErrorCodes } from '../constant/error-codes';
import { ErrorMessages } from '../constant/error-messages';

class MessageService extends ServiceHelper {
  private async checkGroupForUserPresence(groupId: string, userId: string) {
    const group = await groupRepository.getGroupByUserIdInMembersOrUserIsOwner(
      groupId,
      userId
    );
    if (!group) {
      throw new AppError(ErrorCodes.FORBIDDEN, ErrorMessages.FORBIDDEN);
    }
  }

  async create(
    userId: string,
    groupId: string,
    dto: CreateMessageDto,
    files: UploadedFile[] | undefined
  ): Promise<IMessage> {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      MessageService.validateIds([userId, groupId]);
      MessageService.validateDto(dto);
      MessageService.checkFiles(files);
      this.checkGroupForUserPresence(groupId, userId);
      
      if (files) {
        await fileService.createMany(files, session);
      }
      messageRepository.create(userId);
    } catch (e) {
      await session.abortTransaction();
      logger.error('An error occurred in service');
      throw e;
    } finally {
      await session.endSession();
    }
  }
}

export default new MessageService();
