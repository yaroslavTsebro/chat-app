import '@types/jest';
import { faker } from '@faker-js/faker';
import { IUser, User } from '../../src/entity/db/model/user';
import { db } from './connection';
import mongoose from 'mongoose';

export function createRandomUser(): IUser {
  return {
    _id: new mongoose.Types.ObjectId(faker.string.uuid()),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}

export function insertUser(user: IUser){

}

describe('UserRepository', () => {
  beforeAll(() => {
    db().then(() => {
      faker.string.uuid;
    });
  });

  describe('create', () => {});

  describe('findById', () => {
    test('present', () => {});
  });
});
