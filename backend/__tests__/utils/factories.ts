import { faker } from '@faker-js/faker';
import { User} from '../../src/entity/db/model/user';

export const getUser = () => {
    const user = new User();
    user.username = faker.internet.userName();
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    return user;
}