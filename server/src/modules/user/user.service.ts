import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';
import { RegisterUserDto } from './dto/registerUser.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async registerUser(registerUserDto: RegisterUserDto) {
        const hashPassword = await argon2.hash(registerUserDto.password);
        registerUserDto.password = hashPassword;
        return await this.userRepository.registerUser(registerUserDto);
    }

    async getUserById(id: MongooseSchema.Types.ObjectId) {
        return await this.userRepository.getUserById(id);
    }

    async getUserByMobile(mobile: string): Promise<User | null> {
        return await this.userRepository.getUserByMobile(mobile);
    }
}
