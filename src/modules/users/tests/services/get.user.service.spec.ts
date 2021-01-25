import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GetUserService } from 'src/modules/users/interfaces/services/get.user.service.interface';
import { GetUserServiceImpl } from '../../services/get.user.service';
import { User } from '../../domain/user.entity';

describe('GetUserService', () => {
    let service: GetUserService;
    let repositoryMock: Repository<User>;
    beforeAll(async () => {
        const app = await Test.createTestingModule({
            providers: [
                GetUserServiceImpl,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = app.get<GetUserService>(GetUserServiceImpl);
        repositoryMock = app.get<Repository<User>>(getRepositoryToken(User));
    });

    describe('findById', () => {
        it('should find user by id', async () => {
            const user: User = {
                userId: '123123123',
                nome: 'Rafael Pezzetti',
                cargo: 'tech leader',
                idade: 29,
            };
            jest.spyOn(repositoryMock, 'findOne').mockResolvedValueOnce(user);
            expect(await service.getById(user.userId)).toEqual(user);
            expect(repositoryMock.findOne).toBeCalled();
        });
    });

    describe('findByParams', () => {
        it('should find user by Params', async () => {
            const user: User = {
                userId: '123123123',
                nome: 'Rafael Pezzetti',
                cargo: 'tech leader',
                idade: 29,
            };
            jest.spyOn(repositoryMock, 'findOne').mockResolvedValueOnce(user);
            expect(await service.getByParams(user)).toEqual(user);
            expect(repositoryMock.findOne).toBeCalled();
        });
    });
});
