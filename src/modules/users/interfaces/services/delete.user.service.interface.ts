import { User } from '../../domain/user.entity';

export interface DeleteUserService {
    delete(userId: string): Promise<User>;
}
