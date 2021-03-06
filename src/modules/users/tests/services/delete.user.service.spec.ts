import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../domain/user.entity';
import { TYPES } from '../../interfaces/types';
import { GetUserService } from '../../interfaces/services/get.user.service.interface';
import { DeleteUserServiceImpl } from '../../services/delete.user.service';

class GetUserServiceMock {
    getById = jest.fn().mockResolvedValue(undefined);
}

class RepositoryMock {
    delete = jest.fn().mockResolvedValue(undefined);
}

describe('DeleteUserService', () => {
    let service: DeleteUserServiceImpl;
    let getService: GetUserService;
    let repositoryMock: Repository<User>;
    beforeAll(async () => {
        const app = await Test.createTestingModule({
            providers: [
                DeleteUserServiceImpl,
                {
                    provide: TYPES.services.GetUserService,
                    useClass: GetUserServiceMock,
                },
                {
                    // how you provide the injection token in a test instance
                    provide: getRepositoryToken(User),
                    // as a class value, Repository needs no generics
                    useClass: RepositoryMock,
                },
            ],
        }).compile();

        service = app.get<DeleteUserServiceImpl>(DeleteUserServiceImpl);
        getService = app.get(TYPES.services.GetUserService);
        repositoryMock = app.get<Repository<User>>(getRepositoryToken(User));
    });

    describe('delete', () => {
        it('should delete the user and returning it', async () => {
            const user: User = {
                userId: '123123123',
                nome: 'Rafael Pezzetti',
                cargo: 'tech leader',
                idade: 29,
            };
            getService.getById = jest.fn().mockResolvedValue(user);
            const result = await service.delete(user.userId);
            expect(result).toEqual(user);
            expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
        });

        it('should throw error if user does not exists', done => {
            const user: User = {
                userId: '123123123',
                nome: 'Rafael Pezzetti',
                cargo: 'tech leader',
                idade: 29,
            };
            getService.getById = jest.fn().mockResolvedValue(undefined);
            jest.spyOn(repositoryMock, 'delete');
            service
                .delete(user.userId)
                .then(() => {
                    done('it will not reach here');
                })
                .catch(error => {
                    expect(error.message.message).toEqual(
                        'User with id 123123123 was not found'
                    );
                    expect(getService.getById).toHaveBeenCalled();
                    done();
                });
        });
    });
});
