import { Grid } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { maleImage } from "../../../../Assets/StaticImages";
import { AuthContext } from "../../../../Contexts/AuthContext";
import { Tenant } from "../../../../Data/interfaces/entities/Tenant.entity";
import { AuthContextType } from "../../../../Data/types/Auth";
import EditPdf from "../../../Delete/CreateDelete/ManageFiles/EditPdf";
import TenantsCard from "../../../Delete/DeleteApartmentProfile/TenantsCard";
import EditButtons from "../EditButtons";

interface TenantsListProps {
  isShowOnly: boolean;
  tenantsList: Tenant[];
  setEditTenant?: Dispatch<SetStateAction<Tenant | null>>;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function TenantsList({
  isShowOnly,
  tenantsList,
  setEditTenant,
  setOpen,
}: TenantsListProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [pdf, setPdf] = useState<string>("");
  const { authState } = useContext(AuthContext) as AuthContextType;

  const onSave = () => {
    setEditTenant && setEditTenant(tenantsList[selectedIndex]);
    setOpen && setOpen(false);
  };

  const onCancel = () => {
    setSelectedIndex(0);
    setOpen && setOpen(false);
  };

  if (tenantsList.length === 0) return null;

  return (
    <>
      <Grid container spacing={4}>
        <Grid item sm={4}>
          <List component="nav" aria-label="main mailbox folders">
            {tenantsList.map((tenant, index) => (
              <ListItemButton
                key={`tenant-list-item-${index + tenant.id}`}
                selected={selectedIndex === index}
                onClick={() => {
                  setSelectedIndex(index);
                }}
              >
                <ListItemIcon>
                  <img
                    src={maleImage}
                    width={40}
                    alt="profile-pic"
                    className="profile-img"
                  />
                </ListItemIcon>
                <ListItemText
                  primary={`${tenant.firstName} ${tenant.lastName}`}
                />
              </ListItemButton>
            ))}
          </List>
        </Grid>
        <Grid item sm={4}>
          <TenantsCard
            currentTenant={tenantsList[selectedIndex]}
            language={authState.language}
            isEditDialog={true}
          />
        </Grid>
        <Grid item sm={4}>
          {isShowOnly ? (
            <>
              <h5>חוזה אחרון</h5>
              <iframe
                src={`${tenantsList[selectedIndex].currentAgreement}`}
                title={`user-doc`}
                width={"100%"}
                height={380}
                className="user-image"
              />
            </>
          ) : (
            <>
              <h5>חוזה</h5>
              <EditPdf pdf={pdf} setPdf={setPdf} />
            </>
          )}
        </Grid>
      </Grid>
      {!isShowOnly && (
        <div className="mt-3">
          <EditButtons onSave={onSave} onCancel={onCancel} />
        </div>
      )}
    </>
  );
}
