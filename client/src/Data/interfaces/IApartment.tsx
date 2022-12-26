import { ReactNode } from "react";
import { Address } from "../builders/Apartment";
import { ITenant } from "./ITenant";

interface PrivatePoviderProps {
  children: JSX.Element | ReactNode;
}

interface IApartment {
  id?: number;
  name: string;
  city: string;
  neighborhood: string;
  street: string;
  number: number;
  floor: number;
  apartmentNumber: number;
  address?: Address;
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
  currentTenantId: string;
  managerId?: string;
}

interface IContext {
  apartment: IApartment;
  tenant: ITenant;
  activeStep: number;
  // steps: {
  //   apartment: boolean;
  //   tenant: boolean;
  //   files: boolean;
  // };
}

interface IApartmentCardButton {
  className: string;
  text: string;
  to: string;
  icon: JSX.Element;
}

export type { IApartment, IContext, PrivatePoviderProps, IApartmentCardButton };
