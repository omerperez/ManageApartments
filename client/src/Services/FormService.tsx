import { IFieldTypeDemo } from "../Data/interfaces/Create";
import { ITenant } from "../Data/interfaces/ITenant";
import { IErrosListObject } from "../Data/interfaces/IValidation";

const getFormFieldError = (item: IFieldTypeDemo, errors: IErrosListObject) => {
  if (item.error) {
    return errors[item.name] === false ? item.error : "";
  }
  return "";
};

const getTenantValue = (editTenant: ITenant | undefined, key: string) => {
  return editTenant ? `${editTenant[key as keyof ITenant]}` : "";
};

export { getFormFieldError, getTenantValue };
