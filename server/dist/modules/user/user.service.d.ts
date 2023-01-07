import { Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';
import { RegisterUserDto } from './dto/registerUser.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    registerUser(registerUserDto: RegisterUserDto): Promise<any>;
    getUserById(id: MongooseSchema.Types.ObjectId): Promise<any>;
    getUserByMobile(mobile: string): Promise<User | null>;
}
