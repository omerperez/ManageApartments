import { IFieldTypeDemo } from "../../Data/interfaces/Create";
import ValidationService from "../../Services/ValidationService";

const SignInLabelsForm = [
  {
    he_label: "מספר פלאפון",
    en_label: "Mobile",
    name: "mobile",
    type: "input",
    textType: "phone",
  },
  {
    he_label: "סיסמא",
    en_label: "Password",
    name: "password",
    type: "input",
    textType: "password",
  },
];

const SignUpLabelsForm: IFieldTypeDemo[] = [
  {
    he_label: "שם פרטי",
    en_label: "First Name",
    name: "firstName",
    type: "input",
    textType: "text",
    gridSize: 6,
    validation: { type: "input", function: ValidationService.isNotEmpty },
    error: "שדה חובה",
  },
  {
    he_label: "שם משפחה",
    en_label: "Last Name",
    name: "lastName",
    type: "input",
    textType: "text",
    gridSize: 6,
    validation: { type: "input", function: ValidationService.isNotEmpty },
    error: "שדה חובה",
  },
  {
    he_label: "מייל",
    en_label: "Email",
    name: "email",
    type: "input",
    textType: "email",
    gridSize: 12,
    validation: { type: "input", function: ValidationService.isNotEmpty },
    error: "שדה חובה",
  },
  {
    he_label: "מספר פלאפון",
    en_label: "Mobile",
    name: "mobile",
    type: "input",
    textType: "phone",
    gridSize: 12,
    validation: { type: "input", function: ValidationService.isNotEmpty },
    error: "שדה חובה",
  },
  {
    he_label: "סיסמא",
    en_label: "Password",
    name: "password",
    type: "input",
    textType: "password",
    gridSize: 12,
    validation: { type: "input", function: ValidationService.isNotEmpty },
    error: "שדה חובה",
  },
];

export { SignInLabelsForm, SignUpLabelsForm };
