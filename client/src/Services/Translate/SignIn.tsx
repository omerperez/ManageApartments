import { IField } from "../../Data/interfaces/Create";
import ValidationService from "../../Services/ValidationService";

const SignInLabelsForm: IField[] = [
  {
    he_label: "מספר פלאפון",
    en_label: "Mobile",
    key: "mobile",
    type: { fieldType: "input", inputType: "phone" },
    gridSize: 12,
  },
  {
    he_label: "סיסמא",
    en_label: "Password",
    key: "password",
    type: { fieldType: "input", inputType: "password" },
    gridSize: 12,
  },
];

const SignUpLabelsForm: IField[] = [
  {
    he_label: "שם פרטי",
    en_label: "First Name",
    key: "firstName",
    gridSize: 6,
    type: { fieldType: "input", inputType: "text" },
    validationFunction: ValidationService.isNotEmpty,
    error: "שדה חובה",
  },
  {
    he_label: "שם משפחה",
    en_label: "Last Name",
    key: "lastName",
    type: { fieldType: "input", inputType: "text" },
    gridSize: 6,
    validationFunction: ValidationService.isNotEmpty,
    error: "שדה חובה",
  },
  {
    he_label: "מייל",
    en_label: "Email",
    key: "email",
    type: { fieldType: "input", inputType: "email" },
    gridSize: 12,
    validationFunction: ValidationService.isNotEmpty,
    error: "שדה חובה",
  },
  {
    he_label: "מספר פלאפון",
    en_label: "Mobile",
    key: "mobile",
    type: { fieldType: "input", inputType: "phone" },
    gridSize: 12,
    validationFunction: ValidationService.isNotEmpty,
    error: "שדה חובה",
  },
  {
    he_label: "סיסמא",
    en_label: "Password",
    key: "password",
    type: { fieldType: "input", inputType: "password" },
    gridSize: 12,
    validationFunction: ValidationService.isNotEmpty,
    error: "שדה חובה",
  },
];

export { SignInLabelsForm, SignUpLabelsForm };
