import { Body, Controller, Post } from '@nestjs/common';
import { UserId } from 'src/user/modules/user.interface';
import { IApartment, IObjectId } from '../modules/apartment.interface';
import { ApartmentService } from '../services/apartment.service';

@Controller('apartment')
export class ApartmentController {
  constructor(private apartmentService: ApartmentService) {}

  @Post('all')
  async getManagerApartments(@Body() userId: UserId) {
    return await this.apartmentService.getApartmentByManagerId(userId);
  }

  @Post('find')
  async getById(@Body() apartmentId: IObjectId) {
    return await this.apartmentService.getById(apartmentId);
  }

  @Post('create')
  async create(@Body() apartment: IApartment) {
    return await this.apartmentService.create(apartment);
  }

  @Post('edit')
  async edit(@Body() apartment: IApartment) {
    return await this.apartmentService.edit(apartment);
  }

  @Post('delete')
  async delete(@Body() apartmentId: IObjectId) {
    return await this.apartmentService.delete(apartmentId);
  }
}
