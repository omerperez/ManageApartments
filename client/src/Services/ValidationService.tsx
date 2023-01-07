import { ISelectMenuItem } from "../Data/interfaces/Form.interface";

const isNotEmpty = (value?: string) => {
  return value ? true : false;
};

const isValueIncludes = (value: string, list: ISelectMenuItem[]) => {
  const isExist = list.find(
    (item) => item.label === value || item.value === value,
  );
  return isExist ? true : false;
};

const isPositiveNumber = (value?: string) => {
  if (value) {
    var numberType: number = +value;
    return numberType > 0;
  }
  return false;
};

const isMobilePropper = (mobile?: string) => {
  if (mobile) {
    return mobile.length === 10 && mobile.substring(0, 2) === "05";
  }
  return false;
};

export default {
  isNotEmpty,
  isValueIncludes,
  isPositiveNumber,
  isMobilePropper,
};
