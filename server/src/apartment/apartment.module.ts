import { Module } from '@nestjs/common';
import { ApartmentService } from './services/apartment.service';
import { ApartmentController } from './controllers/apartment.controller';

@Module({
  providers: [ApartmentService],
  controllers: [ApartmentController],
})
export class ApartmentModule {}
