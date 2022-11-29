import { createContext, Dispatch, useReducer } from "react";
import { Address } from "../Data/builders/Apartment";
import { IContext, PrivatePoviderProps } from "../Data/interfaces/IApartment";
import { PrivateAction } from "../Data/types/Private";
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
    agreement: "",
    birthday: new Date(),
    startDate: new Date(),
    endDate: new Date(),
  },
};

const PrivateContext = createContext<{
  privateState: IContext;
  privateDispatch: Dispatch<PrivateAction>;
}>({ privateState: initialState, privateDispatch: () => null });

export default function PrivatePovider({ children }: PrivatePoviderProps) {
  const [privateState, privateDispatch] = useReducer(
    privateReducer,
    initialState,
  );

  const value = {
    privateState: privateState,
    privateDispatch: privateDispatch,
  };

  return (
    <PrivateContext.Provider value={value}>{children}</PrivateContext.Provider>
  );
}

export { PrivatePovider, PrivateContext };
