interface ITopDashboardCard {
    he_title: string;
    en_title: string;
    backgroundColor: string;
    icon: JSX.Element;
}

interface ISideButton {
    icon: JSX.Element;
    to: string;
}

export type { ITopDashboardCard, ISideButton };
