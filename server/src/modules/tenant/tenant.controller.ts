import { BadRequestException, Body, Controller, HttpStatus, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { CreateTenantDto } from './dto/createTenant.dto';
import { TenantService } from './tenant.service';

@Controller('tenant')
export class TenantController {
    constructor(private tenantService: TenantService) { }

    // need agreement
    @Post('/create')
    @UseInterceptors(FileInterceptor('doc'))
    async createClient(
        @Body() createClientDto: CreateTenantDto,
        @UploadedFile() doc: Express.Multer.File,
        @Res() res: Response
    ) {
        try {
            const newClient = await this.tenantService.createTenant(createClientDto, doc);
            return res.status(HttpStatus.CREATED).send(newClient);
        } catch (error) {
            throw new BadRequestException(error);
        }
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
