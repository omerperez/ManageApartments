/// <reference types="multer" />
import { Response } from 'express';
import { Schema as MongooseSchema } from 'mongoose';
import { ApartmentService } from './apartment.service';
export declare class ApartmentController {
    private apartmentService;
    constructor(apartmentService: ApartmentService);
    getUserApartments(query: {
        mobile: string;
    }, response: Response): Promise<Response<any, Record<string, any>>>;
    createApartment(files: Array<Express.Multer.File>, body: {
        apartmentDetails: string;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    getApartmentById(id: MongooseSchema.Types.ObjectId, res: Response): Promise<Response<any, Record<string, any>>>;
}
