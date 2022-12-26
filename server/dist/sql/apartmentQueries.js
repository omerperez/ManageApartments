"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apartmentById = `SELECT * FROM APARTMENTS WHERE id = :id`;
const getManagerApartmentById = `SELECT * FROM APARTMENTS WHERE "managerId" = :id`;
const createApartment = `INSERT INTO APARTMENTS(
  name, city, neighborhood, street, number, 
  floor, apartmentNumber, postCode, price, area,
  bedrooms, toilet, animals, includes,
  comments, mainImageIndex, images, currentTenantId, managerId
)
VALUES (
  :name, :city, :neighborhood, :street, :number, 
  :floor, :apartmentNumber, :postCode, :price, :area, 
  :bedrooms, :toilet, :animals, :includes, 
  :comments, :mainImageIndex, :images, :currentTenantId, :managerId
  );
`;
const editApartment = `UPDATE APARTMENTS
    SET id=:id, name=:name, city=:city, neighborhood=:neighborhood, 
    street=:street, "number"=:number, floor=:floor,
     apartmentnumber=:apartmentnumber, postcode=:postcode, 
     price=:price, area=:area, bedrooms=:bedrooms, 
     toilet=:toilet, animals=:animals, includes=:includes,
     comments=:comments, mainimageindex=:mainimageindex, images=:images,
     currenttenantid=:currenttenantid, managerid=:managerid
     WHERE id=:id;`;
const deleteApartment = `DELETE FROM APARTMENTS WHERE id=:id`;
exports.default = {
    createApartment,
    getManagerApartmentById,
    apartmentById,
    editApartment,
    deleteApartment,
};
//# sourceMappingURL=apartmentQueries.js.map