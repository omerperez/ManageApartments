const countOfFieldInApartmentDetails: number = 15;
const isApartmentDetailsPropper = (formsValue: any) => {
  if (Object.keys(formsValue).length !== countOfFieldInApartmentDetails) {
    return false;
  }
  return true;
};

export { isApartmentDetailsPropper };
