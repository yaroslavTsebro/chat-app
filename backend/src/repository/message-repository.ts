import { ClientSession, ObjectId } from 'mongoose';
import { IMessage, Message } from '../entity/db/model/message';
import logger from '../utility/logger';
import { CreateMessageDto } from '../entity/dto/message/create-message-dto';

class MessageRepository {
  async create(
    dto: CreateMessageDto,
    userId: string,
    groupId: string,
    session: ClientSession,
    files?: ObjectId[]
  ): Promise<IMessage> {
    try {
      let message;
      if (dto.parentMessage) {
        message = new Message({
          text: dto.text,
          sender: userId,
          group: groupId,
          parentMessage: dto.parentMessage,
        });
      } else {
        message = new Message({
          text: dto.text,
          sender: userId,
          group: groupId,
        });
      }
      if (files && files.length !== 0) {
        message.files = files;
      }
      return await message.save({ session: session });
    } catch (e) {
      logger.error('An error occurred in repository');
      throw e;
    }
  }

  async update(
    messageId: string,
    groupId: string,
    text: string
  ): Promise<IMessage | null> {
    try {
      return await Message.findOneAndUpdate(
        { _id: messageId, group: groupId },
        { text: text }
      );
    } catch (e) {
      logger.error('An error occurred in repository');
      throw e;
    }
  }

  async findById(messageId: string): Promise<IMessage | null> {
    try {
      return await Message.findById(messageId);
    } catch (e) {
      logger.error('An error occurred in repository');
      throw e;
    }
  }

  async deleteForUser(
    messageId: string,
    userId: string
  ): Promise<IMessage | null> {
    try {
      return await Message.findOneAndUpdate(
        { _id: messageId },
        { $pull: { deletedBy: userId } }
      );
    } catch (e) {
      logger.error('An error occurred in repository');
      throw e;
    }
  }

  async deleteForAll(
    messageId: string,
    userId: string
  ): Promise<IMessage | null> {
    try {
      return await Message.findOneAndDelete({ _id: messageId, sender: userId });
    } catch (e) {
      logger.error('An error occurred in repository');
      throw e;
    }
  }
}

export default new MessageRepository();
