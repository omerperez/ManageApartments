import { Edit, RemoveRedEye, Delete } from "@mui/icons-material";

const CardActionsBtn = [
  {
    label: "view",
    he_title: "צפה בדירה",
    en_title: "Apartment Profile",
    icon: <RemoveRedEye className="view-btn" />,
  },
  {
    label: "edit",
    he_title: "עריכת דירה",
    en_title: "Edit Apartment",
    icon: <Edit className="edit-btn" />,
  },
  {
    label: "delete",
    he_title: "מחיקת דירה",
    en_title: "Delete Apartment",
    icon: <Delete className="delete-btn" />,
  },
];

const pageLabels = {
  en: {
    createBtn: "Create new apartment",
    viewMore: "View More",
    free: "Free",
    rent: "Rent",
  },
  he: {
    createBtn: "צור/י דירה חדשה",
    viewMore: "ראה/י עוד",
    free: "פנויה",
    rent: "מושכרת",
  },
};
export { CardActionsBtn, pageLabels };
