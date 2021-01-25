import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../domain/user.entity';
import { CreateUserServiceImpl } from '../../services/create.user.service';
import { TYPES } from '../../interfaces/types';
import { GetUserService } from '../../interfaces/services/get.user.service.interface';

class GetUserServiceMock {
    getByParams = jest.fn().mockResolvedValue(undefined);
}

describe('CreateUserService', () => {
    let service: CreateUserServiceImpl;
    let getService: GetUserService;
    let repositoryMock: Repository<User>;
    beforeAll(async () => {
        const app = await Test.createTestingModule({
            providers: [
                CreateUserServiceImpl,
                {
                    provide: TYPES.services.GetUserService,
                    useClass: GetUserServiceMock,
                },
                {
                    // how you provide the injection token in a test instance
                    provide: getRepositoryToken(User),
                    // as a class value, Repository needs no generics
                    useClass: Repository,
                },
            ],
        }).compile();

        service = app.get<CreateUserServiceImpl>(CreateUserServiceImpl);
        getService = app.get(TYPES.services.GetUserService);
        repositoryMock = app.get<Repository<User>>(getRepositoryToken(User));
    });

    describe('create', () => {
        it('should return the same user if already exists', async () => {
            const user: User = {
                userId: '123123123',
                nome: 'Rafael Pezzetti',
                cargo: 'tech leader',
                idade: 29,
            };
            getService.getByParams = jest.fn().mockResolvedValue(user);
            jest.spyOn(repositoryMock, 'save').mockResolvedValueOnce(user);
            expect(await service.create(user)).toEqual(user);
            expect(repositoryMock.save).toHaveBeenCalledTimes(0);
        });

        it('should create user', async () => {
            getService.getByParams = jest.fn().mockResolvedValue(undefined);
            const user: User = {
                userId: '123123123',
                nome: 'Rafael Pezzetti',
                cargo: 'tech leader',
                idade: 29,
            };
            jest.spyOn(repositoryMock, 'save').mockResolvedValueOnce(user);
            expect(await service.create(user)).toEqual(user);
            expect(repositoryMock.save).toBeCalled();
        });
    });
});
