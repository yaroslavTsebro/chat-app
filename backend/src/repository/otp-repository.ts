import logger from '../utility/logger';
import { IOtp, Otp } from '../entity/db/model/otp';

class OtpRepository {
  async findAndDeleteByUserId(userId: string): Promise<IOtp | null> {
    try {
      return await Otp.findOneAndDelete({ user: userId });
    } catch (e) {
      logger.error('Occurred in otp repository', userId);
      throw e;
    }
  }

  async findByCode(code: string): Promise<IOtp | null> {
    try {
      return await Otp.findOneAndDelete({ code: code });
    } catch (e) {
      logger.error('Occurred in otp repository');
      throw e;
    }
  }

  async create(userId: string, token: string): Promise<IOtp> {
    try {
      return await Otp.create({
        user: userId,
        code: token,
      });
    } catch (e) {
      logger.error('Occurred in otp repository', userId);
      throw e;
    }
  }
}

export default new OtpRepository();
