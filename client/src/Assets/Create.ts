import { IFieldTypeDemo, ITranslateLabel } from "../Data/interfaces/Create";
import { IMenuTextItem } from "../Data/interfaces/IForm";
import ValidationService from "../Services/ValidationService";

const apartmentFormLabels: IFieldTypeDemo[] = [
  {
    he_label: "שם הדירה",
    en_label: "Apartment Name",
    type: "input",
    textType: "text",
    name: "name",
    gridSize: 4,
    validation: { type: "input", function: ValidationService.isNotEmpty },
    error: "שדה חובה"
  },
  {
    he_label: "עיר",
    en_label: "City",
    name: "city",
    gridSize: 4,
    type: "autocomplete",
    validation: { type: "select", function: ValidationService.isValueIncludes },
    error: "אנא בחר ערך מתוך הרשימה"
  },
  {
    he_label: "שכונה",
    en_label: "Neighborhood",
    name: "neighborhood",
    gridSize: 4,
    type: "input",
    textType: "text",
    validation: { type: "input", function: ValidationService.isNotEmpty },
    error: "שדה חובה"
  },
  {
    he_label: "רחוב",
    en_label: "Street",
    name: "street",
    gridSize: 4,
    type: "autocomplete",
    validation: { type: "select", function: ValidationService.isValueIncludes },
    error: "אנא בחר ערך מתוך הרשימה"
  },
  {
    he_label: "מספר בית",
    en_label: "House number",
    name: "number",
    gridSize: 2,
    type: "input",
    textType: "number",
    validation: { type: "select", function: ValidationService.isValueIncludes },
    error: "אנא אזן ערך חוקי"
  },
  {
    he_label: "קומה",
    en_label: "Floor",
    name: "floor",
    gridSize: 2,
    type: "input",
    textType: "number",
    validation: { type: "select", function: ValidationService.isValueIncludes },
    error: "אנא אזן ערך חוקי"
  },
  {
    he_label: "מספר דירה",
    en_label: "Number",
    name: "apartmentNumber",
    gridSize: 2,
    type: "input",
    textType: "number",
    validation: { type: "select", function: ValidationService.isValueIncludes },
    error: "אנא אזן ערך חוקי"
  },
  {
    he_label: "מיקוד",
    en_label: "Post Code",
    name: "postCode",
    gridSize: 2,
    type: "input",
    textType: "number",
    validation: { type: "input", function: ValidationService.isPositiveNumber },
    error: "אנא אזן ערך חוקי"
  },
  {
    he_label: "מחיר (ש״ח)",
    en_label: "Price (ILS)",
    name: "price",
    gridSize: 2,
    type: "input",
    textType: "number",
    validation: { type: "input", function: ValidationService.isPositiveNumber },
    error: "אנא אזן ערך חוקי"
  },
  {
    he_label: "שטח (מ״ר)",
    en_label: "Area (m)",
    name: "area",
    gridSize: 2,
    type: "input",
    textType: "number",
    validation: { type: "input", function: ValidationService.isPositiveNumber },
    error: "אנא אזן ערך חוקי"
  },
  {
    he_label: "חדרי שינה",
    en_label: "Bedrooms",
    name: "bedrooms",
    gridSize: 2,
    type: "input",
    textType: "number",
    validation: { type: "select", function: ValidationService.isValueIncludes },
    error: "אנא אזן ערך חוקי"
  },
  {
    he_label: "חדרי שירותים",
    en_label: "Toilets",
    name: "toilet",
    gridSize: 2,
    type: "input",
    textType: "number",
    validation: { type: "select", function: ValidationService.isValueIncludes },
    error: "אנא אזן ערך חוקי"
  },
  {
    he_label: "חיות מחמד",
    en_label: "Animals",
    name: "animals",
    gridSize: 2,
    type: "select",
    list: [{
      label: "ניתן להכניס",
      value: "yes"
    }, {
      label: "ניתן להכניס",
      value: "yes"
    }],
    validation: { type: "select", function: ValidationService.isValueIncludes },
    error: "אנא אזן ערך חוקי"
  },
  {
    he_label: "תוספות",
    en_label: "Payments included",
    name: "includes",
    gridSize: 2,
    type: "select",
    list: [{
      label: "ניתן להכניס",
      value: "yes"
    }, {
      label: "לא ניתן להכניס",
      value: "no"
    }],
    validation: { type: "select", function: ValidationService.isValueIncludes },
    error: "אנא אזן ערך חוקי"
  }, {
    he_label: "הערות נוספות",
    en_label: "Another Comments",
    name: "comments",
    gridSize: 12,
    type: "input",
    textType: "text",
    validation: { type: "input", function: ValidationService.isNotEmpty },
    error: "אנא בחר ערך מתוך הרשימה"
  },
];

const tenantsFormLabels: IFieldTypeDemo[] = [
  {
    he_label: "שם מלא",
    en_label: "Full Name",
    name: "fullName",
    gridSize: 3,
    type: "input",
    textType: "text",
    validation: { type: "input", function: ValidationService.isNotEmpty },
    error: "שדה חובה"
  },
  {
    he_label: "נייד ראשי",
    en_label: "Main Mobile",
    name: "mobileNumber",
    gridSize: 3,
    type: "input",
    textType: "number",
    validation: { type: "input", function: ValidationService.isMobilePropper },
    error: "מספר נייד אינו תקין"
  },
  {
    he_label: "נייד משני",
    en_label: "Another Mobile",
    name: "anotherMobileNumber",
    gridSize: 3,
    type: "input",
    textType: "number",
    validation: { type: "input", function: ValidationService.isMobilePropper },
    error: "מספר נייד אינו תקין"
  },
  {
    he_label: "דוא״ל",
    en_label: "Email",
    name: "email",
    gridSize: 3,
    type: "input",
    textType: "email",
    validation: { type: "input", function: ValidationService.isNotEmpty },
    error: "שדה חובה"
  },
  {
    he_label: "מין",
    en_label: "Gender",
    name: "gender",
    gridSize: 1.5,
    type: "input",
    textType: "select",
    validation: { type: "input", function: ValidationService.isNotEmpty },
    error: "שדה חובה"
  },
  {
    he_label: "יום הולדת",
    en_label: "Birthday",
    name: "birthday",
    gridSize: 3,
    type: "date",
    validation: { type: "input", function: ValidationService.isNotEmpty },
    error: "שדה חובה"
  },
  {
    he_label: "תאריך כניסה לדירה",
    en_label: "Entry date",
    name: "startDate",
    gridSize: 3,
    type: "date",
    validation: { type: "input", function: ValidationService.isNotEmpty },
    error: "שדה חובה"
  },
  {
    he_label: "תאריך סיום חוזה",
    en_label: "End date",
    name: "endDate",
    gridSize: 3,
    type: "date",
    validation: { type: "input", function: ValidationService.isNotEmpty },
    error: "שדה חובה"
  },
];

const citySelectOptions: IMenuTextItem[] = [
  { label: "בחר עיר", value: "" },
  { label: "הרצליה", value: "הרצליה" },
  { label: "ראשון לציון", value: "ראשון לציון" },
  { label: "רעננה", value: "רעננה" },
  { label: "עפולה", value: "עפולה" },
  { label: "תל אביב", value: "תל אביב" },
  { label: "כפר סבא", value: "כפר סבא" },
];

const StepsLabels: ITranslateLabel[] = [
  {
    he_label: "פרטי הדירה",
    en_label: "Entering apartment details",
  },
  {
    he_label: "פרטי הדייר",
    en_label: "Entering tenant details",
  },
  {
    he_label: "תמונות וקבצים",
    en_label: "Adding images and files",
  },
];

export {
  citySelectOptions,
  tenantsFormLabels,
  apartmentFormLabels,
  StepsLabels,
};

