import { FilePresent, HomeWork, Power, Shower } from "@mui/icons-material";
import { IDetails } from "../Data/interfaces/Create";

const tenantDetails = [
  {
    label: "נייד",
    prop: "mobileNumber",
    icon: "",
  },
  {
    label: "דוא״ל",
    prop: "email",
    icon: "",
  },
  {
    label: "גיל",
    prop: "age",
    icon: "",
  },
  {
    label: "מין",
    prop: "age",
    icon: "",
  },
  {
    label: "תקופת אכלוס",
    prop: "date",
    icon: "",
  },
];

const othersDetailsFields: IDetails[] = [
  {
    he_label: "שטח הדירה",
    en_label: "Apartment Area",
    key: "area",
    gridSize: 4,
  },
  {
    he_label: "חדרי שינה",
    en_label: "Bedrooms",
    key: "bedrooms",
    gridSize: 4,
  },
  {
    he_label: "שירותים",
    en_label: "Toilet",
    key: "toilet",
    gridSize: 4,
  },
  {
    he_label: "שכונה",
    en_label: "Neighborhood",
    key: "neighborhood",
    gridSize: 4,
  },
  {
    he_label: "בעלי חיים",
    en_label: "Animals",
    key: "animals",
    gridSize: 4,
  },
  {
    he_label: "אינטרנט וכבלים",
    en_label: "Internet & Cables",
    key: "includes",
    gridSize: 4,
  },
];

const sideDetialsMenuItems = [
  {
    label: "פרטי דירה",
    icon: <HomeWork />,
  },
  {
    label: "חוזה נוכחי",
    icon: <FilePresent />,
  },
  {
    label: "חשבונות חשמל",
    icon: <Power />,
  },
  {
    label: "חשבונות מים",
    icon: <Shower />,
  },
];

const tenantContentCardProperties: IDetails[] = [
  {
    he_label: "גיל",
    en_label: "Age",
    key: "age",
    gridSize: 3.5,
  },
  {
    he_label: "מין",
    en_label: "Gender",
    key: "gender",
    gridSize: 3.5,
  },
  {
    he_label: "נייד",
    en_label: "Mobile",
    key: "mobileNumber",
    gridSize: 5,
  },
  {
    he_label: "דוא״ל",
    en_label: "Email",
    key: "email",
    gridSize: 12,
  },
  {
    he_label: "תקופת אכלוס",
    en_label: "Occupancy Period",
    key: "Occupancy Period",
    gridSize: 12,
  },
];

export {
  sideDetialsMenuItems,
  othersDetailsFields,
  tenantDetails,
  tenantContentCardProperties,
};
