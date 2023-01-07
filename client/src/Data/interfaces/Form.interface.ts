interface IApartmentCreateForm {
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
}

interface IApartmentServerCreateRequest extends IApartmentCreateForm {
    mainImageIndex: number;
    currentTenantId: string;
    managerId: string;
}

interface ITenantCreateForm {
    id: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    anotherMobileNumber: string;
    email: string;
    age: number;
    gender: string;
    birthday: string;
    startDate: string;
    endDate: string;
}

interface IAttachFileForm {
    mainImageIndex: number;
    images: File[];
    agreement: File | null;
}

interface ISelectMenuItem {
    label: string;
    value: string | number;
}

interface IMenuTextItem {
    label: string;
    value: string;
}


export type { IApartmentCreateForm, IApartmentServerCreateRequest, ITenantCreateForm, IAttachFileForm, ISelectMenuItem, IMenuTextItem };
