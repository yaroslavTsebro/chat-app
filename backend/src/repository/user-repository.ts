import logger from '../utility/logger';
import { IUser, User } from '../entity/db/model/user';
import { CreateUserDto } from '../entity/dto/user/create-user-dto';
import { UpdateUserDto } from '../entity/dto/user/update-user-dto';
import { ClientSession } from 'mongoose';

class UserRepository {
  public async findById(id: string): Promise<IUser | null> {
    try {
      return await User.findById(id);
    } catch (e) {
      logger.error('Occurred in user repository', id);
      throw e;
    }
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    try {
      return await User.findOne({ email: email }).select('+password').exec();
    } catch (e) {
      logger.error('Error occurred in user repository', e);
      throw e;
    }
  }

  public async deleteById(id: string): Promise<IUser | null> {
    try {
      return await User.findByIdAndDelete(id);
    } catch (e) {
      logger.error('Occurred in user repository', id);
      throw e;
    }
  }

  public async create(
    dto: CreateUserDto,
    session: ClientSession
  ): Promise<IUser> {
    try {
      const user = new User({
        username: dto.username,
        email: dto.email,
        password: dto.password,
      });
      return await user.save({session});
    } catch (e) {
      logger.error('Occurred in user repository', dto);
      throw e;
    }
  }

  public async update(dto: UpdateUserDto, id: string) {
    try {
      await User.findOneAndUpdate(
        { _id: id },
        { username: dto.username, email: dto.email },
        { returnOriginal: false }
      );
    } catch (e) {
      logger.error('Occurred in user repository', dto);
      throw e;
    }
  }



  async updateUserIsVerified(userId: string) {
    try {
      await User.findOneAndUpdate(
        { _id: userId },
        { isVerified: true },
        { returnOriginal: false }
      );
    } catch (e) {
      logger.error('Occurred in user repository', userId);
      throw e;
    }
  }
}

export default new UserRepository();
