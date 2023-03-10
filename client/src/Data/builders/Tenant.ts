import { convertDateFormatToString } from "../../Features/Format";
import { ITenant } from "../interfaces/ITenant";

class Tenant implements ITenant {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    mobileNumber: string;
    anotherMobileNumber: string;
    email: string;
    age: number;
    gender: string;
    currentAgreement: string;
    agreement: string[];
    birthday: string;
    startDate: string;
    endDate: string;

    constructor(id: string, firstName: string,
        lastName: string, mobileNumber: string, anotherMobileNumber: string,
        email: string,
        gender: string, agreement: string, birthday: Date,
        startDate: Date, endDate: Date) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = `${firstName} ${lastName}`;
        this.mobileNumber = mobileNumber;
        this.anotherMobileNumber = anotherMobileNumber;
        this.email = email;
        this.gender = gender;
        this.currentAgreement = agreement;
        this.agreement = [];
        this.age = this.clacAge(birthday);
        this.birthday = convertDateFormatToString(birthday);
        this.startDate = convertDateFormatToString(startDate);
        this.endDate = convertDateFormatToString(endDate);
    }


    clacAge(birthday: Date) {
        const today = new Date();
        const age = today.getFullYear() - birthday.getFullYear();
        const month = today.getMonth() - birthday.getMonth();
        if (month < 0 || month === 0 && today.getDate() < birthday.getDate()) {
            return age - 1;
        }
        return age;
    }

    getContentProperties() {
        return [
            {
                he_label: "גיל",
                en_label: "Age",
                value: this.age,
                gridSize: 3.5
            }, {
                he_label: "מין",
                en_label: "Gender",
                value: this.gender,
                gridSize: 3.5
            },
            {
                he_label: "נייד",
                en_label: "Mobile",
                value: this.mobileNumber,
                gridSize: 5
            }, {
                he_label: "דוא״ל",
                en_label: "Email",
                value: this.email,
                gridSize: 12
            }, {
                he_label: "תקופת אכלוס",
                en_label: "Occupancy Period",
                value: this.getOccupancyPeriod(),
                gridSize: 12
            },
        ];
    }
    getOccupancyPeriod() {
        return `${this.startDate} - ${this.endDate}`;
    }

}

export { Tenant };
