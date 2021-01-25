import { UserDomain } from '../../domain/user.domain';
import { User } from '../../domain/user.entity';

export interface GetUserService {
    getById(id: string): Promise<User | undefined>;
    getByParams(user: UserDomain): Promise<User | undefined>;
}
