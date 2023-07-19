export class TokenPayload {
  _id: string;
  email: string;
  isVerified: boolean;

  constructor(_id: string, email: string, isVerified: boolean) {
    this._id= _id;
    this.email= email;
    this.isVerified= isVerified;
  }
}