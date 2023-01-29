import { ReactNode } from "react";
import { ITenant } from "./ITenant";

interface PrivatePoviderProps {
  children: JSX.Element | ReactNode;
}

interface IApartment {
  _id?: string;
  id?: string;
  name: string;
  city: string;
  neighborhood: string;
  street: string;
  number: number;
  floor: number;
  apartmentNumber: number;
  postCode: number;
  price: number;
  area: number;
  bedrooms: number;
  toilet: number;
  animals: string;
  includes: string;
  comments: string;
  mainImageIndex: number;
  images: string[];
  currentTenantId?: string;
  owner: string;
}

interface IAppContext {
  // apartment: IApartment;
  // tenant: ITenant;
  // activeStep: number;
  isOpenDashboardMobile: boolean;
}

interface IApartmentCardButton {
  className: string;
  text: string;
  to: string;
  icon: JSX.Element;
}

export type {
  IApartment,
  IAppContext,
  PrivatePoviderProps,
  IApartmentCardButton,
};
