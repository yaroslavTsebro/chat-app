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
import { UpdateMessageDto } from '../entity/dto/message/update-message-dto';
import groupMemberRepository from '../repository/group-member-repository';

class MessageService extends ServiceHelper {
  private async checkGroupForUserPresence(
    groupId: string,
    userId: string
  ): Promise<void> {
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
        const createdFiles = await fileService.createMany(files, session);
        const createFileIds = createdFiles.map( (e) => e._id);
        return await messageRepository.create(
          dto,
          userId,
          groupId,
          session,
          createFileIds
        );
      }
      const message = await messageRepository.create(
        dto,
        userId,
        groupId,
        session
      );
      await groupMemberRepository.addMessageToUnreadForGroupMembers(
        groupId,
        message._id.toString(),
        session
      );
      return message;
    } catch (e) {
      await session.abortTransaction();
      logger.error('An error occurred in service');
      throw e;
    } finally {
      await session.endSession();
    }
  }

  async update(
    messageId: string,
    userId: string,
    groupId: string,
    dto: UpdateMessageDto
  ): Promise<IMessage> {
    try {
      MessageService.validateIds([messageId, userId, groupId]);
      MessageService.validateDto(dto);
      this.checkGroupForUserPresence(groupId, userId);
      const message = await messageRepository.update(
        messageId,
        groupId,
        dto.text
      );
      if (!message) {
        throw new AppError(ErrorCodes.BAD_REQUEST, ErrorMessages.BAD_REQUEST);
      }
      return message;
    } catch (e) {
      logger.error('An error occurred in service');
      throw e;
    }
  }

  async readMessage(messageId: string, userId: string): Promise<number> {
    try {
      MessageService.validateIds([messageId, userId]);
      const message = await messageRepository.findById(messageId);
      if (!message) {
        throw new AppError(ErrorCodes.BAD_REQUEST, ErrorMessages.BAD_REQUEST);
      }
      if (message.sender.toString() === userId) {
        throw new AppError(ErrorCodes.FORBIDDEN, ErrorMessages.FORBIDDEN);
      }
      this.checkGroupForUserPresence(message.groupId.toString(), userId);

      return await groupMemberRepository.readMessage(message.groupId.toString(), messageId, userId)
    } catch (e) {
      logger.error('An error occurred in service');
      throw e;
    }
  }


  private async validateMessageAndUserByIds(messageId: string, userId: string){
    MessageService.validateIds([messageId, userId]);
    const message = await messageRepository.findById(messageId);
    if (!message) {
      throw new AppError(ErrorCodes.BAD_REQUEST, ErrorMessages.BAD_REQUEST);
    }
    this.checkGroupForUserPresence(message.groupId.toString(), userId);
  }

  async deleteForUser(messageId: string, userId: string): Promise<IMessage> {
    try {
      await this.validateMessageAndUserByIds(messageId, userId);

      const updatedMessage = await messageRepository.deleteForUser(messageId, userId);
      if(!updatedMessage){
        throw new AppError(ErrorCodes.BAD_REQUEST, ErrorMessages.BAD_REQUEST);
      }

      return updatedMessage;
    } catch (e) {
      logger.error('An error occurred in service');
      throw e;
    }
  }

  async deleteForAll(messageId: string, userId: string): Promise<IMessage> {
    try {
      await this.validateMessageAndUserByIds(messageId, userId);

      const updatedMessage = await messageRepository.deleteForAll(messageId, userId);
      if(!updatedMessage){
        throw new AppError(ErrorCodes.BAD_REQUEST, ErrorMessages.BAD_REQUEST);
      }

      return updatedMessage;
    } catch (e) {
      logger.error('An error occurred in service');
      throw e;
    }
  }
}

export default new MessageService();
