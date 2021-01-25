import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDomain {
    @IsString()
    @ApiProperty()
    readonly nome: string;

    @IsNumber()
    @ApiProperty()
    readonly idade: number;

    @IsString()
    @ApiProperty()
    readonly cargo: string;
}
