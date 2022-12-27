import { Connection } from 'typeorm';
import { IApartment, IObjectId } from '../modules/apartment.interface';
export declare class ApartmentService {
    private readonly connection;
    constructor(connection: Connection);
    getById(apartmentId: IObjectId): Promise<{
        apartment: IApartment;
        tenant: any;
    }>;
    getApartmentByManagerId(id: IObjectId): Promise<any>;
    create(apartment: IApartment): Promise<any>;
    edit(apartment: IApartment): Promise<any>;
    delete(apartmentId: IObjectId): Promise<any>;
}
