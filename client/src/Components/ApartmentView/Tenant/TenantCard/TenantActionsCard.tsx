import { Add, Edit, FindInPage, WhatsApp } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TENANT_ACTION_CARD } from "../../../../Assets/IConstans";
import { AuthContext } from "../../../../Contexts/AuthContext";
import { Tenant } from "../../../../Data/interfaces/entities/Tenant.entity";
import { AuthContextType } from "../../../../Data/types/Auth";
import CreateTenant from "../../../Create/CreateTenant/CreateTenant";
import CreateTenantMenu from "../../../EditTenant/CreateTenantMenu";
import EditTenantMenu from "../../../EditTenant/EditTenantMenu";
import ButtonIcon from "../../../Global/ButtonIcon";
import GenericDialog from "../../../Global/GenericDialog";

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
                {TENANT_ACTION_CARD.ADD_BTN}
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
        title={option !== 1 ? TENANT_ACTION_CARD.EDIT_TITLE : ""}
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
                {TENANT_ACTION_CARD.ADD_BTN}
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
              text={TENANT_ACTION_CARD.EDIT_BTN}
              icon={<Edit className="tenant-card-btn-icon" />}
              className="edit-tenant-btn tenant-card-btn"
            />
          }
          onCancel={() => {
            changeOption(-1);
            return false;
          }}
          content={editContent}
          title={option !== 2 ? TENANT_ACTION_CARD.EDIT_TITLE : ""}
          cancelActionsButtons={true}
          cancelContent={option === 2}
          isShowCloseButton={true}
        />
      </Grid>
      <Grid item xs={4} sm={4}>
        <ButtonIcon
          text={TENANT_ACTION_CARD.WHATSAPP_BTN}
          icon={<WhatsApp className="tenant-card-btn-icon" />}
          className="whatsapp-btn tenant-card-btn"
        />
      </Grid>
      <Grid item xs={4} sm={4}>
        <GenericDialog
          children={
            <ButtonIcon
              text={TENANT_ACTION_CARD.AGREEMENT}
              icon={<FindInPage className="tenant-card-btn-icon" />}
              className="docs-btn tenant-card-btn"
            />
          }
          title={TENANT_ACTION_CARD.AGREEMENT_TITLE}
          content={documentContent}
          cancelActionsButtons={true}
          isShowCloseButton={true}
        />
      </Grid>
    </Grid>
  );
}
