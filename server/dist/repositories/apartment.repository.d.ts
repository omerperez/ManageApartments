import { Model, Schema as MongooseSchema } from 'mongoose';
import { Apartment } from 'src/entities/apartment.entity';
import { UpdateApartmentDto } from 'src/modules/apartment/dto/updateApartment.dto';
import { UserService } from 'src/modules/user/user.service';
import { CreateApartmentDto } from '../modules/apartment/dto/createApartment.dto';
export declare class ApartmentRepository {
    private readonly apartmentModel;
    private readonly userService;
    constructor(apartmentModel: Model<Apartment>, userService: UserService);
    getUserApartments(mobile: string): Promise<any[]>;
    createApartment(createApartmentDto: CreateApartmentDto, images: String[]): Promise<Apartment & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    editApartment(updateApartment: UpdateApartmentDto, newImagesUrl: string[]): Promise<any>;
    changeTenant(apartmentId: MongooseSchema.Types.ObjectId, tenantId: MongooseSchema.Types.ObjectId): Promise<any>;
    getApartmentById(id: string, owner: string): Promise<any>;
}