import { DEFAULT_SETTINGS } from "../const/default-settings";
import { Settings } from "../entity/model/settings";
import { ThemeEnum } from "../entity/model/theme-enum";
import { useLocalStorage } from "./use-local-storage";

export function useSettings(): [Settings, (settings: Settings) => void] {
  const [settings, setSettings] = useLocalStorage<Settings>(
    "settings_V3",
    {} as Settings
  );

  const settingsCopy: Settings = {
    ...DEFAULT_SETTINGS,
    ...settings,
    theme: parseTheme(settings.themeRaw ?? DEFAULT_SETTINGS.themeRaw),
  };

  return [settingsCopy, setSettings];
}

function parseTheme(theme: ThemeEnum) {
  if (theme === ThemeEnum.Auto) {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    return darkThemeMq.matches ? ThemeEnum.Dark : ThemeEnum.Light;
  }
  return theme;
}
