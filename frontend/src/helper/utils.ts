import { User } from "../entity/model/user";
import { UserJWTData } from "../entity/user-jwt-data";

export default class Utils {
  public static userDiscriminator(user: UserJWTData | User) {
    return `${user.username}#${user._id}`;
  }

  public static getBaseUrl() {
    return this.isDev()
      ? "http://localhost:3000"
      : "https://dokchat.dokurno.dev";
  }

  public static isDev(): boolean {
    return process.env.NODE_ENV != "production";
  }
}
