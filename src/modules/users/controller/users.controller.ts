import {
    Controller,
    Inject,
    Post,
    Body,
    UsePipes,
    Get,
    Param,
    ParseUUIDPipe,
    NotFoundException,
    Put,
    Delete,
} from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { UserDomain } from '../domain/user.domain';
import { TYPES } from '../interfaces/types';
import { ValidationPipe } from '../../../common/validation.pipe';
import { CreateUserService } from '../interfaces/services/create.user.service.interface';
import { GetUserService } from '../interfaces/services/get.user.service.interface';
import { UpdateUserService } from '../interfaces/services/update.user.service.interface';
import { UpdateUserDomain } from '../domain/update.user.domain';
import { DeleteUserService } from '../interfaces/services/delete.user.service.interface';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(
        @Inject(TYPES.services.CreateUserService)
        private createUserService: CreateUserService,

        @Inject(TYPES.services.GetUserService)
        private getUserService: GetUserService,

        @Inject(TYPES.services.UpdateUserService)
        private updateUserService: UpdateUserService,

        @Inject(TYPES.services.DeleteUserService)
        private deleteUserService: DeleteUserService
    ) {}

    @ApiCreatedResponse({
        description: 'It creates a new user',
        type: UserDomain,
    })
    @UsePipes(new ValidationPipe(UserDomain))
    @Post()
    async create(@Body() userDomain: UserDomain): Promise<UserDomain> {
        const user = await this.createUserService.create(userDomain);
        return user;
    }

    @ApiOkResponse({
        description: 'It updates the user using his id as key',
        type: UserDomain,
    })
    @UsePipes(new ValidationPipe(UpdateUserDomain))
    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() userDomain: UserDomain
    ): Promise<UserDomain> {
        const user = await this.updateUserService.update(id, userDomain);
        return user;
    }

    @ApiOkResponse({
        description: 'Get user by id',
        type: UserDomain,
    })
    @ApiNotFoundResponse({
        description: 'User was not found',
    })
    @Get(':id')
    async findOne(
        @Param('id', new ParseUUIDPipe()) id: string
    ): Promise<UserDomain | undefined> {
        const user = await this.getUserService.getById(id);
        if (!user) {
            throw new NotFoundException(`user with id ${id} was not found`);
        }
        return user;
    }

    @ApiOkResponse({
        description: 'Get user by id',
        type: UserDomain,
    })
    @ApiNotFoundResponse({
        description: 'User was not found',
    })
    @Delete(':id')
    async deleteUser(
        @Param('id', new ParseUUIDPipe()) id: string
    ): Promise<UserDomain> {
        const user = await this.deleteUserService.delete(id);
        return user;
    }
}
