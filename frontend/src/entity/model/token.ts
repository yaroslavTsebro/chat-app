export interface Token {
  _id: string;
  token: string;
  user: string;
  createdAt: Date;
  updatedAt?: Date;
}
