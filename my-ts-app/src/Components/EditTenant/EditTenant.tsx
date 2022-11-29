import { Button } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Tenant } from "../../Data/builders/Tenant";
import "../../Layout/CSS/EditApartment.css";
import TenantPart from "../CreateApartment/TenantPart";

interface EditTenantProps {
  tenant: Tenant | null;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function EditTenant({ tenant, setOpen }: EditTenantProps) {
  const cancelChanges = () => {
    return setOpen(false);
  };

  const saveChanges = () => {
    return setOpen(false);
  };

  return (
    <div>
      <TenantPart editTenant={tenant} />
      <div className="edit-tenant-btns text-end">
        <Button
          variant="contained"
          className="edit-cancel-btn"
          onClick={cancelChanges}
        >
          בטל שינויים
        </Button>
        <Button
          variant="contained"
          className="edit-save-btn"
          onClick={saveChanges}
        >
          שמור שינויים
        </Button>
      </div>
    </div>
  );
}
