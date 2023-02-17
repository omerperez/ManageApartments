import {
  AddCircleOutline,
  Apartment,
  Assessment,
  Bloodtype,
  ElectricalServices,
  Home,
  InsertDriveFile,
} from "@mui/icons-material";
import {
  IMobileMenuButton,
  ISideMenuButton,
} from "../Data/interfaces/menu.interface";
import { MuiSideMenuButtonIcon } from "../Layout/Mui/Menu";

// Constans
const HOME_PAGE = "בית";
const CREATE_APARTMENT = "יצירת דירה";
const MY_ASSETS = "הנכסים שלי";
const ELECTRIC_CALC = "חשמל";
const WATER_CALC = "מים";
const ASSESSMENT = "מדדים";

const mobileMenuButtons: IMobileMenuButton[] = [
  {
    label: HOME_PAGE,
    icon: <Home />,
    navigate: "/home",
  },
  {
    label: MY_ASSETS,
    icon: <Apartment />,
    navigate: "/my-apartment",
  },
  {
    label: ELECTRIC_CALC,
    icon: <ElectricalServices />,
    navigate: "/electric-calc",
  },
  {
    label: WATER_CALC,
    icon: <Bloodtype />,
    navigate: "/water-calc",
  },
  {
    label: ASSESSMENT,
    icon: <Assessment />,
    navigate: "",
  },
];

const sideMenuButtons: ISideMenuButton[] = [
  {
    icon: <Home sx={MuiSideMenuButtonIcon} />,
    to: "/",
    text: "בית",
  },
  {
    icon: <AddCircleOutline sx={MuiSideMenuButtonIcon} />,
    to: "/create-apartment",
    text: CREATE_APARTMENT,
  },
  {
    icon: <Apartment sx={MuiSideMenuButtonIcon} />,
    to: "/apartments",
    text: "הדירות שלי",
  },
  {
    icon: <InsertDriveFile sx={MuiSideMenuButtonIcon} />,
    to: "/files",
    text: "ניהול חוזים",
  },
  {
    icon: <ElectricalServices sx={MuiSideMenuButtonIcon} />,
    to: "/electric-calc",
    text: "מחשבון חשמל",
  },
  {
    icon: <Bloodtype sx={MuiSideMenuButtonIcon} />,
    to: "/water-calc",
    text: "מחשבון מים",
  },
];

export { mobileMenuButtons, sideMenuButtons };
