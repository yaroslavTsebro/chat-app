import { ThemeEnum } from "./theme-enum";

export interface Settings {
	theme: Omit<ThemeEnum, ThemeEnum.Auto>,
	themeRaw: ThemeEnum,
  enterToSend: boolean;
  mute: boolean;
  sortByContacts: boolean;
}