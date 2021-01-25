import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../domain/user.entity';
import { UserDomain } from '../domain/user.domain';
import { GetUserService } from '../interfaces/services/get.user.service.interface';
import { TYPES } from '../interfaces/types';
import { UpdateUserService } from '../interfaces/services/update.user.service.interface';

@Injectable()
export class UpdateUserServiceImpl implements UpdateUserService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @Inject(TYPES.services.GetUserService)
        private getUserService: GetUserService
    ) {}

    async update(userId: string, user: UserDomain): Promise<User> {
        const userFound = await this.getUserService.getById(userId);
        if (!userFound) {
            Logger.log('User not found');
            throw new NotFoundException(`User with id ${userId} was not found`);
        }
        Logger.log('Updating the user');
        return this.usersRepository.save(Object.assign(userFound, user));
    }
}
