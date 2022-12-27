import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import apartmentQueries from 'src/sql/apartmentQueries';
import tenantQueries from 'src/sql/tenantQueries';
import getQueryAndObjectValues from 'src/utils/QueryUtil';
import { Connection } from 'typeorm';
import { IApartment, IObjectId } from '../modules/apartment.interface';

@Injectable()
export class ApartmentService {
  constructor(@InjectConnection() private readonly connection: Connection) { }

  async getById(apartmentId: IObjectId) {
    const [currentApartmentQuery, parameters] = getQueryAndObjectValues(
      apartmentQueries.apartmentById,
      apartmentId,
    );
    const [currentApartment] = await this.connection.query(
      currentApartmentQuery as string,
      parameters as any[],
    ) as IApartment[];

    if (currentApartment) {
      const [tenantByIdQuery, tenantParameters] = getQueryAndObjectValues(
        tenantQueries.tenantById,
        { currentTenantId: currentApartment.currentTenantId },
      );
      const tenant = await this.connection.query(
        tenantByIdQuery as string,
        tenantParameters as any[],
      );
      return {
        apartment: currentApartment,
        tenant: tenant,
      }
    }
    return undefined;
  }

  async getApartmentByManagerId(id: IObjectId) {
    const [apartmentByManagerQuery, parameters] = getQueryAndObjectValues(
      apartmentQueries.getManagerApartmentById,
      id,
    );
    return await this.connection.query(
      apartmentByManagerQuery as string,
      parameters as any[],
    );
  }

  async create(apartment: IApartment) {
    const [createQuery, parameters] = getQueryAndObjectValues(
      apartmentQueries.createApartment,
      apartment,
    );
    return await this.connection.query(
      createQuery as string,
      parameters as any[],
    );
  }

  async edit(apartment: IApartment) {
    const [editQuery, parameters] = getQueryAndObjectValues(
      apartmentQueries.editApartment,
      apartment,
    );
    return await this.connection.query(
      editQuery as string,
      parameters as any[],
    );
  }

  async delete(apartmentId: IObjectId) {
    const [deleteQuery, parameters] = getQueryAndObjectValues(
      apartmentQueries.deleteApartment,
      apartmentId,
    );
    return await this.connection.query(
      deleteQuery as string,
      parameters as any[],
    );
  }
}
