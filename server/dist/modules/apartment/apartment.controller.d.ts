/// <reference types="multer" />
import { Response } from 'express';
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
    editApartment(files: Array<Express.Multer.File>, body: {
        updateApartment: string;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    getApartmentById(query: {
        id: string;
        owner: string;
    }, response: Response): Promise<Response<any, Record<string, any>>>;
    delete(query: {
        apartmentId: string;
        owner: string;
    }, response: Response): Promise<Response<any, Record<string, any>>>;
}
