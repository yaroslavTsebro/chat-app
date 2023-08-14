import { createContext } from "react";
import { Settings } from "../entity/model/settings";

export const SettingsContext = createContext<
  [Settings, (settings: Settings) => void]
>({} as any);
