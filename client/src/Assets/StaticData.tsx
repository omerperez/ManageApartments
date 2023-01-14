import { Apartment } from "../Data/builders/Apartment";
import { Tenant } from "../Data/builders/Tenant";
import { IUser } from "../Data/interfaces/IAuthentication";

const defaultApartment = new Apartment({
  _id: "1",
  name: "הדירה של עומר",
  city: "הרצליה ",
  neighborhood: "נווה עמל",
  street: "יציאת אירופה",
  number: 1,
  floor: 2,
  apartmentNumber: 3,
  postCode: 46375,
  price: 4500,
  area: 45,
  bedrooms: 1,
  toilet: 1,
  animals: "הרצליה",
  includes: "הרצליה",
  comments: "מוכן לכניסה מידית",
  mainImageIndex: 2,
  images: [
    "/staticImages/apartment.jpeg",
    "/staticImages/apa2.png",
    "/staticImages/apa2.png",
    "/staticImages/apa2.png",
  ],
  currentTenantId: "209543214",
  owner: "0545546468",
});

const defaultTenant: Tenant = new Tenant(
  "209543214",
  "אין דייר",
  "כעת",
  "-",
  "-",
  "-",
  "-",
  "-",
  new Date(1998, 1, 20),
  new Date(2020, 1, 20),
  new Date(2022, 1, 20),
);

const defaultTenant2: Tenant = new Tenant(
  "209543214",
  "עידו",
  "פרץ",
  "0523671766",
  "0545546468",
  "idoperez2@gmail.com",
  "male",
  "/testPdf.pdf",
  new Date(1998, 10, 18),
  new Date(2020, 1, 20),
  new Date(2022, 1, 20),
);

//DELETE AFTER CREATE BACKEND SIDE
const tempUser: IUser = {
  // id: "123",
  firstName: "Omer",
  lastName: "Perez",
  email: "omerperez222@gmail.com",
  mobile: "0522520484",
  token: "123123123",
  language: "he",
};

export { defaultTenant, defaultApartment, tempUser, defaultTenant2 };
