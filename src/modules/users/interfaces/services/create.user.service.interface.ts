import { UserDomain } from 'src/modules/users/domain/user.domain';
import { User } from '../../domain/user.entity';

export interface CreateUserService {
    create(userDomain: UserDomain): Promise<User>;
}
