import { ClientSession, ObjectId } from 'mongoose';
import { Avatar, IAvatar } from '../entity/db/model/avatar';
import { CreateAvatarDto } from '../entity/dto/avatar/create-avatar-dto';
import logger from '../utility/logger';

class AvatarRepository {
  async create(
    userId: string,
    fileId: string,
    dto: CreateAvatarDto,
    session: ClientSession,
    groupId?: string
  ): Promise<IAvatar> {
    try {
      let avatar;
      if (groupId) {
        avatar = new Avatar({
          scale: dto.scale,
          x: dto.x,
          y: dto.y,
          file: fileId,
          userId: userId,
          group: groupId,
        });
      } else {
        avatar = new Avatar({
          scale: dto.scale,
          x: dto.x,
          y: dto.y,
          file: fileId,
          userId: userId,
        });
      }

      return await avatar.save({ session });
    } catch (e) {
      logger.error('An error occurred in repository');
      throw e;
    }
  }

  async getAvatarByUserId(userId: string): Promise<IAvatar | null> {
    try {
      return await Avatar.findOne({ user: userId }).populate('file');
    } catch (e) {
      logger.error('An error occurred in repository');
      throw e;
    }
  }

  async getById(id: string): Promise<IAvatar | null> {
    try {
      return await Avatar.findById(id).populate('file');
    } catch (e) {
      logger.error('An error occurred in repository');
      throw e;
    }
  }

  async getByGroupId(groupId: string): Promise<IAvatar | null> {
    try {
      return await Avatar.findOne({ group: groupId }).populate('file');
    } catch (e) {
      logger.error('An error occurred in repository');
      throw e;
    }
  }

  async findAndDeleteById(id: string): Promise<IAvatar | null> {
    try {
      return await Avatar.findOneAndDelete({ id: id });
    } catch (e) {
      logger.error('An error occurred in repository');
      throw e;
    }
  }

  async findAndDeleteByIdAndGroupId(id: string, groupId: string): Promise<IAvatar | null> {
    try {
      return await Avatar.findOneAndDelete({ id: id , group: groupId});
    } catch (e) {
      logger.error('An error occurred in repository');
      throw e;
    }
  }
  

  async countByUserId(id: string): Promise<number> {
    try {
      return await Avatar.countDocuments({ user: id });
    } catch (e) {
      logger.error('An error occurred in repository');
      throw e;
    }
  }

  async findByUserIdOrderByCreatedAtAscByPlace(
    id: string,
    place: number
  ): Promise<IAvatar | null> {
    try {
      return await Avatar.findOne({ user: id })
        .sort({ createdAt: 1 })
        .skip(place - 1)
        .exec();
    } catch (e) {
      logger.error('An error occurred in repository');
      throw e;
    }
  }

  async getFullAvatarById(id: ObjectId): Promise<IAvatar | null>{
    try {
      return await Avatar.findById(id).populate('file');
    } catch (e) {
      logger.error('An error occurred in repository');
      throw e;
    }
  }
}

export default new AvatarRepository();
