import { IMenuSelectItem } from "../Components/Global/FormComponents/Select";
interface fieldType {
  he_label: string;
  en_label: string;
  name: string;
  gridSize: number;
  type: string;
}

const apartmentFormLabels: fieldType[] = [
  {
    he_label: "שם הדירה",
    en_label: "Apartment Name",
    name: "name",
    gridSize: 4,
    type: "text",
  },
  {
    he_label: "עיר",
    en_label: "City",
    name: "city",
    gridSize: 4,
    type: "autocomplete",
  },
  {
    he_label: "שכונה",
    en_label: "Neighborhood",
    name: "neighborhood",
    gridSize: 4,
    type: "text",
  },
  {
    he_label: "רחוב",
    en_label: "Street",
    name: "street",
    gridSize: 4,
    type: "autocomplete",
  },
  {
    he_label: "מספר בית",
    en_label: "House number",
    name: "number",
    gridSize: 2,
    type: "select",
  },
  {
    he_label: "קומה",
    en_label: "Floor",
    name: "floor",
    gridSize: 2,
    type: "select",
  },
  {
    he_label: "מספר דירה",
    en_label: "Number",
    name: "apartmentNumber",
    gridSize: 1.5,
    type: "select",
  },
  {
    he_label: "מיקוד",
    en_label: "Post Code",
    name: "postCode",
    gridSize: 2.5,
    type: "number",
  },
  {
    he_label: "מחיר (ש״ח)",
    en_label: "Price (ILS)",
    name: "price",
    gridSize: 2,
    type: "number",
  },
  {
    he_label: "שטח (מ״ר)",
    en_label: "Area (m)",
    name: "area",
    gridSize: 2,
    type: "number",
  },
  {
    he_label: "חדרי שינה",
    en_label: "Bedrooms",
    name: "bedrooms",
    gridSize: 2,
    type: "select",
  },
  {
    he_label: "חדרי שירותים",
    en_label: "Toilets",
    name: "toilet",
    gridSize: 2,
    type: "select",
  },

  {
    he_label: "חיות מחמד",
    en_label: "Animals",
    name: "animals",
    gridSize: 1.5,
    type: "select",
  },
  {
    he_label: "כלול במחיר",
    en_label: "Payments included",
    name: "includes",
    gridSize: 2.5,
    type: "select",
  }, {
    he_label: "הערות נוספות",
    en_label: "Another Comments",
    name: "comments",
    gridSize: 12,
    type: "text",
  },
];

const tenantsFormLabels: fieldType[] = [
  {
    he_label: "שם מלא",
    en_label: "Full Name",
    name: "fullName",
    gridSize: 3,
    type: "text",
  },
  {
    he_label: "נייד ראשי",
    en_label: "Main Mobile",
    name: "mobileNumber",
    gridSize: 3,
    type: "number",
  },
  {
    he_label: "נייד משני",
    en_label: "Another Mobile",
    name: "anotherMobileNumber",
    gridSize: 3,
    type: "number",
  },
  {
    he_label: "דוא״ל",
    en_label: "Email",
    name: "email",
    gridSize: 3,
    type: "email",
  },
  {
    he_label: "מין",
    en_label: "Gender",
    name: "gender",
    gridSize: 1.5,
    type: "select",
  },
  {
    he_label: "גיל",
    en_label: "Age",
    name: "age",
    gridSize: 1.5,
    type: "number",
  },
  {
    he_label: "תאריך כניסה לדירה",
    en_label: "Entry date",
    name: "startDate",
    gridSize: 3,
    type: "date",
  }, {
    he_label: "יום הולדת",
    en_label: "Birthday",
    name: "birthday",
    gridSize: 3,
    type: "date",
  },
  {
    he_label: "תאריך סיום חוזה",
    en_label: "End date",
    name: "endDate",
    gridSize: 3,
    type: "date",
  },
];

const citySelectOptions: IMenuSelectItem[] = [
  { label: "בחר עיר", value: "" },
  { label: "הרצליה", value: "הרצליה" },
  { label: "ראשון לציון", value: "ראשון לציון" },
  { label: "רעננה", value: "רעננה" },
  { label: "עפולה", value: "עפולה" },
  { label: "תל אביב", value: "תל אביב" },
  { label: "כפר סבא", value: "כפר סבא" },
];

const StepperStyle = {
  "& .muirtl-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root": {
    width: 40,
    height: 40,
    border: "solid 2px white",
    borderRadius: "50%",
    color: "#2a2561",
  },
  "& .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root": {
    width: 40,
    height: 40,
    border: "solid 2px white",
    borderRadius: "50%",
    color: "#2a2561",
  },
  "& .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active": {
    color: "#4099ff",
  },
  "& .muirtl-zpcwqm-MuiStepConnector-root": {
    padding: '0 5px',
  },
  "& .css-zpcwqm-MuiStepConnector-root": {
    padding: '0 5px',
  },
  "& .muirtl-1hv8oq8-MuiStepLabel-label": {
    fontSize: 16,
    letterSpacing: 0.5,
    color: "#2a2561",
    fontFamily: "Rubik",
    fontWeight: 700,
  },
  "& .css-1hv8oq8-MuiStepLabel-label": {
    fontSize: 16,
    letterSpacing: 0.5,
    color: "#2a2561",
    fontFamily: "Rubik",
    fontWeight: 700,
  },
  "& .muirtl-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed": {
    color: "#319e88",
  },
  "& .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed": {
    color: "#319e88",
  },
  "& .muirtl-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active": {
    color: "#4099ff",

  },
};

const StepsLabels = [
  {
    he_label: "הכנסת פרטי דירה",
    en_label: "Entering apartment details",
  },
  {
    he_label: "הכנסת פרטי דייר",
    en_label: "Entering tenant details",
  },
  {
    he_label: "הוספת תמונות וקבצים",
    en_label: "Adding images and files",
  },
];

export {
  citySelectOptions,
  tenantsFormLabels,
  apartmentFormLabels,
  StepperStyle,
  StepsLabels,
};
export type { fieldType };
