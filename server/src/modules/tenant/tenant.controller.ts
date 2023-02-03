import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Schema } from 'mongoose';
import { DashboardService } from 'src/services/dashboard.service';
import { ApartmentService } from '../apartment/apartment.service';
import { UserService } from '../user/user.service';
import { ChangeTenantDto } from './dto/changeTenant.dto';
import { CreateTenantDto } from './dto/createTenant.dto';
import { EditTenantDto } from './dto/editTenant.dto';
import { TenantService } from './tenant.service';

@Controller('tenant')
export class TenantController {
    constructor(
        private tenantService: TenantService,
        private apartmentService: ApartmentService,
        private userService: UserService,
        private dashboardService: DashboardService
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

    @Post('/edit')
    @UseInterceptors(FileInterceptor('newDocument'))
    async editTenant(
        @Body() body: { tenant: string },
        @UploadedFile() newDocument: Express.Multer.File,
        @Res() res: Response
    ) {
        try {
            const tenant = body.tenant.trim();
            const editTenant: EditTenantDto = JSON.parse(tenant);
            const updateTenant = await this.tenantService.editTenant(editTenant, newDocument);
            return res.status(HttpStatus.CREATED).send(updateTenant);
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
        let tenantHistory = [];

        await Promise.all(apartment.tenantsHistory.map(async (tenantId: Schema.Types.ObjectId) => {
            const currentTenant = await this.tenantService.getTenantById(tenantId);
            tenantHistory.push(currentTenant);
        }));
        // const tenantHistory = await this.tenantService.getTenantHistory(query.owner);
        return response.status(HttpStatus.OK).send({ apartment, tenant, tenantHistory });
    }

    @Get('/tenants_history')
    async getTenantHistory(@Query() query: { owner: string }, @Res() response: Response) {
        const history = await this.tenantService.getTenantHistory(
            query.owner
        );
        return response.status(HttpStatus.OK).send(history);
    }

    @Post('/change_tenant')
    async changeTenant(@Body() body: ChangeTenantDto, @Res() response: Response) {
        const editApartment = await this.tenantService.changeTenant(
            body
        );
        return response.status(HttpStatus.OK).send(editApartment);
    }

    @Get('/agreements')
    async getAgreements(@Query() query: { owner: string }, @Res() response: Response) {
        const docsData = await this.dashboardService.getAgreementsData(query.owner);
        console.log(docsData)
        return response.status(HttpStatus.OK).send(docsData);
    }
}
