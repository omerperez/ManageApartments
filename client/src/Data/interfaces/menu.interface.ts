interface ISideMenuButton {
    icon: JSX.Element;
    to: string;
    text: string;
}

interface IMobileMenuButton {
    label: string;
    icon: JSX.Element;
    navigate: string;
}

export type { ISideMenuButton, IMobileMenuButton };