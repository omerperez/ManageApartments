import { UserId } from 'src/user/modules/user.interface';
import { IApartment, IObjectId } from '../modules/apartment.interface';
import { ApartmentService } from '../services/apartment.service';
export declare class ApartmentController {
    private apartmentService;
    constructor(apartmentService: ApartmentService);
    getManagerApartments(userId: UserId): Promise<any>;
    getById(apartmentId: IObjectId): Promise<{
        apartment: IApartment;
        tenant: any;
    }>;
    create(apartment: IApartment): Promise<any>;
    edit(apartment: IApartment): Promise<any>;
    delete(apartmentId: IObjectId): Promise<any>;
}
