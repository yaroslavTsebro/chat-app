import mongoose from 'mongoose';
import { CreateGroupDto } from '../entity/dto/group/create-group-dto';
import logger from '../utility/logger';
import { ServiceHelper } from './service-helper';
import groupRepository from '../repository/group-repository';
import { GroupTypeEnum } from '../entity/db/model/group-type-enum';
import { AppError } from '../entity/error/app-error';
import { ErrorCodes } from '../constant/error-codes';
import { ErrorMessages } from '../constant/error-messages';
import avatarService from './avatar-service';
import { UploadedFile } from 'express-fileupload';
import { CreateAvatarDto } from '../entity/dto/avatar/create-avatar-dto';
import { IAvatar } from '../entity/db/model/avatar';
import { ChangeGroupNameDto } from '../entity/dto/group/change-group-name-dto';
import { IGroup } from '../entity/db/model/group';
import avatarRepository from '../repository/avatar-repository';
import groupMemberRepository from '../repository/group-member-repository';

class GroupService extends ServiceHelper {
  private validateGroup(dto: CreateGroupDto) {
    if (dto.type === GroupTypeEnum.Self || dto.type === GroupTypeEnum.P2P) {
      dto.name = '';
    }
    if (dto.type === GroupTypeEnum.Self && dto.members.length != 0) {
      throw new AppError(
        ErrorCodes.SELF_DIALOG_CANT_HAVE_MEMBERS,
        ErrorMessages.SELF_DIALOG_CANT_HAVE_MEMBERS
      );
    }
    if (dto.type === GroupTypeEnum.P2P && dto.members.length !== 2) {
      throw new AppError(
        ErrorCodes.P2P_DIALOG_CANT_HAVE_NOT_2_MEMBERS,
        ErrorMessages.P2P_DIALOG_CANT_HAVE_NOT_2_MEMBERS
      );
    }
    if (
      dto.type === GroupTypeEnum.Private ||
      dto.type === GroupTypeEnum.Public
    ) {
      if (dto.name === undefined || dto.name.length < 4) {
        throw new AppError(
          ErrorCodes.GROUP_NAME_NEED_TO_BE_GREATER_THAN_4,
          ErrorMessages.GROUP_NAME_NEED_TO_BE_GREATER_THAN_4
        );
      }
      throw new AppError(
        ErrorCodes.PUBLIC_GROUP_NEED_TO_HAVE_NAME,
        ErrorMessages.PUBLIC_GROUP_NEED_TO_HAVE_NAME
      );
    }
  }

  async create(
    ownerId: string,
    dto: CreateGroupDto,
    image: UploadedFile | undefined
  ) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      GroupService.validateId(ownerId);
      GroupService.validateDto(dto);
      this.validateGroup(dto);

      const group = await groupRepository.createGroup(dto, ownerId, session);
      if (image && dto.avatar && group.type !== GroupTypeEnum.P2P) {
        await avatarService.createForGroup(
          ownerId,
          group._id.toString(),
          image,
          dto.avatar,
          session
        );
      }
    } catch (e) {
      await session.abortTransaction();
      logger.error('Error occurred in service');
      throw e;
    } finally {
      await session.endSession();
    }
  }

  async addGroupPicture(
    groupId: string,
    userId: string,
    image: UploadedFile | undefined,
    dto: CreateAvatarDto
  ): Promise<IAvatar> {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      GroupService.checkFilesForPresence(image);
      GroupService.validateIds([userId, groupId]);
      GroupService.validateDto(dto);
      await GroupService.checkUserForGroupOwner(groupId, userId);

      return await avatarService.createForGroup(
        userId,
        groupId,
        image,
        dto,
        session
      );
    } catch (e) {
      await session.abortTransaction();
      logger.error('Error occurred in service');
      throw e;
    } finally {
      await session.endSession();
    }
  }

  async deleteGroupPicture(
    groupId: string,
    userId: string,
    avatarId: string
  ): Promise<IAvatar> {
    try {
      GroupService.validateIds([userId, groupId]);
      const group = await GroupService.checkUserForGroupOwner(groupId, userId);
      if (group.type === GroupTypeEnum.P2P) {
        throw new AppError(ErrorCodes.BAD_REQUEST, ErrorMessages.BAD_REQUEST);
      }
      const deleted = await avatarRepository.findAndDeleteByIdAndGroupId(
        avatarId,
        groupId
      );
      if (!deleted) {
        throw new AppError(ErrorCodes.BAD_REQUEST, ErrorMessages.BAD_REQUEST);
      }
      return deleted;
    } catch (e) {
      logger.error('Error occurred in service');
      throw e;
    }
  }

  async updateGroupName(
    groupId: string,
    userId: string,
    dto: ChangeGroupNameDto
  ): Promise<IGroup> {
    try {
      GroupService.validateIds([userId, groupId]);
      GroupService.validateDto(dto);
      await GroupService.checkUserForGroupOwner(groupId, userId);
      const group = await groupRepository.changeGroupName(groupId, dto.name);
      if (group) {
        return group;
      }
      throw new AppError(ErrorCodes.SERVER_ERROR, ErrorMessages.SERVER_ERROR);
    } catch (e) {
      logger.error('Error occurred in service');
      throw e;
    }
  }

  async inviteToGroup(
    groupId: string,
    userId: string,
    ownerId: string
  ): Promise<IGroup> {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      GroupService.validateIds([userId, groupId, ownerId]);
      const group = await GroupService.checkUserForGroupOwner(groupId, ownerId);
      if (
        group.type === GroupTypeEnum.P2P ||
        group.type === GroupTypeEnum.Self
      ) {
        throw new AppError(ErrorCodes.FORBIDDEN, ErrorMessages.FORBIDDEN);
      }
      const groupMember = await groupRepository.checkMemberForPresence(
        groupId,
        userId
      );
      if (groupMember) {
        throw new AppError(
          ErrorCodes.ALREADY_INVITED,
          ErrorMessages.ALREADY_INVITED
        );
      }

      await groupMemberRepository.create(groupId, userId, session);
      const newGroup = await groupRepository.addMember(
        groupId,
        userId,
        session
      );
      if (!newGroup) {
        throw new AppError(ErrorCodes.SERVER_ERROR, ErrorMessages.SERVER_ERROR);
      }
      return newGroup;
    } catch (e) {
      await session.abortTransaction();
      logger.error('Error occurred in service');
      throw e;
    } finally {
      await session.endSession();
    }
  }

  async leaveGroup(groupId: string, userId: string): Promise<IGroup> {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      GroupService.validateIds([userId, groupId]);
      const group = await groupRepository.findById(groupId);
      if (!group) {
        throw new AppError(ErrorCodes.BAD_REQUEST, ErrorMessages.BAD_REQUEST);
      }
      if (
        group.type === GroupTypeEnum.P2P ||
        group.type === GroupTypeEnum.Self
      ) {
        throw new AppError(ErrorCodes.FORBIDDEN, ErrorMessages.FORBIDDEN);
      }

      const groupMember = await groupRepository.checkMemberForPresence(
        groupId,
        userId
      );
      if (!groupMember) {
        throw new AppError(
          ErrorCodes.ALREADY_INVITED,
          ErrorMessages.ALREADY_INVITED
        );
      }

      const deletedGroupMember = await groupMemberRepository.delete(
        group._id,
        userId,
        session
      );
      if (!deletedGroupMember) {
        throw new AppError(ErrorCodes.BAD_REQUEST, ErrorMessages.BAD_REQUEST);
      }

      const newGroup = await groupRepository.removeMember(
        groupId,
        userId,
        session
      );
      if (!newGroup) {
        throw new AppError(ErrorCodes.SERVER_ERROR, ErrorMessages.SERVER_ERROR);
      }
      return newGroup;
    } catch (e) {
      await session.abortTransaction();
      logger.error('Error occurred in service');
      throw e;
    } finally {
      await session.endSession();
    }
  }

  async kickFromGroup(
    groupId: string,
    userId: string,
    ownerId: string
  ): Promise<IGroup> {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      GroupService.validateIds([userId, groupId]);
      const group = await GroupService.checkUserForGroupOwner(groupId, ownerId);

      const groupMember = await groupRepository.checkMemberForPresence(
        groupId,
        userId
      );
      if (!groupMember) {
        throw new AppError(
          ErrorCodes.DONT_HAVE_SUCH_ACC,
          ErrorMessages.DONT_HAVE_SUCH_ACC
        );
      }

      const deletedGroupMember = await groupMemberRepository.delete(
        group._id,
        userId,
        session
      );
      if (!deletedGroupMember) {
        throw new AppError(ErrorCodes.BAD_REQUEST, ErrorMessages.BAD_REQUEST);
      }

      const newGroup = await groupRepository.removeMember(
        groupId,
        userId,
        session
      );
      if (!newGroup) {
        throw new AppError(ErrorCodes.SERVER_ERROR, ErrorMessages.SERVER_ERROR);
      }
      return newGroup;
    } catch (e) {
      await session.abortTransaction();
      logger.error('Error occurred in service');
      throw e;
    } finally {
      await session.endSession();
    }
  }
}

export default new GroupService();
