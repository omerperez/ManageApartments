import { Edit } from "@mui/icons-material";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { defaultTenant } from "../../Assets/StaticData";
import { Tenant } from "../../Data/builders/Tenant";
import { DialogTenantMui } from "../../Layout/Mui/Edit";
import ThemeStyleRTL from "../Global/ThemeStyleRTL";
import EditTenant from "./EditTenant";

interface TenantDialogProps {
  tenantId: string;
}

export default function TenantDialog({ tenantId }: TenantDialogProps) {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (tenantId) {
      setTenant(defaultTenant);
    }
  }, [tenantId]);

  return (
    <>
      <IconButton className="edit-tenant-btn" onClick={handleClickOpen}>
        <Edit className="edit-btn" />
      </IconButton>
      <ThemeStyleRTL>
        <Dialog
          sx={DialogTenantMui}
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            {<EditTenant tenant={tenant} setOpen={setOpen} />}
          </DialogContent>
        </Dialog>
      </ThemeStyleRTL>
    </>
  );
}
