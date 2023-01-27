import { Grid } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { maleImage } from "../../Assets/StaticImages";
import { AuthContext } from "../../Contexts/AuthContext";
import { Tenant } from "../../Data/interfaces/entities/Tenant.entity";
import { AuthContextType } from "../../Data/types/Auth";
import Loading from "../../Layout/Loading";
import TenantApiService from "../../Services/Api/TenantApi";
import TenantCard from "../ApartmentView/Tenant/TenantCard";
import DialogActionButtons from "../Global/DialogActionButtons";
import UpdateDocument from "./UpdateDocument";

interface ChangeTenantFromListProps {
  tenantId: string;
  changeTenant: (tenantId: string) => void;
  newDocument: File | null;
  changeDocument: (document: File | null) => void;
  onCancel: () => void;
}

export default function ChangeTenantFromList({
  tenantId,
  changeTenant,
  newDocument,
  changeDocument,
  onCancel,
}: ChangeTenantFromListProps) {
  const { authState, setLoading } = useContext(AuthContext) as AuthContextType;
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [searchParams] = useSearchParams();
  const [editLoading, setEditLoading] = useState<string>("");

  useEffect(() => {
    setEditLoading("טוען רשימת דיירים...");
    TenantApiService.getTenantsHistory(authState.mobile).then((response) => {
      setTenants(response);
      setLoading(false);
      setEditLoading("");
    });
  }, []);

  const onSubmit = () => {
    setEditLoading("מבצע החלפה לדייר הנבחר...");
    const apartmentId = searchParams.get("apartmentId") as string;
    TenantApiService.changeTenant(authState.mobile, tenantId, apartmentId).then(
      () => {
        setEditLoading("");
        setLoading(true);
      },
    );
  };

  if (editLoading) {
    return <Loading text={editLoading} />;
  }

  if (tenants.length === 0)
    return (
      <div>
        <h1>לא נמצאו דיירים נוספים.</h1>
      </div>
    );

  return (
    <>
      <Grid container spacing={2}>
        <Grid item sm={4}>
          <List component="nav" className="edit-from-list">
            {tenants.map((tenant, index) => (
              <ListItemButton
                key={`tenant-list-item-${index + tenant.id}`}
                selected={tenant.id === tenantId}
                onClick={() => {
                  changeTenant(tenant._id);
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
          <TenantCard
            tenant={tenants.find((tenant) => {
              return tenant._id === tenantId;
            })}
            hideActions={true}
          />
        </Grid>
        <Grid item sm={4}>
          <h5>חוזה</h5>
          <UpdateDocument
            document={
              tenants.find((tenant) => {
                return tenant._id === tenantId;
              })?.currentAgreement ?? ""
            }
            newDocument={newDocument}
            changeDocument={changeDocument}
          />
        </Grid>
      </Grid>
      <DialogActionButtons onSubmit={onSubmit} onCancel={onCancel} />
    </>
  );
}
