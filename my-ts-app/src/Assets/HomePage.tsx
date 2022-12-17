import {
  AttachMoney,
  HolidayVillage,
  ReplyAll,
  RequestPage,
  Calculate,
  InsertDriveFile,
  Apartment,
} from "@mui/icons-material";
import { IDashboardTitle, ICardBody } from "../Data/interfaces/IHome";
import { MuiCardIcon, MuiIcon } from "../Layout/Mui/Home";

const topDashboardTitles: IDashboardTitle[] = [
  {
    he_title: "דירות זמינות",
    en_title: "Available Apartments",
    backgroundColor: "bg-yellow",
    icon: <ReplyAll sx={{ ...{ color: "#FFB64D" }, ...MuiCardIcon }} />,
  },
  {
    he_title: "הכנסות",
    en_title: "Revenues",
    backgroundColor: "bg-blue",
    icon: <AttachMoney sx={{ ...{ color: "#4099FF" }, ...MuiCardIcon }} />,
  },
  {
    he_title: "כמות דירות",
    en_title: "Total Apartments",
    backgroundColor: "bg-green",
    icon: <HolidayVillage sx={{ ...{ color: "#2DD8B6" }, ...MuiCardIcon }} />,
  },
  {
    he_title: "חוזים שמסתיים בקרוב",
    en_title: "Contracts ending soon",
    backgroundColor: "bg-red",
    icon: <RequestPage sx={{ ...{ color: "#FF5370" }, ...MuiCardIcon }} />,
  },
];

const bodyCards: ICardBody[] = [
  {
    he_label: "הדירות שלי",
    en_label: "My Apartments",
    style: "green green nowrope",
    icon: <Apartment sx={MuiIcon} />,
    to: "/apartments",
  },
  {
    he_label: "המסמכים שלי",
    en_label: "My Documents",
    style: "red red",
    icon: <InsertDriveFile sx={MuiIcon} />,
    to: "/files",
  },
  {
    he_label: "מחשבון חשמל",
    en_label: "Electirc Calculature",
    style: "yellow yellow",
    icon: <Calculate sx={MuiIcon} />,
    to: "/electric-calc",
  },
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
