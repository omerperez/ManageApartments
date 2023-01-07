import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Query, Req, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { query, Response } from 'express';
import { Schema as MongooseSchema } from 'mongoose';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/createProduct.dto';

@Controller('apartment')
export class ApartmentController {
    constructor(private apartmentService: ApartmentService) { }

    @Get('/my-apartments')
    async getUserApartments(@Query() query: { mobile: string }, @Res() response: Response) {
        try {
            const userApartments = await this.apartmentService.getUserApartments(query.mobile);
            return response.status(HttpStatus.OK).send(userApartments);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Post('/create')
    @UseInterceptors(FilesInterceptor('files'))
    async createApartment(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Body() body: { apartmentDetails: string },
        @Res() res: Response
    ) {
        const apartmentDetails = body.apartmentDetails.trim()
        const createApartmentDto: CreateApartmentDto = JSON.parse(apartmentDetails);
        try {
            const newApartment: any = await this.apartmentService.createApartment(createApartmentDto, files);
            return res.status(HttpStatus.OK).send(newApartment);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    // @Put('/updateProduct/:id')
    // async updateProduct(@Param('id') id: MongooseSchema.Types.ObjectId, @Body() updateProductDto: UpdateProductDto, @Res() res: Response) {
    //     const session = await this.mongoConnection.startSession();
    //     session.startTransaction();
    //     try {
    //         const newProduct: any = await this.productService.updateProduct(updateProductDto, session);
    //         await session.commitTransaction();
    //         return res.status(HttpStatus.OK).send(newProduct);
    //     } catch (error) {
    //         await session.abortTransaction();
    //         throw new BadRequestException(error);
    //     } finally {
    //         session.endSession();
    //     }
    // }

    @Get('/getApartmentById/:id')
    async getApartmentById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: Response) {
        const storage: any = await this.apartmentService.getApartmentById(id);
        return res.status(HttpStatus.OK).send(storage);
    }

    // @Get('/getProducts')
    // async getAllProducts(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
    //     const storages: any = await this.productService.getProducts(getQueryDto);
    //     return res.status(HttpStatus.OK).send(storages);
    // }
}
