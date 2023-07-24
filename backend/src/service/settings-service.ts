import { ServiceHelper } from './service-helper';
import { UpdateSettingsDto } from '../entity/dto/settings/update-settings-dto';
import settingsRepository from '../repository/settings-repository';
import { ISetting } from '../entity/db/model/setting';
import { AppError } from '../entity/error/app-error';
import { ErrorCodes } from '../constant/error-codes';
import { ErrorMessages } from '../constant/error-messages';
import logger from "../utility/logger";

class SettingsService extends ServiceHelper {
  async getSelf(userId: string): Promise<ISetting | null> {
    try {
      SettingsService.validateId(userId);

      const settings = await settingsRepository.getByUserId(userId);
      if (settings) {
        return settings;
      }

      throw new AppError(
        ErrorCodes.DATA_NOT_FOUND,
        ErrorMessages.DATA_NOT_FOUND
      );
    } catch (e) {
      logger.error('Occurred in settings service');
      throw e;
    }
  }

  async update(dto: UpdateSettingsDto, userId: string): Promise<ISetting> {
    try {
      SettingsService.validateId(userId);
      SettingsService.validateDto(dto);

      const settings = await settingsRepository.update(dto, userId);
      if (settings) {
        return settings;
      }

      throw new AppError(
        ErrorCodes.DATA_NOT_FOUND,
        ErrorMessages.DATA_NOT_FOUND
      );
    } catch (e) {
      logger.error('Occurred in settings service');
      throw e;
    }
  }
}

export default new SettingsService();
