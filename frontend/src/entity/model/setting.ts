import { ThemeEnum } from "./theme-enum";

export interface Setting {
  _id: string;
  user: string;
  theme: ThemeEnum;
  enterToSend: boolean;
  mute: boolean;
  sortByContacts: boolean;
}
