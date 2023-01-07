import { Model, Schema as MongooseSchema } from 'mongoose';
import { User } from '../entities/user.entity';
import { RegisterUserDto } from '../modules/user/dto/registerUser.dto';
export declare class UserRepository {
    private readonly userModel;
    constructor(userModel: Model<User>);
    registerUser(registerUserDto: RegisterUserDto): Promise<any>;
    getUserById(id: MongooseSchema.Types.ObjectId): Promise<any>;
    getUserByMobile(mobile: string): Promise<any>;
}
