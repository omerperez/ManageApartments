import { FilePresent, HomeWork, Power, Shower } from "@mui/icons-material";
import CalculateIcon from "@mui/icons-material/Calculate";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";

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

const mainApartmentProperties = [
  {
    he_label: "כתובת",
    en_label: "Address",
    prop: "address",
    style: "color-green border-green nowrope",
    icon: <HolidayVillageIcon sx={{ color: "#2DD8B6", fontSize: 50 }} />,
  },
  {
    he_label: "שכר דירה",
    en_label: "Price",
    prop: "price",
    style: "color-red border-red",
    icon: <FilePresentIcon sx={{ color: "#FF5370", fontSize: 50 }} />,
  },
  {
    he_label: "תאריך כניסה",
    en_label: "Entery date",
    prop: "enteryDate",
    style: "color-yellow border-yellow",
    icon: <CalculateIcon sx={{ color: "#FFB64D", fontSize: 50 }} />,
  },
  {
    he_label: "תאריך סיום חוזה",
    en_label: "Date of release",
    prop: "releaseDate",
    style: "color-blue border-blue",
    icon: <CalculateIcon sx={{ color: "#4099FF", fontSize: 50 }} />,
  },
  {
    he_label: "שטח",
    en_label: "Area",
    prop: "area",
    style: "color-blue border-blue",
    icon: <CalculateIcon sx={{ color: "#4099FF", fontSize: 50 }} />,
  },
];

const detailsLabels = [
  {
    he_label: "שטח הדירה",
    en_label: "Apartment Area",
    value: "45 מ״ר",
  },
  {
    he_label: "חדרי שינה",
    en_label: "Bedrooms",
    value: "2",
  },
  {
    he_label: "שירותים",
    en_label: "Toilet",
    value: "1",
  },
  {
    he_label: "שכונה",
    en_label: "Neighborhood",
    value: "נווה עמל",
  },
  {
    he_label: "בעלי חיים",
    en_label: "Animals",
    value: "לא מתאים",
  },
  {
    he_label: "אינטרנט וכבלים",
    en_label: "Internet & Cables",
    value: "כלול",
  },
];

const apartmentMenuItems = [
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

export {
  apartmentMenuItems,
  detailsLabels,
  mainApartmentProperties,
  tenantDetails,
};
