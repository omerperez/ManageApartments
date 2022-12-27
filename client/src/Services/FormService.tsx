import { IField } from "../Data/interfaces/Create";
import { ITenant } from "../Data/interfaces/ITenant";
import { IErrosListObject } from "../Data/interfaces/IValidation";

const getFormFieldError = (item: IField, errors: IErrosListObject) => {
  if (item.error) {
    return errors[item.key] === false ? item.error : "";
  }
  return "";
};

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
export { getFormFieldError, getTenantValue, getInputType, getSelectList };
