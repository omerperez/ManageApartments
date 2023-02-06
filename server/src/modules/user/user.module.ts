import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScrapperService } from 'src/services/scrapper.service';
import { User, UserSchema } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UserController],
    providers: [UserService, UserRepository, ScrapperService],
    exports: [UserService, UserRepository],
})
export class UserModule { }
