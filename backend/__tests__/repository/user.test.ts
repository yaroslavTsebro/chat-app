import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import mongoose from 'mongoose';
import { getUser } from '../utils/factories';
import userRepository from '../../src/repository/user-repository';
import { CreateUserDto } from '../../src/entity/dto/user/create-user-dto';

describe('UserRepository', () => {

  beforeAll( async () => {
    try{
      await mongoose.connect('mongodb+srv://yaroslavcebro:6vXul2Z6gq0oOcmv@cluster0.4jjc9pz.mongodb.net/?retryWrites=true&w=majority');
      console.log("Connection went successful");
    } catch(e) {
      console.log("Connection failed");
      console.log(e);
    }
  })


  afterAll(() => {
    try {
      mongoose.connection.db.dropDatabase();
    } catch (e) {
      console.log(e);
    }
  });

  describe('create', () => {
    test('should create user', async () => {
      try {
        const session = await mongoose.startSession();
        session.startTransaction();
        const user = getUser();

        const userForCreating = plainToInstance(CreateUserDto, user);
        const createdUser = await userRepository.create(
          userForCreating,
          session
        );
        expect(createdUser).toEqual(user);
      } catch (e) {
        console.log(e);
        throw e;
      }
    }, 1000 * 60 * 5); 
  });
});
