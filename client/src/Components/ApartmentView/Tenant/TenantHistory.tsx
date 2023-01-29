import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { Tenant } from "../../../Data/interfaces/entities/Tenant.entity";
import GenericDialog from "../../Global/GenericDialog";
import HistoryList from "./TenantHistory/HistoryList";
import TenantHistoryContent from "./TenantHistory/TenantHistoryContent";

// Constans
const TENANTS_HISTORY_EMPTY_TITLE = "לא קיימים דיירי עבר";
const TENANTS_HISTORY_TITLE = "היסטוריית דיירים";
const TENANTS_HISTORY_VIEW_MORE = "ראה עוד";

interface TenantHistoryProps {
  tenants: Tenant[];
}
export default function TenantHistory({ tenants }: TenantHistoryProps) {
  if (tenants.length === 0) {
    return <div className="mt-5">{TENANTS_HISTORY_EMPTY_TITLE}</div>;
  }

  return (
    <>
      <GenericDialog
        title={TENANTS_HISTORY_TITLE}
        content={<TenantHistoryContent tenants={tenants} />}
        cancelActionsButtons={true}
        isShowCloseButton={true}
      >
        <Stack direction={"row"} className="mt-4">
          <div>{TENANTS_HISTORY_TITLE}</div>
          <Button className="change-tenant-btn">
            {/*  onClick={open} */}
            {TENANTS_HISTORY_VIEW_MORE}
          </Button>
        </Stack>
      </GenericDialog>
      <HistoryList tenants={tenants} />
    </>
  );
}
