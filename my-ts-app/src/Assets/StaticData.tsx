import { Apartment } from "../Data/builders/Apartment";
import { Tenant } from "../Data/builders/Tenant";
import { IUser } from "../Data/interfaces/IUser";

const emptyApartment = new Apartment(
  "",
  "",
  "",
  "",
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  "",
  "",
  "",
  -1,
  [],
  "",
);

const defaultApartment = new Apartment(
  "הדירה של עומר",
  "הרצליה",
  "נווה עמל",
  "הרצליה",
  1,
  2,
  3,
  46375,
  4500,
  45,
  1,
  1,
  "הרצליה",
  "הרצליה",
  "מוכן לכניסה מידית",
  2,
  [
    "/staticImages/apartment.jpeg",
    "/staticImages/apa2.png",
    "/staticImages/apa2.png",
    "/staticImages/apa2.png",
  ],
  "209543214",
);

// name: "הדירה של עומר",
//   city: "הרצליה",
//   neighborhood: "נווה עמל",
//   street: "הרצליה",
//   number: 1,
//   floor: 2,
//   apartmentNumber: 3,
//   postCode: 46375,
//   price: 4500,
//   area: 45,
//   bedrooms: 1,
//   toilet: 1,
//   animals: "הרצליה",
//   includes: "הרצליה",
//   comments: "מוכן לכניסה מידית",
//   mainImageIndex: 2,
//   images: [
//     "/staticImages/apartment.jpeg",
//     "/staticImages/apa2.png",
//     "/staticImages/apa2.png",
//     "/staticImages/apa2.png",
//   ],
//   currentTenantId: "209543214",

const defaultTenant: Tenant = new Tenant(
  "209543214",
  "עומר",
  "פרץ",
  "0522520484",
  "0523671766",
  "omerperez222@gmail.com",
  "male",
  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
  new Date(),
  new Date(),
  new Date(),
);

//DELETE AFTER CREATE BACKEND SIDE
const tempUser: IUser = {
  id: "123",
  firstName: "Omer",
  lastName: "Perez",
  email: "omerperez222@gmail.com",
  mobile: "0522520484",
  token: "123123123",
  language: "he",
};

export { defaultTenant, defaultApartment, emptyApartment, tempUser };
