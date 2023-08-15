import {SuccessResponse} from "../entity/response/success-otp";
import {$authHost} from "./index";
import {Settings} from "../entity/model/settings";

export const getSettings = async (): Promise<Settings> => {
  const { data } = await $authHost.get("api/settings/");
  return data;
};

export const updateSettings = async (): Promise<Settings> => {
  const { data } = await $authHost.patch("api/settings/");
  return data;
};