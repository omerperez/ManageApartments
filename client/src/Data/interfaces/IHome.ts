import { IOwnerStatisticsData } from "./IApartment";

interface ITopDashboardCard {
    he_title: string;
    en_title: string;
    backgroundColor: string;
    icon: JSX.Element;
    objectKey: keyof IOwnerStatisticsData;
}


export type { ITopDashboardCard, };
