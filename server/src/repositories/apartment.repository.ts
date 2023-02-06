import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Apartment } from 'src/entities/apartment.entity';
import { UpdateApartmentDto } from 'src/modules/apartment/dto/updateApartment.dto';
import { UserService } from 'src/modules/user/user.service';
import { CreateApartmentDto } from '../modules/apartment/dto/createApartment.dto';

export class ApartmentRepository {
    constructor(@InjectModel(Apartment.name) private readonly apartmentModel: Model<Apartment>,
        private readonly userService: UserService,
    ) { }

    async getUserApartments(mobile: string) {
        let apartments: Apartment[] | undefined = [];
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
        return apartments
    }

    async getUserApartmentsId(owner: MongooseSchema.Types.ObjectId) {
        let apartments: any[];
        try {
            apartments = (await this.apartmentModel.find({ owner: owner }, '_id'))
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

    async getApartmentById(id: string, owner: string) {
        let apartment;
        const currentUser = await this.userService.getUserByMobile(owner);
        try {
            apartment = await this.apartmentModel.findById({ _id: id });
            if (!currentUser._id.equals(apartment.owner)) {
                throw new NotFoundException('Access Denied');
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        return apartment;
    }

    async delete(apartmentId: string, ownerMobile: string) {
        let deleteApartment;
        const currentUser = await this.userService.getUserByMobile(ownerMobile);
        try {
            deleteApartment = await this.apartmentModel.findOneAndDelete({ _id: apartmentId, owner: currentUser._id });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        return deleteApartment;
    }
}
