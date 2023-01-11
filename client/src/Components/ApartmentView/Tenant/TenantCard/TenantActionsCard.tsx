import { Add, Edit, FindInPage, WhatsApp } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { useCallback, useState } from "react";
import { Tenant } from "../../../../Data/interfaces/entities/Tenant.entity";
import EditTenantMenu from "../../../EditTenant/EditTenantMenu";
import ButtonIcon from "../../../Global/ButtonIcon";
import GenericDialog from "../../../Global/GenericDialog";

interface TenantActionsCardProps {
  tenant?: Tenant;
}
export default function TenantActionsCard({ tenant }: TenantActionsCardProps) {
  // Constans
  const ADD_TENANT_BTN_TEXT = "הוסף דייר";
  const EDIT_TENANT_BTN_TEXT = "עריכה";
  const WHATSAPP_TENANT_BTN_TEXT = "וואטסאפ";
  const DOWNLOAD_AGREEMENT = "הורד חוזה";
  const EDIT_TENANT_DIALOG_TITLE = "עריכת דייר";

  const [option, setOption] = useState<number>(-1);

  const changeOption = useCallback((index: number) => {
    setOption(index);
  }, []);

  if (!tenant) {
    return (
      <Button fullWidth className="add-tenant-btn">
        <Grid container spacing={2}>
          <Grid item sm={6} textAlign="end">
            {ADD_TENANT_BTN_TEXT}
          </Grid>
          <Grid item sm={6} textAlign="start">
            <Add fontSize="large" className="tenant-card-add-btn-icon" />
          </Grid>
        </Grid>
      </Button>
    );
  }

  const editContent = (
    <div className="w-100">
      <EditTenantMenu
        tenant={tenant}
        currentOption={option}
        changeOption={changeOption}
      />
    </div>
  );

  const documentContent = (
    <iframe
      src={`${tenant.currentAgreement}`}
      title={`user-doc`}
      width="100%"
      height="500px"
      className="user-image"
    />
  );

  return (
    <Grid container>
      <Grid item sm={4}>
        <GenericDialog
          children={
            <ButtonIcon
              text={EDIT_TENANT_BTN_TEXT}
              icon={<Edit className="tenant-card-btn-icon" />}
              className="edit-tenant-btn tenant-card-btn"
            />
          }
          content={editContent}
          title={option !== 2 ? EDIT_TENANT_DIALOG_TITLE : ""}
          cancelActionsButtons={true}
          cancelContent={option === 2}
        />
      </Grid>
      <Grid item sm={4}>
        <ButtonIcon
          text={WHATSAPP_TENANT_BTN_TEXT}
          icon={<WhatsApp className="tenant-card-btn-icon" />}
          className="whatsapp-btn tenant-card-btn"
        />
      </Grid>
      <Grid item sm={4}>
        <GenericDialog
          children={
            <ButtonIcon
              text={DOWNLOAD_AGREEMENT}
              icon={<FindInPage className="tenant-card-btn-icon" />}
              className="docs-btn tenant-card-btn"
            />
          }
          title={"צפה בחוזה"}
          content={documentContent}
        />
      </Grid>
    </Grid>
  );
}
