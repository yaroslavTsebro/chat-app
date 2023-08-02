import { ClientSession, ObjectId } from 'mongoose';
import { GroupMember, IGroupMember } from '../entity/db/model/group-member';
import logger from '../utility/logger';

class GroupMemberRepository {
  async checkMemberForPresence(
    groupId: string,
    userId: string
  ): Promise<IGroupMember | null> {
    try {
      return await GroupMember.findOne({ group: groupId, user: userId });
    } catch (e) {
      logger.error('Occurred in group repository');
      throw e;
    }
  }

  async create(
    groupId: string,
    userId: string,
    session: ClientSession
  ): Promise<IGroupMember> {
    try {
      const link = new GroupMember({
        group: groupId,
        user: userId,
      });
      return await link.save({ session });
    } catch (e) {
      logger.error('Occurred in group repository');
      throw e;
    }
  }

  async delete(
    groupId: ObjectId,
    userId: string,
    session: ClientSession
  ): Promise<IGroupMember | null> {
    try {
      return GroupMember.findOneAndDelete(
        { group: groupId, user: userId },
        { session: session }
      );
    } catch (e) {
      logger.error('Occurred in group repository');
      throw e;
    }
  }
}

export default new GroupMemberRepository();
