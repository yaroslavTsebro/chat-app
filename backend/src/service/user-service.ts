import userRepository from '../repository/user-repository';
import { ServiceHelper } from './service-helper';
import logger from '../utility/logger';
import { AppError } from '../entity/error/app-error';
import { ErrorCodes } from '../constant/error-codes';
import { ErrorMessages } from '../constant/error-messages';
import { IUser } from '../entity/db/model/user';
import { CreateUserDto } from '../entity/dto/user/create-user-dto';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { TokenPayload } from '../entity/dto/token/token-payload';
import Jwt from '../utility/jwt';
import TokenService from './token-service';
import { LoginUserDto } from '../entity/dto/user/login-user-dto';
import { IToken } from '../entity/db/model/token';
import tokenRepository from '../repository/token-repository';
import { JwtPayload } from 'jsonwebtoken';
import OtpService from './otp-service';
import { IOtp } from '../entity/db/model/otp';
import { Mailer } from '../utility/mailer';
import OtpRepository from '../repository/otp-repository';
import settingsRepository from '../repository/settings-repository';

type TokenResponse = Promise<{
  accessToken: string;
  refreshToken: string;
  user: TokenPayload;
}>;

class UserService extends ServiceHelper {
  async findById(id: string): Promise<IUser> {
    try {
      UserService.validateId(id);
      const user = await userRepository.findById(id);
      if (user) {
        return user;
      }
      throw new AppError(
        ErrorCodes.DONT_HAVE_SUCH_ACC,
        ErrorMessages.DONT_HAVE_SUCH_ACC
      );
    } catch (e) {
      logger.error('Occurred in user service', id);
      throw e;
    }
  }

  async register(dto: CreateUserDto): Promise<TokenResponse> {
    const session = await mongoose.startSession();
    try {
      UserService.validateDto(dto);
      const user = await userRepository.findByEmail(dto.email);
      if (user) {
        throw new AppError(
          ErrorCodes.ALREADY_HAVE_AN_ACC,
          ErrorMessages.ALREADY_HAVE_AN_ACC
        );
      }
      session.startTransaction();
      const salt = await bcrypt.genSalt();
      dto.password = await bcrypt.hash(dto.password, salt);

      const createdUser = await userRepository.create(dto, session);
      await settingsRepository.createDefault(createdUser._id, session);

      const tokenPayload = new TokenPayload(
        createdUser._id.toString(),
        createdUser.email,
        createdUser.isVerified
      );

      await this.createAndSendOtp(
        createdUser._id.toString(),
        createdUser.email
      );

      const tokens = Jwt.generateTokens(tokenPayload);
      await TokenService.saveToken(
        createdUser._id.toString(),
        tokens.refreshToken,
        session
      );

      await session.commitTransaction();
      return { ...tokens, user: tokenPayload };
    } catch (e) {
      await session.abortTransaction();
      logger.error('Occurred in user service', dto);
      throw e;
    } finally {
      await session.endSession();
    }
  }

  async login(dto: LoginUserDto): TokenResponse {
    try {
      UserService.validateDto(dto);

      const currentUser = await userRepository.findByEmail(dto.email);

      if (!currentUser) {
        throw new AppError(
          ErrorCodes.DONT_HAVE_SUCH_ACC,
          ErrorMessages.DONT_HAVE_SUCH_ACC
        );
      }

      const result = bcrypt.compareSync(dto.password, currentUser.password);
      if (!result) {
        throw new AppError(ErrorCodes.WRONG_PASS, ErrorMessages.WRONG_PASS);
      }
      const tokenPayload = new TokenPayload(
        currentUser._id.toString(),
        currentUser.email,
        currentUser.isVerified
      );

      const tokens = Jwt.generateTokens(tokenPayload);
      await TokenService.saveToken(
        currentUser._id.toString(),
        tokens.refreshToken
      );

      return { ...tokens, user: tokenPayload };
    } catch (e) {
      logger.error('Occurred in user service', dto);
      throw e;
    }
  }

  async logout(refreshToken: string): Promise<IToken> {
    try {
      return await TokenService.removeToken(refreshToken);
    } catch (e) {
      logger.error('Occurred in user service');
      throw e;
    }
  }

  public async refresh(token: string): TokenResponse {
    try {
      if (!token) {
        throw new AppError(
          ErrorCodes.UNAUTHORIZED,
          ErrorMessages.UNAUTHORIZED,
          []
        );
      }

      const userData = Jwt.validateRefreshToken(token);
      const tokenFromDB = await tokenRepository.findByToken(token);
      if (!userData || !tokenFromDB) {
        throw new AppError(
          ErrorCodes.UNAUTHORIZED,
          ErrorMessages.UNAUTHORIZED,
          []
        );
      }

      const user = await userRepository.findById((userData as JwtPayload).id);

      if (!user) {
        throw new AppError(
          ErrorCodes.DONT_HAVE_SUCH_ACC,
          ErrorMessages.DONT_HAVE_SUCH_ACC,
          []
        );
      }

      const dto = new TokenPayload(
        user._id.toString(),
        user.email,
        user.isVerified
      );
      const tokens = Jwt.generateTokens(dto);
      await TokenService.saveToken(dto._id, tokens.refreshToken);

      return { ...tokens, user: dto };
    } catch (e) {
      logger.error('Occurred in user service');
      throw e;
    }
  }

  public async activate(activateLink: string) {
    try {
      let otp = await OtpRepository.findByCode(activateLink);
      if (!otp) {
        throw new AppError(
          ErrorCodes.CODE_NOT_FOUND,
          ErrorMessages.CODE_NOT_FOUND,
          []
        );
      }

      const result = Jwt.validateOtp(activateLink);
      if (result) {
        await userRepository.updateUserIsVerified(otp.user.toString());
      } else {
        throw new AppError(
          ErrorCodes.EXPIRED_VERIFICATION_CODE,
          ErrorMessages.EXPIRED_VERIFICATION_CODE,
          []
        );
      }
    } catch (e) {
      logger.error('Occurred in user service');
      throw e;
    }
  }

  public async createAndSendOtp(userId: string): Promise<void>;
  public async createAndSendOtp(userId: string, email: string): Promise<void>;
  public async createAndSendOtp(userId: string, email?: string): Promise<void> {
    try {
      if (!email) {
        let user = await userRepository.findById(userId);
        if (!user) {
          throw new AppError(
            ErrorCodes.DONT_HAVE_SUCH_ACC,
            ErrorMessages.DONT_HAVE_SUCH_ACC,
            []
          );
        }
        const otp = await OtpService.createOtp(userId);
        await this.sendOtp(otp, user.email);
      } else {
        const otp = await OtpService.createOtp(userId);
        await this.sendOtp(otp, email);
      }
    } catch (e) {
      throw e;
    }
  }

  public async sendOtp(otp: IOtp, email: string): Promise<void> {
    try {
      let mailer = new Mailer();
      mailer.sendActivationLink(email, otp.code);
    } catch (e) {
      throw e;
    }
  }
}

export default new UserService();
