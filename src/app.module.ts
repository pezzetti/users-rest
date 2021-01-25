import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { getORMConfig } from './ormconfig';
import { configuration } from './config/configuration';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
        UsersModule,
        TypeOrmModule.forRoot(getORMConfig()),
    ],
})
export class AppModule {}
