import { IToken, Token } from '../entity/db/model/token';
import logger from '../utility/logger';
import { ClientSession, ObjectId } from 'mongoose';

class TokenRepository {
  public async create() {}

  public async findById(id: string): Promise<IToken | null> {
    try {
      return await Token.findById(id);
    } catch (e) {
      logger.error('Occurred in token repository', id);
      throw e;
    }
  }

  public async deleteByToken(token: string): Promise<IToken | null> {
    try {
      return await Token.findOneAndDelete({ token: token });
    } catch (e) {
      logger.error('Occurred in token repository');
      throw e;
    }
  }

  public async findByUserId(userId: string): Promise<IToken | null> {
    try {
      return await Token.findOne({ user: userId });
    } catch (e) {
      logger.error('Occurred in token repository', userId);
      throw e;
    }
  }

  public async findByToken(token: string): Promise<IToken | null> {
    try {
      return await Token.findOne({ token: token });
    } catch (e) {
      logger.error('Occurred in token repository');
      throw e;
    }
  }

  public async updateToken(id: string, token: string): Promise<IToken | null> {
    try {
      return await Token.findOneAndUpdate({ _id: id }, { token: token });
    } catch (e) {
      logger.error('Occurred in token repository', id, token);
      throw e;
    }
  }

  public async updateOrCreateToken(
    userId: ObjectId,
    token: string,
    session: ClientSession
  ): Promise<IToken | null>;
  public async updateOrCreateToken(
    userId: ObjectId,
    token: string
  ): Promise<IToken | null>;
  public async updateOrCreateToken(
    userId: ObjectId,
    token: string,
    session?: ClientSession
  ): Promise<IToken | null> {
    try {
      if (session) {
        return await Token.findOneAndUpdate(
          { user: userId },
          { token: token },
          {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
            session: session,
          }
        );
      } else {
        return await Token.findOneAndUpdate(
          { user: userId },
          { token: token },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      }
    } catch (e) {
      logger.error('Error occurred in token repository', userId, token);
      throw e;
    }
  }
}

export default new TokenRepository();
