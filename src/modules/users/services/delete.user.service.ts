import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../domain/user.entity';
import { GetUserService } from '../interfaces/services/get.user.service.interface';
import { TYPES } from '../interfaces/types';
import { DeleteUserService } from '../interfaces/services/delete.user.service.interface';

@Injectable()
export class DeleteUserServiceImpl implements DeleteUserService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @Inject(TYPES.services.GetUserService)
        private getUserService: GetUserService
    ) {}

    async delete(userId: string): Promise<User> {
        const userFound = await this.getUserService.getById(userId);
        if (!userFound) {
            Logger.log('User not found to delete it');
            throw new NotFoundException(`User with id ${userId} was not found`);
        }
        Logger.log('Deleting the user');
        await this.usersRepository.delete({ userId });
        return userFound;
    }
}
