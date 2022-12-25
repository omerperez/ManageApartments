import { Apartment } from "../Data/builders/Apartment";
import { Tenant } from "../Data/builders/Tenant";
import { IUser } from "../Data/interfaces/IUser";

const defaultApartment = new Apartment(
  "הדירה של עומר",
  "הרצליה ",
  "נווה עמל",
  "יציאת אירופה",
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

const defaultTenant: Tenant = new Tenant(
  "209543214",
  "עומר",
  "פרץ",
  "0522520484",
  "0523671766",
  "omerperez222@gmail.com",
  "male",
  "/testPdf.pdf",
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
  // token: "123123123",
  language: "he",
};

export { defaultTenant, defaultApartment, tempUser, defaultTenant2 };
