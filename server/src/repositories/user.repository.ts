import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { User } from '../entities/user.entity';
import { RegisterUserDto } from '../modules/user/dto/registerUser.dto';

export class UserRepository {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async registerUser(registerUserDto: RegisterUserDto) {
        let user = await this.getUserByMobile(registerUserDto.mobile);

        if (user) {
            throw new ConflictException('User already exists');
        }

        user = new this.userModel(registerUserDto);
        try {
            user = await user.save();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        if (!user) {
            throw new ConflictException('User not created');
        }
        return user;
    }

    async getUserById(id: MongooseSchema.Types.ObjectId) {
        let user;
        try {
            user = await this.userModel.findById({ _id: id });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async getUserByMobile(mobile: string) {
        let user: User | undefined = undefined;
        try {
            user = await this.userModel.findOne({ mobile: mobile });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        return user;
    }
}
