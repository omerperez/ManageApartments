import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { TENANT_HISTORY } from "../../../Assets/IConstans";
import { Tenant } from "../../../Data/interfaces/entities/Tenant.entity";
import GenericDialog from "../../Global/GenericDialog";
import HistoryList from "./TenantHistory/HistoryList";
import TenantHistoryContent from "./TenantHistory/TenantHistoryContent";

interface TenantHistoryProps {
  tenants: Tenant[];
}
export default function TenantHistory({ tenants }: TenantHistoryProps) {
  if (tenants.length === 0) {
    return <div className="mt-5">{TENANT_HISTORY.EMPTY_TITLE}</div>;
  }

  return (
    <>
      <GenericDialog
        title={TENANT_HISTORY.TITLE}
        content={<TenantHistoryContent tenants={tenants} />}
        cancelActionsButtons={true}
        isShowCloseButton={true}
      >
        <Stack direction={"row"} className="mt-4">
          <div>{TENANT_HISTORY.TITLE}</div>
          <Button className="change-tenant-btn">
            {/*  onClick={open} */}
            {TENANT_HISTORY.VIEW_MORE}
          </Button>
        </Stack>
      </GenericDialog>
      <HistoryList tenants={tenants} />
    </>
  );
}
