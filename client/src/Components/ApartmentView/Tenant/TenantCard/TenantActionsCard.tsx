import { Add, Edit, FindInPage, WhatsApp } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../../../../Contexts/AuthContext";
import { Tenant } from "../../../../Data/interfaces/entities/Tenant.entity";
import { AuthContextType } from "../../../../Data/types/Auth";
import CreateTenant from "../../../Create/CreateTenant/CreateTenant";
import CreateTenantMenu from "../../../EditTenant/CreateTenantMenu";
import EditTenantMenu from "../../../EditTenant/EditTenantMenu";
import ButtonIcon from "../../../Global/ButtonIcon";
import GenericDialog from "../../../Global/GenericDialog";

// Constans
const ADD_TENANT_BTN_TEXT = "הוסף דייר";
const EDIT_TENANT_BTN_TEXT = "עריכה";
const WHATSAPP_TENANT_BTN_TEXT = "וואטסאפ";
const DOWNLOAD_AGREEMENT = "חוזה";
const EDIT_TENANT_DIALOG_TITLE = "עריכת דייר";
const AGREEMENT_DIALOG_TITLE = "צפה בחוזה";

interface TenantActionsCardProps {
  tenant?: Tenant;
  isTenantHistory?: boolean;
}
export default function TenantActionsCard({
  tenant,
  isTenantHistory,
}: TenantActionsCardProps) {
  const [searchParams] = useSearchParams();

  const [option, setOption] = useState<number>(-1);
  const { setLoading } = useContext(AuthContext) as AuthContextType;
  const apartmentId = searchParams.get("apartmentId") as string;
  const changeOption = useCallback((index: number) => {
    setOption(index);
  }, []);

  if (!tenant && isTenantHistory) {
    return (
      <GenericDialog
        children={
          <Button fullWidth className="add-tenant-btn">
            <Grid container spacing={2}>
              <Grid item sm={6.5} textAlign="end">
                {ADD_TENANT_BTN_TEXT}
              </Grid>
              <Grid item sm={5.5} textAlign="start">
                <Add fontSize="large" className="tenant-card-add-btn-icon" />
              </Grid>
            </Grid>
          </Button>
        }
        content={
          <CreateTenantMenu
            currentOption={option}
            changeOption={changeOption}
            apartmentId={apartmentId}
          />
        }
        title={option !== 1 ? EDIT_TENANT_DIALOG_TITLE : ""}
        cancelActionsButtons={true}
        cancelContent={option === 1}
        isShowCloseButton={true}
      />
    );
  }

  if (!tenant) {
    return (
      <GenericDialog
        children={
          <Button fullWidth className="add-tenant-btn" onClick={() => {}}>
            <Grid container spacing={2}>
              <Grid item sm={6.5} textAlign="end">
                {ADD_TENANT_BTN_TEXT}
              </Grid>
              <Grid item sm={5.5} textAlign="start">
                <Add fontSize="large" className="tenant-card-add-btn-icon" />
              </Grid>
            </Grid>
          </Button>
        }
        content={
          <CreateTenant
            apartmentId={apartmentId}
            onCancel={() => setLoading(true)}
          />
        }
        cancelActionsButtons={true}
        cancelContent={true}
      />
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
      <Grid item xs={4} sm={4}>
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
          isShowCloseButton={true}
        />
      </Grid>
      <Grid item xs={4} sm={4}>
        <ButtonIcon
          text={WHATSAPP_TENANT_BTN_TEXT}
          icon={<WhatsApp className="tenant-card-btn-icon" />}
          className="whatsapp-btn tenant-card-btn"
        />
      </Grid>
      <Grid item xs={4} sm={4}>
        <GenericDialog
          children={
            <ButtonIcon
              text={DOWNLOAD_AGREEMENT}
              icon={<FindInPage className="tenant-card-btn-icon" />}
              className="docs-btn tenant-card-btn"
            />
          }
          title={AGREEMENT_DIALOG_TITLE}
          content={documentContent}
          cancelActionsButtons={true}
          isShowCloseButton={true}
        />
      </Grid>
    </Grid>
  );
}
