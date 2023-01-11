import { Close } from "@mui/icons-material";
import { Button, Dialog, DialogContent, IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { ITenant } from "../../../Data/interfaces/ITenant";
import { DialogSelectEditTenantTypeMui } from "../../../Layout/Mui/Edit";
import HistoryList from "./TenantHistory/HistoryList";
import TenantHistoryContent from "./TenantHistory/TenantHistoryContent";

interface TenantHistoryProps {
  tenants: ITenant[];
}
export default function TenantHistory({ tenants }: TenantHistoryProps) {
  const TENANTS_HISTORY_EMPTY_TITLE = "לא קיימים דיירי עבר";
  const TENANTS_HISTORY_TITLE = "היסטוריית דיירים";
  const TENANTS_HISTORY_VIEW_MORE = "ראה עוד";
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  if (tenants.length === 0) {
    return <div className="mt-5">{TENANTS_HISTORY_EMPTY_TITLE}</div>;
  }
  const open = () => {
    setOpenDialog(true);
  };
  const close = () => {
    setOpenDialog(false);
  };

  return (
    <div className="mt-5">
      <Stack direction={"row"}>
        <div>{TENANTS_HISTORY_TITLE}</div>
        <Button className="change-tenant-btn" onClick={open}>
          {TENANTS_HISTORY_VIEW_MORE}
        </Button>
      </Stack>
      <Dialog sx={DialogSelectEditTenantTypeMui} open={openDialog}>
        <div className="text-start">
          <IconButton aria-label="close" onClick={close}>
            <Close className="dialog-top-close-btn" />
          </IconButton>
        </div>
        <DialogContent className="dialog-content-change-tenant">
          <TenantHistoryContent tenants={tenants} />
        </DialogContent>
      </Dialog>
      <HistoryList tenants={tenants} />
    </div>
  );
}
