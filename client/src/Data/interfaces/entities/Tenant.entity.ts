export interface Tenant {
    _id: string;
    id: string;
    apartment: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    anotherMobileNumber: string;
    email: string;
    gender: string;
    currentAgreement: string;
    agreement: string[];
    birthday: string;
    startDate: string;
    endDate: string;
    owner: string;
}