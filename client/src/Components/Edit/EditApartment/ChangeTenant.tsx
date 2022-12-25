import {
  BorderColor,
  Close,
  FilePresent,
  Groups,
  PersonAdd,
} from "@mui/icons-material";
import { Button, Dialog, DialogContent, Grid, IconButton } from "@mui/material";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { defaultTenant, defaultTenant2 } from "../../../Assets/StaticData";
import { AuthContext } from "../../../Contexts/AuthContext";
import { ITenant } from "../../../Data/interfaces/ITenant";
import { AuthContextType } from "../../../Data/types/Auth";
import { DialogSelectEditTenantTypeMui } from "../../../Layout/Mui/Edit";
import ThemeStyleRTL from "../../../Layout/ThemeStyleRTL";
import CreateTenantForm from "../../Create/CreateForms/TenantForm";
import EditButtons from "../EditButtons";
import EditTenant from "../EditTenant/EditTenant";
import ExtendAgreement from "../EditTenant/ExtendAgreement";
import ChangeTenantButton from "./ChangeTenantButton";
import TenantsList from "./TenantsList";

interface ChangeTenantProps {
  apartmentId: string;
  editTenantId: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ChangeTenant({
  apartmentId,
  editTenantId,
  open,
  setOpen,
}: ChangeTenantProps) {
  const editTenantText = "עריכת דייר";
  const [option, setOption] = useState<number>(-1);
  const [editTenant, setEditTenant] = useState<ITenant | null>(null);
  const [tenantsList, setTenantList] = useState<ITenant[]>([]);

  const { authState } = useContext(AuthContext) as AuthContextType;

  const chooseTenantFromList = () => {
    //fetch - get all tenant that free -> prop: apartmentId
    setTenantList([
      defaultTenant,
      defaultTenant2,
      defaultTenant,
      defaultTenant2,
      defaultTenant,
    ]);
    setOption(0);
  };

  const editCurrentTenant = () => {
    // fetchTenantById - prop: editTenantId
    setEditTenant(defaultTenant);
    setOption(2);
  };

  const clickOnExtendAgreement = () => {
    setEditTenant(defaultTenant);
    setOption(3);
  };

  const options = [
    <TenantsList
      isShowOnly={false}
      tenantsList={tenantsList}
      setEditTenant={setEditTenant}
      setOpen={setOpen}
    />,
    <>
      <CreateTenantForm isEditTenant={true} editTenant={defaultTenant2} />
      <div className="mt-5">
        <EditButtons
          onSave={() => {
            setOpen(false);
          }}
          onCancel={() => {}}
        />
      </div>
    </>,
    <EditTenant editTenant={editTenant as ITenant} />,
    <ExtendAgreement
      tenant={editTenant as ITenant}
      language={authState.language}
      setOpen={setOpen}
    />,
  ];

  // Export to file latter
  const optionsBtns = [
    {
      color: "blue",
      icon: <Groups />,
      onClick: chooseTenantFromList,
      text: "בחר דייר מתוך רשימה",
    },
    {
      color: "green",
      icon: <PersonAdd />,
      onClick: null,
      text: "צור דייר חדש",
    },
    {
      color: "yellow",
      icon: <BorderColor />,
      onClick: editCurrentTenant,
      text: "ערוך פרטי דייר",
    },
    {
      color: "red",
      icon: <FilePresent />,
      onClick: clickOnExtendAgreement,
      text: "הארכת חוזה",
    },
  ];

  const chooseOption = (
    <Grid container spacing={3}>
      {optionsBtns.map((button, index) => (
        <Grid
          item
          sm={3}
          key={`choose-option-tenant-btns-${button.color + index}`}
        >
          <ChangeTenantButton
            color={button.color}
            onClick={
              button.onClick
                ? button.onClick
                : () => {
                    setOption(index);
                  }
            }
            icon={button.icon}
            text={button.text}
          />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <>
      <Button
        onClick={() => {
          setOption(-1);
          setOpen(true);
        }}
        className="edit-images-btn"
      >
        {editTenantText}
      </Button>
      <ThemeStyleRTL>
        <Dialog
          sx={DialogSelectEditTenantTypeMui}
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {option === -1 && (
            <div className="text-start">
              <IconButton aria-label="delete" onClick={() => setOpen(false)}>
                <Close className="dialog-top-close-btn" />
              </IconButton>
            </div>
          )}
          <DialogContent className="dialog-content-change-tenant">
            {option === -1 ? chooseOption : options[option]}
          </DialogContent>
        </Dialog>
      </ThemeStyleRTL>
    </>
  );
}