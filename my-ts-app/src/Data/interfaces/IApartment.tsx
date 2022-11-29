import { ReactNode } from "react";
import { Address } from "../builders/Apartment";
import { ITenant } from "./ITenant";

interface PrivatePoviderProps {
  children: JSX.Element | ReactNode;
}

interface IApartment {
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
}

interface IContext {
  apartment: IApartment;
  tenant: ITenant;
}

export type { IApartment, IContext, PrivatePoviderProps };
