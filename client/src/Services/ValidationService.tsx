import { ISelectMenuItem } from "../Data/interfaces/IForm";

const isNotEmpty = (value: string) => {
  return value ? true : false;
};

const isValueIncludes = (value: string, list: ISelectMenuItem[]) => {
  const isExist = list.find(
    (item) => item.label === value || item.value === value,
  );
  return isExist ? true : false;
};

const isPositiveNumber = (value: string) => {
  var numberType: number = +value;
  return numberType > 0;
};

const isMobilePropper = (mobile: string) => {
  return mobile.length === 10 && mobile.substring(0, 2) === "05";
};

export default {
  isNotEmpty,
  isValueIncludes,
  isPositiveNumber,
  isMobilePropper,
};
