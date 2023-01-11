import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Apartment } from 'src/entities/apartment.entity';
import { UpdateApartmentDto } from 'src/modules/apartment/dto/updateApartment.dto';
import { TenantService } from 'src/modules/tenant/tenant.service';
import { UserService } from 'src/modules/user/user.service';
import { CreateApartmentDto } from '../modules/apartment/dto/createApartment.dto';

export class ApartmentRepository {
    constructor(@InjectModel(Apartment.name) private readonly apartmentModel: Model<Apartment>,
        private readonly userService: UserService,
    ) { }

    async getUserApartments(mobile: string) {
        let apartments: any[];
        const currentUser = await this.userService.getUserByMobile(mobile);
        try {
            if (currentUser) {
                apartments = (await this.apartmentModel.find({ owner: currentUser._id }))
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        if (!apartments || apartments.length === 0) {
            throw new NotFoundException('User dont have any apartment yet');
        }
        return apartments;
    }

    async createApartment(
        createApartmentDto: CreateApartmentDto,
        images: String[]) {
        const currentUser = await this.userService.getUserByMobile(createApartmentDto.owner);
        if (currentUser) {
            createApartmentDto.owner = currentUser._id;
        } else {
            throw new InternalServerErrorException('User Not Exist');
        }
        let apartment = new this.apartmentModel({
            ...createApartmentDto,
            images: images
        });
        try {
            apartment = await apartment.save();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        return apartment;
    }

    async editApartment(
        updateApartment: UpdateApartmentDto,
        newImagesUrl: string[]
    ) {
        const currentUser = await this.userService.getUserByMobile(updateApartment.owner);
        if (currentUser) {
            updateApartment.owner = currentUser._id;
        } else {
            throw new InternalServerErrorException('User Not Exist');
        }
        let apartment;
        try {
            if (newImagesUrl.length > 0) {
                const updateImages = updateApartment.images.concat(newImagesUrl);
                updateApartment.images = updateImages;
            }
            apartment = await this.apartmentModel.findOneAndUpdate({ _id: updateApartment.id }, updateApartment, {
                returnOriginal: false
            });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        return apartment;
    }

    async changeTenant(
        apartmentId: MongooseSchema.Types.ObjectId,
        tenantId: MongooseSchema.Types.ObjectId
    ) {
        const apartment = await this.apartmentModel.findById(apartmentId);
        if (apartment) {
            apartment.tenant = tenantId;
            return await apartment.update();
        }
        return undefined;
    }
    // async updateProduct(updateProduct: UpdateProductDto, session: ClientSession) {
    //     const actualDate = new Date();
    //     actualDate.toUTCString();

    //     const updateData = {
    //         status: updateProduct.status,
    //         client: updateProduct.clientId,
    //         updatedAt: actualDate,
    //     };

    //     let product;
    //     try {
    //         product = await this.apartmentModel
    //             .findOneAndUpdate({ _id: updateProduct.id }, updateData, {
    //                 new: true,
    //             })
    //             .session(session)
    //             .exec();
    //     } catch (error) {
    //         throw new InternalServerErrorException(error);
    //     }

    //     if (!product) {
    //         throw new ConflictException('Error trying to update product');
    //     }

    //     return product;
    // }

    // async getApartments(query: GetQueryDto) {
    //     let from = query.from || 0;
    //     from = Number(from);

    //     let limit = query.limit || 0;
    //     limit = Number(limit);

    //     let products: Product[];

    //     try {
    //         if (limit === 0) {
    //             products = await this.apartmentModel
    //                 .find()
    //                 .populate('client')
    //                 .populate('user', 'name email')
    //                 .skip(from)
    //                 .sort({ createdAt: -1 })
    //                 .exec();
    //         } else {
    //             products = await this.apartmentModel
    //                 .find()
    //                 .populate('client')
    //                 .populate('user', 'name email')
    //                 .skip(from)
    //                 .limit(limit)
    //                 .sort({ createdAt: -1 })
    //                 .exec();
    //         }

    //         let response;

    //         if (products.length > 0) {
    //             response = {
    //                 ok: true,
    //                 data: products,
    //                 message: 'Get Products Ok!',
    //             };
    //         } else {
    //             response = {
    //                 ok: true,
    //                 data: [],
    //                 message: 'No hay products',
    //             };
    //         }
    //         return response;
    //     } catch (error) {
    //         throw new InternalServerErrorException(error);
    //     }
    // }

    async getApartmentById(id: string, owner: string) {
        let apartment;
        const currentUser = await this.userService.getUserByMobile(owner);
        try {
            apartment = await this.apartmentModel.findById(id).exec();
            // if (currentUser._id !== apartment.owner) {
            //     throw new NotFoundException('Access Denied');
            // }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        return apartment;
    }
}
