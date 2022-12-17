interface IDashboardTitle {
    he_title: string;
    en_title: string;
    backgroundColor: string;
    icon: JSX.Element;
}

interface ICardBody {
    he_label: string;
    en_label: string;
    style: string;
    icon: JSX.Element;
    to: string;
}

export type { IDashboardTitle, ICardBody };