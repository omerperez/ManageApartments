interface EditApartmentDto {
    id: string;
    owner: string;
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
}
export type { EditApartmentDto };