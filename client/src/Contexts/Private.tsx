import { createContext, useReducer } from "react";
import { Address } from "../Data/builders/Apartment";
import {
  IApartment,
  IContext,
  PrivatePoviderProps,
} from "../Data/interfaces/IApartment";
import { ITenant } from "../Data/interfaces/ITenant";
import { PrivateContextType } from "../Data/types/Private";
import privateReducer from "../Reducers/Private";

const initialState: IContext = {
  apartment: {
    name: "",
    city: "",
    neighborhood: "",
    street: "",
    number: 0,
    floor: 0,
    apartmentNumber: 0,
    postCode: 0,
    price: 0,
    area: 0,
    bedrooms: 0,
    toilet: 0,
    animals: "",
    includes: "",
    comments: "",
    mainImageIndex: -1,
    images: [],
    address: new Address("", "", -1, -1),
    currentTenantId: "-1",
  },
  tenant: {
    id: "",
    firstName: "",
    lastName: "",
    fullName: "",
    mobileNumber: "",
    anotherMobileNumber: "",
    email: "",
    age: 0,
    gender: "",
    currentAgreement: "",
    agreement: [""],
    birthday: "",
    startDate: "",
    endDate: "",
  },
  activeStep: 0,
  // steps: {
  //   apartment: false,
  //   tenant: false,
  //   files: false,
  // },
};

const PrivateContext = createContext<PrivateContextType | null>(null);

export default function PrivatePovider({ children }: PrivatePoviderProps) {
  const [privateState, privateDispatch] = useReducer(
    privateReducer,
    initialState,
  );

  function setApartment(apartment: IApartment) {
    privateDispatch({ type: "setApartment", apartment: apartment });
  }

  function setTenant(tenant: ITenant) {
    privateDispatch({ type: "setTenant", tenant: tenant });
  }

  function setStep(index: number) {
    privateDispatch({ type: "setStep", index: index });
  }
  // function changeStepStatus(
  //   stepKey: "apartment" | "tenant" | "files",
  //   status: boolean,
  // ) {
  //   privateDispatch({
  //     type: "changeStepStatus",
  //     key: stepKey,
  //     status: status,
  //   });
  // }

  const value = {
    privateState: privateState,
    setApartment: setApartment,
    setTenant: setTenant,
    setStep: setStep,
  };

  return (
    <PrivateContext.Provider value={value}>{children}</PrivateContext.Provider>
  );
}

export { PrivatePovider, PrivateContext };
