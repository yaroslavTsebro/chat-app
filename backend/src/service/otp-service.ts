import otpRepository from '../repository/otp-repository';
import * as uuid from 'uuid';
import { config } from '../config/config';
import Jwt from '../utility/jwt';
import { IOtp } from '../entity/db/model/otp';
import { OtpPayload } from '../entity/dto/otp/otp-payload';

class OtpService {
  public async createOtp(userId: string): Promise<IOtp> {
    try {
      await otpRepository.findAndDeleteByUserId(userId);
      const payload = new OtpPayload();
      payload.userId = userId;

      let token = Jwt.generateToken(
        payload,
        config.server.otp.secret,
        config.server.otp.expires
      );
      return await otpRepository.create(userId, token);
    } catch (e) {
      throw e;
    }
  }
}

export default new OtpService();
