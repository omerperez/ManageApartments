interface IApartment {
  id?: number;
  name: string;
  city: string;
  neighborhood: string;
  street: string;
  number: number;
  floor: number;
  apartmentNumber: number;
  postCode: number;
  price: number;
  area: number;
  bedrooms: number;
  toilet: number;
  animals: string;
  includes: string;
  comments: string;
  mainImageIndex: number;
  images: string[];
  currentTenantId: string;
  managerId: string;
}

interface IObjectId {
  id: string;
}

export { IApartment, IObjectId };
