import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Put, Query, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/createApartment.dto';
import { UpdateApartmentDto } from './dto/updateApartment.dto';

@Controller('apartment')
export class ApartmentController {
    constructor(
        private apartmentService: ApartmentService,
    ) { }

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


    @Post('/edit')
    @UseInterceptors(FilesInterceptor('files'))
    async editApartment(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Body() body: { updateApartment: string },
        @Res() res: Response
    ) {
        console.log(body);
        console.log(files);
        const apartmentDetails = body.updateApartment.trim()
        const updateApartment: UpdateApartmentDto = JSON.parse(apartmentDetails);
        try {
            const update: any = await this.apartmentService.editApartment(updateApartment, files);
            return res.status(HttpStatus.OK).send(update);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Get('/find')
    async getApartmentById(@Query() query: { id: string, owner: string }, @Res() response: Response) {
        const apartment = await this.apartmentService.getApartmentById(query.id, query.owner);
        return response.status(HttpStatus.OK).send(apartment);
    }

    // @Get('/getProducts')
    // async getAllProducts(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
    //     const storages: any = await this.productService.getProducts(getQueryDto);
    //     return res.status(HttpStatus.OK).send(storages);
    // }
}
