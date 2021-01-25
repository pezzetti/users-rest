import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDomain {
    @IsString()
    @IsOptional()
    @ApiProperty()
    readonly nome?: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    readonly idade?: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
    readonly cargo?: string;
}
