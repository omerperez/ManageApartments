import { RefObject } from "react";
import { IField } from "../Data/interfaces/Create";
import { ISelectMenuItem } from "../Data/interfaces/IForm";
import { IErrosListObject } from "../Data/interfaces/IValidation";
import { ValidationType } from "../Data/types/Validation";

const getRefValue = (refsList: RefObject<any>, index: number) => {
  if (refsList.current[index]?.current?.value) {
    return refsList.current[index].current.value;
  }
  return null;
};

const getFieldsErrorStatus = (
  fieldsList: IField[],
  refsList: RefObject<any>,
  lists?: { name: string; list: ISelectMenuItem[] }[],
) => {
  let errorsList = {};
  fieldsList.forEach((field, index) => {
    const value = getRefValue(refsList, index);
    const status = getValidationValue(
      field?.validation,
      value as string,
      lists?.find((item) => item.name === field.key)?.list,
    );
    errorsList = {
      ...errorsList,
      [field.key]: status,
    };
  });
  return errorsList;
};

const getValidationValue = (
  validation?: ValidationType,
  value?: string,
  list?: ISelectMenuItem[],
) => {
  const currentValue = value ?? "";
  if (validation) {
    switch (validation.type) {
      case "input": {
        return validation.function(currentValue);
      }
      case "select": {
        if (list) {
          return validation.function(currentValue, list);
        }
        return true;
      }
      default:
        return true;
    }
  }
  return true;
};

const isFormFieldsErrors = (list: IErrosListObject) => {
  if (Object.keys(list).length === 0) return true;
  let status = false;
  Object.values(list).forEach((value) => {
    if (value === false) {
      status = true;
    }
  });
  return status;
};

export { getRefValue, getFieldsErrorStatus, isFormFieldsErrors };
