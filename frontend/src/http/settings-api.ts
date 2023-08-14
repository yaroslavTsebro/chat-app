import {SuccessResponse} from "../entity/response/success-otp";
import {$authHost} from "./index";
import {Setting} from "../entity/model/settings";

export const getSettings = async (): Promise<Setting> => {
  const { data } = await $authHost.get("api/settings/");
  return data;
};

export const updateSettings = async (): Promise<Setting> => {
  const { data } = await $authHost.patch("api/settings/");
  return data;
};