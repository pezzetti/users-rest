import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../domain/user.entity';
import { UserDomain } from '../domain/user.domain';
import { CreateUserService } from '../interfaces/services/create.user.service.interface';
import { GetUserService } from '../interfaces/services/get.user.service.interface';
import { TYPES } from '../interfaces/types';

@Injectable()
export class CreateUserServiceImpl implements CreateUserService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @Inject(TYPES.services.GetUserService)
        private getUserService: GetUserService
    ) {}

    async create(user: UserDomain): Promise<User> {
        const userFound = await this.getUserService.getByParams(user);
        if (userFound) {
            Logger.log('This user already exists returning the retrieved one');
            return userFound;
        }
        Logger.log('Creating an user');
        return this.usersRepository.save(user);
    }
}
