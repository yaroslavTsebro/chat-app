export class TokenPayload {
  _id: string;
  email: string;
  username: string;
  public avatar: string = "";
  isVerified: boolean;

  constructor(
    _id: string,
    email: string,
    isVerified: boolean,
    username: string
  ) {
    this._id = _id;
    this.email = email;
    this.username = username;
    this.isVerified = isVerified;
  }
}
