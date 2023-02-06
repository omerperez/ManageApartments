import { ReactNode } from "react";

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

interface IOwnerStatisticsData {
  availability: number;
  revenues: number;
  count: number;
  expiringContractscount: number;
}

interface IAppContext {
  ownerStatisticsData: IOwnerStatisticsData;
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
  IOwnerStatisticsData,
};
