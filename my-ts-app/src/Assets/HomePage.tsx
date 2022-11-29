import {
  AttachMoney,
  HolidayVillage,
  ReplyAll,
  RequestPage,
  Calculate,
  InsertDriveFile,
  Apartment,
} from "@mui/icons-material";
const cardIconsStyle = {
  fontSize: 40,
  background: "white",
  borderRadius: "50%",
  padding: 1,
};

interface dashboardTitle {
  he_title: string;
  en_title: string;
  backgroundColor: string;
  icon: JSX.Element;
}

const topDashboardTitles: dashboardTitle[] = [
  {
    he_title: "דירות זמינות",
    en_title: "Available Apartments",
    backgroundColor: "bg-yellow",
    icon: <ReplyAll sx={{ ...{ color: "#FFB64D" }, ...cardIconsStyle }} />,
  },
  {
    he_title: "הכנסות",
    en_title: "Revenues",
    backgroundColor: "bg-blue",
    icon: <AttachMoney sx={{ ...{ color: "#4099FF" }, ...cardIconsStyle }} />,
  },
  {
    he_title: "כמות דירות",
    en_title: "Total Apartments",
    backgroundColor: "bg-green",
    icon: (
      <HolidayVillage sx={{ ...{ color: "#2DD8B6" }, ...cardIconsStyle }} />
    ),
  },
  {
    he_title: "חוזים שמסתיים בקרוב",
    en_title: "Contracts ending soon",
    backgroundColor: "bg-red",
    icon: <RequestPage sx={{ ...{ color: "#FF5370" }, ...cardIconsStyle }} />,
  },
];

interface bodyCard {
  he_label: string;
  en_label: string;
  style: string;
  icon: JSX.Element;
  to: string;
}

const iconStyle = { color: "#2A2561", fontSize: 42 };
// color: "white",
const bodyCards: bodyCard[] = [
  {
    he_label: "הדירות שלי",
    en_label: "My Apartments",
    style: "green green nowrope",
    icon: <Apartment sx={iconStyle} />,
    to: "/apartments",
  },
  {
    he_label: "המסמכים שלי",
    en_label: "My Documents",
    style: "red red",
    icon: <InsertDriveFile sx={iconStyle} />,
    to: "/files",
  },
  {
    he_label: "מחשבון חשמל",
    en_label: "Electirc Calculature",
    style: "yellow yellow",
    icon: <Calculate sx={iconStyle} />,
    to: "/electric-calc",
  },
  // {
  //   he_label: "חשבון מים",
  //   en_label: "Water Calculature",
  //   style: "blue blue",
  //   icon: <Calculate sx={iconStyle} />,
  //   to: "/water-calc",
  // },
];

const tenantsCardProperties = {
  en: {
    mainTitle: "Active Tenants",
    finishContact: "Date of finish agreement:",
  },
  he: {
    mainTitle: "דיירים פעילים",
    finishContact: "תאריך סיום חוזה:",
  },
};

export { topDashboardTitles, bodyCards, tenantsCardProperties };
export type { dashboardTitle };
