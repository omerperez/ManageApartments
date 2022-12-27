import { IApartment } from "../interfaces/IApartment";

class Address {
    city: string;
    street: string;
    number: number;
    floor: number;

    constructor(city: string, street: string, number: number, floor: number) {
        this.city = city;
        this.street = street;
        this.number = number;
        this.floor = floor;
    }
    getFullAddress() {
        return `${this.street} ${this.number}, ${this.floor && 'קומה'} ${this.floor},  ${this.city}`
    }
}
type ApartmentConstractorType =
    | {
        type: 'elemnt', element: {
            name: string, city: string,
            neighborhood: string,
            street: string, number: number, floor: number,
            apartmentNumber: number, postCode: number,
            price: number,
            area: number, bedrooms: number, toilet: number,
            animals: string, includes: string, comments: string,
            mainImageIndex: number,
            images: string[], currentTenantId: string
        }
    }
    | { type: 'interface', apartment: IApartment };

class Apartment implements IApartment {
    id: number;
    name: string;
    city: string;
    neighborhood: string;
    street: string;
    number: number;
    floor: number;
    apartmentNumber: number;
    address: Address;
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

    constructor(apartment: IApartment) {
        this.id = apartment.id;
        this.name = apartment.name;
        this.city = apartment.city;
        this.neighborhood = apartment.neighborhood;
        this.street = apartment.street;
        this.number = apartment.number;
        this.floor = apartment.floor;
        this.address = new Address(apartment.city, apartment.street, apartment.number, apartment.floor);
        this.apartmentNumber = apartment.apartmentNumber;
        this.postCode = apartment.postCode;
        this.bedrooms = apartment.bedrooms;
        this.toilet = apartment.toilet;
        this.animals = apartment.animals;
        this.includes = apartment.includes;
        this.comments = apartment.comments;
        this.mainImageIndex = apartment.mainImageIndex;
        this.area = apartment.area;
        this.price = apartment.price;
        this.images = apartment.images;
        this.currentTenantId = apartment.currentTenantId;
        this.managerId = apartment.managerId;
    }

    isRent() {
        const today: Date = new Date();
        return true;
        // return this.releaseDate > today;
    }

    getDateFormat = (date: Date) => {
        return `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`
    }

    getContentProperties() {
        return [
            {
                he_label: "שטח",
                en_label: "area",
                value: `${this.area} מ״ר`,
            }, {
                he_label: "שכר דירה",
                en_label: "Price",
                value: `${this.price} ש״ח`,
            }, {
                he_label: "תאריך כניסה",
                en_label: "Entery date",
                value: "20/01/2022"
                // this.getDateFormat(this.enteryDate),
            }, {
                he_label: "תאריך סיום חוזה",
                en_label: "Date of release",
                value: "20/01/2022"
                // value: this.getDateFormat(this.releaseDate),
            },
        ];
    }
}

export { Apartment, Address };

