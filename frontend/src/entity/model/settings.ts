import { ThemeEnum } from "./theme-enum";

export interface Settings {
  theme: Omit<ThemeEnum, ThemeEnum.Auto>;
  enterToSend: boolean;
  mute: boolean;
  sortByContacts: boolean;
}