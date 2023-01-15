import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { ApartmentService } from 'src/modules/apartment/apartment.service';
import { ChangeTenantDto } from 'src/modules/tenant/dto/changeTenant.dto';
import { CreateTenantDto } from 'src/modules/tenant/dto/createTenant.dto';
import { EditTenantDto } from 'src/modules/tenant/dto/editTenant.dto';
import { UserService } from 'src/modules/user/user.service';
import { Tenant } from '../entities/tenant.entity';

export class TenantRepository {
    constructor(
        @InjectModel(Tenant.name)
        private readonly tenantModel: Model<Tenant>,
        private readonly userService: UserService,
        private readonly apartmentService: ApartmentService
    ) { }

    async createTenant(createTenantDto: CreateTenantDto, document: string) {
        const ownerMobile = createTenantDto.owner;
        const currentUser = await this.userService.getUserByMobile(createTenantDto.owner);
        if (currentUser) {
            createTenantDto.owner = currentUser._id;
        } else {
            throw new InternalServerErrorException('User Not Exist');
        }
        let tenant = new this.tenantModel({
            ...createTenantDto,
            agreement: [document],
            currentAgreement: document
        });
        try {
            tenant = await this.tenantModel.create(tenant);
            const currentApartment = await this.apartmentService
                .getApartmentById(
                    createTenantDto.apartment,
                    ownerMobile
                );
            if (currentApartment.tenant) {
                currentApartment.tenantsHistory = currentApartment.tenantsHistory.concat(currentApartment.tenant);
            }

            currentApartment.tenant = tenant._id;
            await currentApartment.save();
        } catch (error) {
            throw new InternalServerErrorException('Error al consultar la BD', error);
        }
        return tenant;
    }

    async editTenant(editTenantDto: EditTenantDto, document: string | undefined) {
        const currentUser = await this.userService.getUserByMobile(editTenantDto.owner);
        if (currentUser) {
            editTenantDto.owner = currentUser._id;
        } else {
            throw new InternalServerErrorException('User Not Exist');
        }
        let tenant;
        try {
            if (document) {
                const agreements = editTenantDto.agreement.concat(editTenantDto.currentAgreement);
                editTenantDto.currentAgreement = document;
                editTenantDto.agreement = agreements;
            }
            tenant = await this.tenantModel.findOneAndUpdate({ _id: editTenantDto._id }, editTenantDto, {
                returnOriginal: false
            });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        return tenant;
    }

    async getTenantHistory(owner: string) {
        const currentUser = await this.userService.getUserByMobile(owner);
        let tenantsHistory;
        try {
            if (currentUser) {
                const apartments = await this.apartmentService.getUserApartmentsId(currentUser._id);
                const allTenant = await this.tenantModel.find();
                const apartmentsJson = JSON.stringify(apartments);
                tenantsHistory = allTenant.filter((tenant) => {
                    return (apartmentsJson.indexOf(JSON.stringify(tenant.apartment)) !== -1);
                })
            }
        } catch (error) {
            throw new InternalServerErrorException('Error al consultar la BD', error);
        }
        return tenantsHistory;
    }

    async changeTenant(data: ChangeTenantDto) {
        const currentUser = await this.userService.getUserByMobile(data.owner);
        let apartment;
        try {
            apartment = await this.apartmentService.getApartmentById(data.apartmentId, data.owner);
            if (apartment && currentUser._id.equals(apartment.owner)) {
                apartment = {
                    ...apartment._doc,
                    id: data.apartmentId,
                    owner: data.owner,
                    tenantsHistory: apartment.tenant ? apartment.tenantsHistory.concat(apartment.tenant) : apartment.tenantsHistory
                };
                if (data.newTenantId) {
                    const newTenant = await this.tenantModel.findById(data.newTenantId);
                    apartment.tenant = newTenant._id;
                } else {
                    apartment.tenant = null;
                }
                apartment = await this.apartmentService.editApartment(apartment, []);
            }
        } catch (error) {
            throw new InternalServerErrorException('Error al consultar la BD', error);
        }
        return apartment;
    }
    // async getClients(query: GetQueryDto) {
    //     let from = query.from || 0;
    //     from = Number(from);

    //     let limit = query.limit || 0;
    //     limit = Number(limit);

    //     let clients: Client[];

    //     try {
    //         if (limit === 0) {
    //             clients = await this.clientModel
    //                 .find()
    //                 .populate('client')
    //                 .skip(from)
    //                 .sort({ createdAt: -1 })
    //                 .exec();
    //         } else {
    //             clients = await this.clientModel
    //                 .find()
    //                 .populate('client')
    //                 .skip(from)
    //                 .limit(limit)
    //                 .sort({ createdAt: -1 })
    //                 .exec();
    //         }

    //         let response: ResponseDto;

    //         if (clients.length > 0) {
    //             response = {
    //                 ok: true,
    //                 data: clients,
    //                 message: 'Get Clients Ok!',
    //             };
    //         } else {
    //             response = {
    //                 ok: true,
    //                 data: [],
    //                 message: 'No hay clientes',
    //             };
    //         }
    //         return response;
    //     } catch (error) {
    //         throw new InternalServerErrorException('Error al intentar consultar los clientes', error);
    //     }
    // }

    async getTenantById(id: MongooseSchema.Types.ObjectId) {
        let tenant;
        try {
            tenant = await this.tenantModel.findById(id).exec();
        } catch (error) {
            throw new InternalServerErrorException('No existe el registro con id' + id, error);
        }
        if (!tenant) {
            throw new NotFoundException('The tenant with this id does not exist');
        }
        return tenant;
    }

    // async getClientByName(name: string): Promise<Client> {
    //     let client;

    //     try {
    //         client = await this.clientModel.find({ name });
    //     } catch (error) {
    //         throw new InternalServerErrorException('Error connecting to MongoDB', error);
    //     }

    //     return client;
    // }
}
