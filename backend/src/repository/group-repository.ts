import logger from '../utility/logger';
import { Group, IGroup } from '../entity/db/model/group';
import { CreateGroupDto } from '../entity/dto/group/create-group-dto';
import { ClientSession } from 'mongoose';

class GroupRepository {
  async getMainScreen(userId: string): Promise<IGroup[]> {
    try {
      return await Group.aggregate([
        {
          $match: {
            members: userId,
          },
        },
        {
          $lookup: {
            from: 'GroupMember', // Assuming the collection name for GroupMember is 'GroupMember'
            localField: 'members',
            foreignField: 'user',
            as: 'membersInfo',
          },
        },
        {
          $unwind: {
            path: '$membersInfo',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'avatars', // Assuming the collection name for Avatars is 'avatars'
            localField: 'avatars',
            foreignField: '_id',
            as: 'avatarsInfo',
          },
        },
        {
          $unwind: {
            path: '$avatarsInfo',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            roomId: 1,
            name: 1,
            avatars: 1,
            type: 1,
            createdAt: 1,
            updatedAt: 1,
            unreadMessagesIds: {
              $cond: {
                if: { $eq: ['$membersInfo.user', userId] },
                then: '$membersInfo.unreadMessagesIds',
                else: [],
              },
            },
          },
        },
      ]);
    } catch (e) {
      logger.error('Occurred in group repository', userId);
      throw e;
    }
  }

  async createGroup(
    dto: CreateGroupDto,
    ownerId: string,
    session: ClientSession
  ) {
    try {
      const group = new Group({
        owner: ownerId,
        type: dto.type,
        name: dto.name,
        members: dto.members,
      });
      return await group.save({ session: session });
    } catch (e) {
      logger.error('Occurred in group repository');
      throw e;
    }
  }

  async getGroupByIdAndOwnerId(
    ownerId: string,
    groupId: string
  ): Promise<IGroup | null> {
    try {
      return await Group.findOne({ owner: ownerId, _id: groupId });
    } catch (e) {
      logger.error('Occurred in group repository');
      throw e;
    }
  }

  async changeGroupName(groupId: string, name: string): Promise<IGroup | null> {
    try {
      return await Group.findByIdAndUpdate(groupId, { name: name });
    } catch (e) {
      logger.error('Occurred in group repository');
      throw e;
    }
  }

  async checkMemberForPresence(
    groupId: string,
    userId: string
  ): Promise<IGroup | null> {
    try {
      return await Group.findOne({
        group: groupId,
        members: { $elemMatch: { $eq: userId } },
      });
    } catch (e) {
      logger.error('Occurred in group repository');
      throw e;
    }
  }

  async getGroupByUserIdInMembersOrUserIsOwner(
    groupId: string,
    userId: string
  ): Promise<IGroup | null> {
    try {
      return await Group.findOne({
        $or: [{ members: userId }, { owner: userId }],
      });
    } catch (e) {
      logger.error('Occurred in group repository');
      throw e;
    }
  }

  async addMember(
    groupId: string,
    userId: string,
    session: ClientSession
  ): Promise<IGroup | null> {
    try {
      return await Group.findOneAndUpdate(
        { _id: groupId },
        { $addToSet: { members: userId } },
        { new: true, session: session }
      );
    } catch (e) {
      logger.error('Occurred in group repository');
      throw e;
    }
  }

  async findById(groupId: string): Promise<IGroup | null> {
    try {
      return await Group.findById(groupId);
    } catch (e) {
      logger.error('Occurred in group repository');
      throw e;
    }
  }

  async removeMember(
    groupId: string,
    userId: string,
    session: ClientSession
  ): Promise<IGroup | null> {
    try {
      return await Group.findOneAndUpdate(
        { _id: groupId },
        { $pull: { members: userId } },
        { new: true, session: session }
      );
    } catch (e) {
      logger.error('Occurred in group repository');
      throw e;
    }
  }
}

export default new GroupRepository();
