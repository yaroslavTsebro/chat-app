import * as DateFns from "date-fns";
import * as jose from "jose";
import { UserJWTData } from "../user-jwt-data";

export class LocalUser {
  public isAuthenticated: boolean;
  public isEmailConfirmed: boolean;
  public token: string;
  public id: string;
  public username: string;
  public email: string;
  private _avatar: string;
  public expiryDate: Date;
  public isVerified: boolean;

  private avatarRefreshTimestamp: string;

  constructor() {
    this.isAuthenticated = false;
  }

  static fromJWT(token: string) {
    const user = new LocalUser();
    const data = jose.decodeJwt(token) as UserJWTData;

    user.isAuthenticated = true;
    user.token = token;
    user.isVerified = data.isVerified;
    user.id = data._id;
    user.email = data.email;
    return user;
  }

  static empty() {
    return new LocalUser();
  }

  public get expired(): boolean {
    if (!this.isAuthenticated) throw new Error("User is not authenticated");
    return DateFns.isPast(this.expiryDate);
  }

  public get expireIn(): number {
    if (!this.isAuthenticated) throw new Error("User is not authenticated");
    return DateFns.differenceInSeconds(this.expiryDate, new Date());
  }

  public getAuthHeader(): { [header: string]: string } {
    if (!this.isAuthenticated) throw new Error("User is not authenticated");
    return {
      Authorization: `Bearer ${this.token}`,
    };
  }

  public get discriminator(): string {
    if (!this.isAuthenticated) throw new Error("User is not authenticated");
    return `${this.username}#${this.id}`;
  }

  public get emailMasked(): string {
    const emailSplit = this.email.split("@");
    const domainSplit = emailSplit[1].split(".");
    const sender = emailSplit[0];
    const senderMask = sender[0] + "*".repeat(sender.length - 1);
    const domainMask = domainSplit
      .map((item, i, arr) => {
        if (arr.length - 1 == i) return item;
        return item[0] + "*".repeat(item.length - 1);
      })
      .join(".");
    return `${senderMask}@${domainMask}`;
  }

  public refreshAvatar(): void {
    this.avatarRefreshTimestamp = DateFns.getUnixTime(new Date()).toString();
  }

  public get avatar(): string {
    if (this.avatarRefreshTimestamp) {
      return this._avatar + `?timestamp=${this.avatarRefreshTimestamp}`;
    }
    return this._avatar;
  }

  public get avatarCached(): string {
    return this._avatar;
  }
}
