import logger from '../utility/logger';
import { ISetting, Setting } from '../entity/db/model/setting';
import {ClientSession, ObjectId, UpdateQuery} from 'mongoose';
import { ThemeEnum } from '../entity/db/model/theme-enum';
import {UpdateSettingsDto} from "../entity/dto/settings/update-settings-dto";

class SettingsRepository {
  public async createDefault(
    userId: ObjectId,
    session: ClientSession
  ): Promise<ISetting> {
    try {
      const settings = new Setting({
        sortByContacts: true,
        mute: false,
        user: userId,
        theme: ThemeEnum.Auto,
      });
      return await settings.save({ session });
    } catch (e) {
      logger.error('Occurred in settings repository', userId);
      throw e;
    }
  }

  public async getByUserId(userId: string): Promise<ISetting | null> {
    try {
      return await Setting.findOne({ user: userId });
    } catch (e) {
      logger.error('Occurred in settings repository', userId);
      throw e;
    }
  }

  public async update(settings: UpdateSettingsDto, userId: string): Promise<ISetting | null> {
    try {
      const filter = { _id: userId };
      const update: UpdateQuery<ISetting> = {};

      if (settings.mute) {
        update.mute = settings.mute;
      }
      if (settings.sortByContacts) {
        update.sortByContacts = settings.sortByContacts;
      }
      if (settings.enterToSend) {
        update.enterToSend = settings.enterToSend;
      }
      if (settings.theme) {
        update.theme = settings.theme;
      }

      return await Setting.findOneAndUpdate(filter, update, { new: true });
    } catch (e) {
      logger.error('Occurred in settings repository', userId);
      throw e;
    }
  }
}

export default new SettingsRepository();
