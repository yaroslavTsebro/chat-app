import otpRepository from '../repository/otp-repository';
import { config } from '../config/config';
import Jwt from '../utility/jwt';
import { IOtp } from '../entity/db/model/otp';
import { OtpPayload } from '../entity/dto/otp/otp-payload';
import logger from '../utility/logger';

class OtpService {

  public async createOtp(userId: string): Promise<IOtp> {
    try {
      await otpRepository.findAndDeleteByUserId(userId);
      const payload = new OtpPayload();
      payload.userId = userId;

      const token = Jwt.generateToken(
        payload,
        config.server.otp.secret,
        config.server.otp.expires
      );
      return await otpRepository.create(userId, token);
    } catch (e) {
      logger.error("An error occurred in token service")
      throw e;
    }
  }

}

export default new OtpService();
