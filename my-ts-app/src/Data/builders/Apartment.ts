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

class Apartment implements IApartment {
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

    constructor(name: string, city: string,
        neighborhood: string,
        street: string, number: number, floor: number,
        apartmentNumber: number, postCode: number,
        price: number,
        area: number, bedrooms: number, toilet: number,
        animals: string, includes: string, comments: string,
        mainImageIndex: number,
        images: string[], currentTenantId: string) {
        this.name = name;
        this.city = city;
        this.neighborhood = neighborhood;
        this.street = street;
        this.number = number;
        this.floor = floor;
        this.address = new Address(city, street, number, floor);
        this.apartmentNumber = apartmentNumber;
        this.postCode = postCode;
        this.bedrooms = bedrooms;
        this.toilet = toilet;
        this.animals = animals;
        this.includes = includes;
        this.comments = comments;
        this.mainImageIndex = mainImageIndex;
        this.area = area;
        this.price = price;
        // this.enteryDate = enteryDate;
        // this.releaseDate = releaseDate;
        // this.agreement = agreement;
        // this.agreementEndDate = agreementEndDate;
        this.images = images;
        this.currentTenantId = currentTenantId;
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

