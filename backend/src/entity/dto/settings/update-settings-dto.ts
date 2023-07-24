import { ThemeEnum } from '../../db/model/theme-enum';

export class UpdateSettingsDto {
  theme: ThemeEnum;
  enterToSend: boolean;
  mute: boolean;
  sortByContacts: boolean;
}
