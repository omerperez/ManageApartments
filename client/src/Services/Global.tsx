import { RefObject } from "react";
import { IField } from "../Data/interfaces/Create";
import { IErrosListObject } from "../Data/interfaces/IValidation";

const getRefValue = (refsList: RefObject<any>, index: number) => {
  if (refsList.current[index]?.current?.value) {
    return refsList.current[index].current.value as string;
  }
  return undefined;
};

function getSubmitFormValues(fields: IField[], refsList: RefObject<any>) {
  let errorsList: IErrosListObject = {};
  let formValues: { [key: string]: string } = {};
  let isFormPropper: boolean = true;
  fields.forEach((field, index) => {
    const currentFieldValue = getRefValue(refsList, index);
    if (
      field.validationFunction &&
      !field.validationFunction(currentFieldValue) &&
      field.error
    ) {
      errorsList[field.key] = field.error;
      isFormPropper = false;
    } else {
      errorsList[field.key] = "";
    }
    formValues[field.key] = currentFieldValue ?? "";
  });
  return [formValues, errorsList, isFormPropper];
}

// const getFieldsErrorStatus = (
//   fieldsList: IField[],
//   refsList: RefObject<any>,
//   lists?: { name: string; list: ISelectMenuItem[] }[],
// ) => {
//   let errorsList = {};
//   fieldsList.forEach((field, index) => {
//     const value = getRefValue(refsList, index);
//     const status = getValidationValue(
//       field?.validation,
//       value as string,
//       lists?.find((item) => item.name === field.key)?.list,
//     );
//     errorsList = {
//       ...errorsList,
//       [field.key]: status,
//     };
//   });
//   return errorsList;
// };

// const getValidationValue = (
//   value: string,
//   validationFunction: (value: string) => void,
//   error: string,
// ) => {
//   switch (validation.type) {
//     case "input": {
//       return validation.function(value);
//     }
//     case "select": {
//       if (list) {
//         return validation.function(value, list);
//       }
//       return true;
//     }
//     default:
//       return true;
//   }
// };

// const isFormFieldsErrors = (list: IErrosListObject) => {
//   if (Object.keys(list).length === 0) return true;
//   let status = false;
//   Object.values(list).forEach((value) => {
//     if (value === false) {
//       status = true;
//     }
//   });
//   return status;
// };

export { getRefValue, getSubmitFormValues };
