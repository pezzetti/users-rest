import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../controller/users.controller';
import { CreateUserService } from '../../interfaces/services/create.user.service.interface';
import { DeleteUserService } from '../../interfaces/services/delete.user.service.interface';
import { GetUserService } from '../../interfaces/services/get.user.service.interface';
import { UpdateUserService } from '../../interfaces/services/update.user.service.interface';
import { TYPES } from '../../interfaces/types';

const user = {
    userId: '123123123',
    nome: 'Rafael Pezzetti',
    cargo: 'tech leader',
    idade: 29,
};

class CreateUserServiceMock {
    create = jest.fn().mockResolvedValue(user);
}

class GetUserServiceMock {
    getById = jest.fn().mockResolvedValue(user);
}

class UpdateUserServiceMock {
    update = jest.fn().mockResolvedValue(user);
}

class DeleteUserServiceMock {
    delete = jest.fn().mockResolvedValue(user);
}

describe('Users Controller', () => {
    let controller: UsersController;
    let createUserServiceMock: CreateUserService;
    let updateUserServiceMock: UpdateUserService;
    let getUserServiceMock: GetUserService;
    let deleteUserServiceMock: DeleteUserService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: TYPES.services.CreateUserService,
                    useClass: CreateUserServiceMock,
                },
                {
                    provide: TYPES.services.GetUserService,
                    useClass: GetUserServiceMock,
                },
                {
                    provide: TYPES.services.UpdateUserService,
                    useClass: UpdateUserServiceMock,
                },
                {
                    provide: TYPES.services.DeleteUserService,
                    useClass: DeleteUserServiceMock,
                },
            ],
        }).compile();

        controller = app.get<UsersController>(UsersController);
        createUserServiceMock = app.get(TYPES.services.CreateUserService);
        updateUserServiceMock = app.get(TYPES.services.UpdateUserService);
        getUserServiceMock = app.get(TYPES.services.GetUserService);
        deleteUserServiceMock = app.get(TYPES.services.DeleteUserService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('findOne', () => {
        it('should get user by id', async () => {
            jest.spyOn(getUserServiceMock, 'getById');

            expect(await controller.findOne(user.userId)).toEqual(user);
            expect(getUserServiceMock.getById).toBeCalled();
        });
        it('should return 404 if user is not found', done => {
            getUserServiceMock.getById = jest.fn().mockResolvedValue(undefined);

            controller
                .findOne(user.userId)
                .then(() => {
                    done('Error, should not get here');
                })
                .catch(error => {
                    expect(error.message.message).toBe(
                        'user with id 123123123 was not found'
                    );
                    expect(getUserServiceMock.getById).toBeCalled();
                    done();
                });
        });
    });

    describe('create', () => {
        it('should create user', async () => {
            jest.spyOn(createUserServiceMock, 'create');

            expect(await controller.create(user)).toEqual(user);
            expect(createUserServiceMock.create).toBeCalled();
        });
    });

    describe('update', () => {
        it('should update the user', async () => {
            jest.spyOn(updateUserServiceMock, 'update');

            expect(await controller.update('123', user)).toEqual(user);
            expect(updateUserServiceMock.update).toBeCalled();
        });
    });

    describe('delete', () => {
        it('should delete the user', async () => {
            jest.spyOn(deleteUserServiceMock, 'delete');

            expect(await controller.deleteUser('123')).toEqual(user);
            expect(deleteUserServiceMock.delete).toBeCalled();
        });
    });
});
