interface ITenant {
    id: string;
    firstName: string;
    lastName: string;
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
}
interface IEditTenant extends ITenant {
    tenantId: string;
}
interface ITenantId {
    id: string;
}
export { ITenant, IEditTenant, ITenantId };
