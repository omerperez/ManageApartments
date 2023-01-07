import { IField, ITranslateLabel } from "../Data/interfaces/Create";
import { ISelectMenuItem } from "../Data/interfaces/Form.interface";
import ValidationService from "../Services/ValidationService";

const genderList: ISelectMenuItem[] = [
  {
    label: 'זכר',
    value: 1
  }, {
    label: 'נקבה',
    value: 2
  }
];

const isFitForAnimalsList: ISelectMenuItem[] = [
  {
    label: "ניתן להכניס",
    value: 1
  }, {
    label: "ניתן להכניס",
    value: 2
  }
];

const apartmentFormLabels: IField[] = [
  {
    he_label: "שם הדירה",
    en_label: "Apartment Name",
    key: "name",
    gridSize: 4,
    type: { fieldType: 'input', inputType: 'text' },
    validationFunction: ValidationService.isNotEmpty,
    error: "שדה חובה"
  },
  {
    he_label: "עיר",
    en_label: "City",
    key: "city",
    gridSize: 4,
    type: { fieldType: 'autocomplete', apiListKey: 'city' },
    error: "אנא בחר ערך מתוך הרשימה"
  },
  {
    he_label: "שכונה",
    en_label: "Neighborhood",
    key: "neighborhood",
    gridSize: 4,
    type: { fieldType: 'input', inputType: 'text' },
    validationFunction: ValidationService.isNotEmpty,
    error: "שדה חובה"
  },
  {
    he_label: "רחוב",
    en_label: "Street",
    key: "street",
    gridSize: 4,
    type: { fieldType: 'autocomplete', apiListKey: 'street' },
    error: "אנא בחר ערך מתוך הרשימה"
  },
  {
    he_label: "מספר בית",
    en_label: "House number",
    key: "number",
    gridSize: 2,
    type: { fieldType: 'input', inputType: 'number' },
    validationFunction: ValidationService.isNotEmpty,
    error: "אנא אזן ערך חוקי"
  },
  {
    he_label: "קומה",
    en_label: "Floor",
    key: "floor",
    gridSize: 2,
    type: { fieldType: 'input', inputType: 'number' },
    validationFunction: ValidationService.isNotEmpty,
    error: "אנא אזן ערך חוקי"
  },
  {
    he_label: "מספר דירה",
    en_label: "Number",
    key: "apartmentNumber",
    gridSize: 2,
    type: { fieldType: 'input', inputType: 'number' },
    validationFunction: ValidationService.isNotEmpty,
    error: "אנא אזן ערך חוקי"
  },
  {
    he_label: "מיקוד",
    en_label: "Post Code",
    key: "postCode",
    gridSize: 2,
    type: { fieldType: 'input', inputType: 'number' },
    validationFunction: ValidationService.isNotEmpty,
    error: "אנא אזן ערך חוקי"
  },
  {
    he_label: "מחיר (ש״ח)",
    en_label: "Price (ILS)",
    key: "price",
    gridSize: 2,
    type: { fieldType: 'input', inputType: 'number' },
    validationFunction: ValidationService.isNotEmpty,
    error: "אנא אזן ערך חוקי"
  },
  {
    he_label: "שטח (מ״ר)",
    en_label: "Area (m)",
    key: "area",
    gridSize: 2,
    type: { fieldType: 'input', inputType: 'number' },
    validationFunction: ValidationService.isNotEmpty,
    error: "אנא אזן ערך חוקי"
  },
  {
    he_label: "חדרי שינה",
    en_label: "Bedrooms",
    key: "bedrooms",
    gridSize: 2,
    type: { fieldType: 'input', inputType: 'number' },
    validationFunction: ValidationService.isNotEmpty,
    error: "אנא אזן ערך חוקי"
  },
  {
    he_label: "חדרי שירותים",
    en_label: "Toilets",
    key: "toilet",
    gridSize: 2,
    type: { fieldType: 'input', inputType: 'number' },
    validationFunction: ValidationService.isNotEmpty,
    error: "אנא אזן ערך חוקי"
  },
  {
    he_label: "חיות מחמד",
    en_label: "Animals",
    key: "animals",
    gridSize: 2,
    type: { fieldType: 'select', list: isFitForAnimalsList },
    error: "אנא אזן ערך חוקי"
  },
  {
    he_label: "תוספות",
    en_label: "Payments included",
    key: "includes",
    gridSize: 2,
    type: { fieldType: 'select', list: isFitForAnimalsList },
    error: "אנא אזן ערך חוקי"
  }, {
    he_label: "הערות נוספות",
    en_label: "Another Comments",
    key: "comments",
    gridSize: 12,
    type: { fieldType: "input", inputType: 'text' },
    validationFunction: ValidationService.isNotEmpty,
    error: "אנא בחר ערך מתוך הרשימה"
  },
];

const tenantsFormLabels: IField[] = [
  {
    he_label: "שם פרטי",
    en_label: "First Name",
    key: "firstName",
    gridSize: 4,
    type: { fieldType: 'input', inputType: 'text' },
    validationFunction: ValidationService.isNotEmpty,
    error: "שדה חובה"
  },
  {
    he_label: "שם משפחה",
    en_label: "Last Name",
    key: "lastName",
    gridSize: 4,
    type: { fieldType: 'input', inputType: 'text' },
    validationFunction: ValidationService.isNotEmpty,
    error: "שדה חובה"
  },
  {
    he_label: "תעודת זיהוי",
    en_label: "ID",
    key: "id",
    gridSize: 4,
    type: { fieldType: 'input', inputType: 'text' },
    validationFunction: ValidationService.isNotEmpty,
    error: "שדה חובה"
  },
  {
    he_label: "נייד ראשי",
    en_label: "Main Mobile",
    key: "mobileNumber",
    gridSize: 4,
    type: { fieldType: 'input', inputType: 'number' },
    validationFunction: ValidationService.isMobilePropper,
    error: "מספר נייד אינו תקין"
  },
  {
    he_label: "נייד משני",
    en_label: "Another Mobile",
    key: "anotherMobileNumber",
    gridSize: 4,
    type: { fieldType: 'input', inputType: 'number' },
    validationFunction: ValidationService.isMobilePropper,
    error: "מספר נייד אינו תקין"
  },
  {
    he_label: "דוא״ל",
    en_label: "Email",
    key: "email",
    gridSize: 4,
    type: { fieldType: 'input', inputType: 'email' },
    validationFunction: ValidationService.isNotEmpty,
    error: "שדה חובה"
  },
  {
    he_label: "מגדר",
    en_label: "Gender",
    key: "gender",
    gridSize: 2.25,
    type: { fieldType: 'select', list: genderList },
  },
  {
    he_label: "תאריך לידה",
    en_label: "Birthday",
    key: "birthday",
    gridSize: 3.25,
    type: { fieldType: "date", isPastDate: true },
    validationFunction: ValidationService.isNotEmpty,
    error: "שדה חובה"
  },
  {
    he_label: "תאריך כניסה לדירה",
    en_label: "Entry date",
    key: "startDate",
    gridSize: 3.25,
    type: { fieldType: "date", isPastDate: "both" },
    validationFunction: ValidationService.isNotEmpty,
    error: "שדה חובה"
  },
  {
    he_label: "תאריך סיום חוזה",
    en_label: "End date",
    key: "endDate",
    gridSize: 3.25,
    type: { fieldType: "date", isPastDate: false },
    validationFunction: ValidationService.isNotEmpty,
    error: "שדה חובה"
  },
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
  tenantsFormLabels,
  apartmentFormLabels,
  StepsLabels,
};

