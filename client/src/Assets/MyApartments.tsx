import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { IApartmentCardButton } from "../Data/interfaces/IApartment";

const ApartmentCardButtons: IApartmentCardButton[] = [
  {
    className: "button-bg-view apartment-card-btn",
    text: "צפייה",
    to: "apartment",
    icon: <RemoveRedEye className="apartment-card-icon" />,
  },
  {
    className: "button-bg-edit apartment-card-btn",
    text: "עריכה",
    to: "edit-apartment",
    icon: <Edit className="apartment-card-icon" />,
  },
  {
    className: "button-bg-delete apartment-card-btn",
    text: "מחיקה",
    to: "delete",
    icon: <Delete className="apartment-card-icon" />,
  },
];

export { ApartmentCardButtons };
