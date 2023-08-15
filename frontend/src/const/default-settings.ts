import { Settings } from "../entity/model/settings";
import { ThemeEnum } from "../entity/model/theme-enum";

export const DEFAULT_SETTINGS: Settings = {
  theme: ThemeEnum.Light,
  themeRaw: ThemeEnum.Auto,
  enterToSend: false,
  mute: true,
  sortByContacts: true,
};
