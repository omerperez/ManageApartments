import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ApartmentService } from '../apartment/apartment.service';
import { UserService } from '../user/user.service';
import { CreateTenantDto } from './dto/createTenant.dto';
import { TenantService } from './tenant.service';

@Controller('tenant')
export class TenantController {
    constructor(
        private tenantService: TenantService,
        private apartmentService: ApartmentService,
        private userService: UserService,
    ) { }

    @Post('/create')
    @UseInterceptors(FileInterceptor('doc'))
    async createClient(
        @Body() body: { tenant: string },
        @UploadedFile() doc: Express.Multer.File,
        @Res() res: Response
    ) {
        try {
            const tenant = body.tenant.trim();
            const createTenant: CreateTenantDto = JSON.parse(tenant);
            const newClient = await this.tenantService.createTenant(createTenant, doc);
            return res.status(HttpStatus.CREATED).send(newClient);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Get('/find')
    async getApartmentView(@Query() query: { apartmentId: string, owner: string }, @Res() response: Response) {
        const apartment = await this.apartmentService.getApartmentById(
            query.apartmentId,
            query.owner
        );
        const tenant = await this.tenantService.getTenantById(apartment.tenant);
        const tenantHistory = await this.tenantService.getTenantHistory(query.owner);
        return response.status(HttpStatus.OK).send({ apartment, tenant, tenantHistory });
    }

    @Get('/tenants_history')
    async getTenantHistory(@Query() query: { owner: string }, @Res() response: Response) {
        console.log(query.owner)
        const history = await this.tenantService.getTenantHistory(
            query.owner
        );
        console.log("history");
        console.log(history);
        return response.status(HttpStatus.OK).send(history);
    }

    // @Get('/getClients')
    // async getClients(@Query() getQueryDto: GetQueryDto, @Res() res: Response) {
    //     const clients: any = await this.tenantService.getClients(getQueryDto);
    //     return res.status(HttpStatus.OK).send(clients);
    // }

    // @Get('/getClientById/:id')
    // async getClientById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: Response) {
    //     const client: any = await this.tenantService.getClientById(id);
    //     return res.status(HttpStatus.OK).send(client);
    // }
}
