import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controller/users.controller';
import { CreateUserServiceImpl } from './services/create.user.service';
import { User } from './domain/user.entity';
import { TYPES } from './interfaces/types';
import { GetUserServiceImpl } from './services/get.user.service';
import { UpdateUserServiceImpl } from './services/update.user.service';
import { DeleteUserServiceImpl } from './services/delete.user.service';

const createUserService = {
    provide: TYPES.services.CreateUserService,
    useClass: CreateUserServiceImpl,
};

const updateUserService = {
    provide: TYPES.services.UpdateUserService,
    useClass: UpdateUserServiceImpl,
};

const getUserService = {
    provide: TYPES.services.GetUserService,
    useClass: GetUserServiceImpl,
};

const deleteUserService = {
    provide: TYPES.services.DeleteUserService,
    useClass: DeleteUserServiceImpl,
};

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [
        createUserService,
        updateUserService,
        getUserService,
        deleteUserService,
    ],
    exports: [getUserService],
})
export class UsersModule {}
