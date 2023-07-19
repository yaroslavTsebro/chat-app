import { ClientSession } from 'mongoose';
import TokenRepository from '../repository/token-repository';
import { AppError } from '../entity/error/app-error';
import { ErrorCodes } from '../constant/error-codes';
import { ErrorMessages } from '../constant/error-messages';
import logger from '../utility/logger';
import { IToken } from '../entity/db/model/token';

class TokenService {
  public async saveToken(
    userId: string,
    token: string,
    session: ClientSession
  ): Promise<IToken>;
  public async saveToken(userId: string, token: string): Promise<IToken>;
  public async saveToken(
    userId: string,
    token: string,
    session?: ClientSession
  ): Promise<IToken> {
    try {
      let tokenEntity;
      if (session) {
        tokenEntity = await TokenRepository.updateOrCreateToken(
          userId,
          token,
          session
        );
      } else {
        tokenEntity = await TokenRepository.updateOrCreateToken(userId, token);
      }

      if (!tokenEntity) {
        throw new AppError(ErrorCodes.SERVER_ERROR, ErrorMessages.SERVER_ERROR);
      }

      return tokenEntity;
    } catch (e) {
      logger.error('Error occurred in token service', userId, token);
      throw e;
    }
  }

  async removeToken(refreshToken: string): Promise<IToken> {
    try {
      const deletedToken = await TokenRepository.deleteByToken(refreshToken);
      if (deletedToken) {
        return deletedToken;
      }

      throw new AppError(
        ErrorCodes.DATA_NOT_FOUND,
        ErrorMessages.DATA_NOT_FOUND
      );
    } catch (e) {
      throw new AppError(ErrorCodes.SERVER_ERROR, ErrorMessages.SERVER_ERROR);
    }
  }
}

export default new TokenService();
