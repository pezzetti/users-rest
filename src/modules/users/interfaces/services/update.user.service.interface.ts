import { UserDomain } from 'src/modules/users/domain/user.domain';
import { User } from '../../domain/user.entity';

export interface UpdateUserService {
    update(userId: string, userDomain: UserDomain): Promise<User>;
}
