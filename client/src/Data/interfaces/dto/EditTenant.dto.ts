interface EditTenantDto {
    _id: string;
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
    owner: string;
    apartment: string;
}
export type { EditTenantDto };