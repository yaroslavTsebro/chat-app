import logger from '../utility/logger';
import { Group, IGroup } from '../entity/db/model/group';

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
}

export default new GroupRepository();
