import { DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useContext } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthContext";
import { AuthContextType } from "../../../Data/types/Auth";
import GenericDialog from "../../Global/GenericDialog";

// Constans
const DELETE_APARTMENT_DIALOG_TEXT = "האם אתה בטוח שברצונך למחוק את הדירה?";
const EDIT_APARTMENT = "עריכת דירה";
const DELETE_APARTMENT = "מחיקת דירה";

type CardMenuActionsProps = {
  apartmentId: string;
};

export default function CardMenuActions({ apartmentId }: CardMenuActionsProps) {
  const navigate = useNavigate();
  const { authState, setLoading } = useContext(AuthContext) as AuthContextType;

  const handleClickMenuBtn = (to: string) => {
    if (to !== "delete") {
      return navigate({
        pathname: `/${to}`,
        search: createSearchParams({
          apartmentId: apartmentId,
        }).toString(),
      });
    }
    return;
  };

  const onDelete = () => {
    setLoading(true);
    import("../../../Services/Api/ApartmentApi").then((module) => {
      module.deleteApartment(apartmentId, authState.mobile);
    });
    return false;
  };

  return (
    <div className="d-flex">
      <GenericDialog
        onSubmit={onDelete}
        content={
          <div className="rtl">
            <h1>{DELETE_APARTMENT_DIALOG_TEXT}</h1>
          </div>
        }
      >
        <Tooltip title={DELETE_APARTMENT}>
          <IconButton className="card-action-btn-delete card-action-btn-space">
            <DeleteOutlineOutlined className="apartment-card-btn-icon" />
          </IconButton>
        </Tooltip>
      </GenericDialog>
      <Tooltip title={EDIT_APARTMENT}>
        <IconButton
          className="card-action-btn-edit"
          onClick={() => handleClickMenuBtn("edit-apartment")}
        >
          <EditOutlined className="apartment-card-btn-icon" />
        </IconButton>
      </Tooltip>
    </div>
  );
}
