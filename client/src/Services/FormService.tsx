import { IField } from "../Data/interfaces/Create";
import { ITenant } from "../Data/interfaces/ITenant";

const getTenantValue = (editTenant: ITenant | undefined, key: string) => {
  return editTenant ? `${editTenant[key as keyof ITenant]}` : "";
};

const getInputType = (field: IField) => {
  if (field.type.fieldType === "input") {
    return field.type.inputType ?? "text";
  }
  return "text";
};

const getSelectList = (field: IField) => {
  if (field.type.fieldType === "select") {
    return field.type.list ?? [];
  }
  return [];
};

function getFieldValue(
  key: string,
  currentObject: { [key: string]: any } | null,
) {
  if (currentObject) {
    return currentObject[key] as string;
  }
  return "";
}

function getApartmentFormObject(values: { [key: string]: string }) {
  return {
    name: values.name,
    city: values.city,
    neighborhood: values.neighborhood,
    street: values.street,
    number: +values.number,
    floor: +values.floor,
    apartmentNumber: +values.apartmentNumber,
    postCode: +values.postCode,
    price: +values.price,
    area: +values.area,
    bedrooms: +values.bedrooms,
    toilet: +values.toilet,
    animals: values.animals,
    includes: values.includes,
    comments: values.comments,
  };
}

function getTenantFormObject(values: { [key: string]: string }) {
  return {
    id: values.id,
    firstName: values.firstName,
    lastName: values.lastName,
    mobileNumber: values.mobileNumber,
    anotherMobileNumber: values.anotherMobileNumber,
    email: values.email,
    age: +values.age,
    gender: values.gender,
    birthday: values.birthday,
    startDate: values.startDate,
    endDate: values.endDate,
  };
}

export {
  getTenantValue,
  getInputType,
  getSelectList,
  getFieldValue,
  getApartmentFormObject,
  getTenantFormObject,
};
