import { Close } from "@mui/icons-material";
import { Button, Dialog, DialogContent, Grid, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Gallery from "../Components/ApartmentProfile/Gallery";
import Details from "../Components/ApartmentProfile/MainDetails";
import TenantsCard from "../Components/ApartmentProfile/TenantsCard";
import TenantsHistoryList from "../Components/ApartmentProfile/TenantsHistoryList";
import ChangeTenant from "../Components/Edit/EditApartment/ChangeTenant";
import TenantsList from "../Components/Edit/EditApartment/TenantsList";
import LanguageContainer from "../Components/Global/LanguageContainer";
import { AuthContext } from "../Contexts/AuthContext";
import { Apartment } from "../Data/builders/Apartment";
import { ITenant } from "../Data/interfaces/ITenant";
import { AuthContextType } from "../Data/types/Auth";
import "../Layout/CSS/Profile.css";
import Loading from "../Layout/Loading";
import { DialogSelectEditTenantTypeMui } from "../Layout/Mui/Edit";
import ThemeStyleRTL from "../Layout/ThemeStyleRTL";
import { getApartmentView } from "../Services/Api/ApartmentApi";

export default function ApartmentView() {
  const [searchParams] = useSearchParams();
  const { authState } = useContext(AuthContext) as AuthContextType;
  const [currentApartment, setCurrentApartment] = useState<Apartment>();
  const [currentTenant, setCurrentTenant] = useState<ITenant>();
  const [openEditTenantDialog, setOpenEditTenantDialog] =
    useState<boolean>(false);
  const [openHistoryListDialog, setOpenHistoryListDialog] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      if (searchParams) {
        const currentApartmentId = searchParams.get("apartmentId") as string;
        const response = await getApartmentView(currentApartmentId);
        setCurrentApartment(response.apartment);
        setCurrentTenant(response.tenant);
        setLoading(false);
      }
    };
    fetchData();
  }, [searchParams]);

  if (loading || !currentApartment || !currentTenant) {
    return <Loading />;
  }

  return (
    <LanguageContainer
      heClassName="rtl apartment-details"
      enClassName="apartment-details"
    >
      <Grid container className="street-text">
        <Grid item xs={4} className="tenant-details-side">
          <div>
            {authState.language === "en" ? "Main Tenant" : "דייר ראשי"}
            <div className="mt-2">
              <TenantsCard
                language={authState.language}
                currentTenant={currentTenant}
              >
                <ChangeTenant
                  editTenantId={currentTenant.id}
                  apartmentId={currentApartment.id.toString()}
                  open={openEditTenantDialog}
                  setOpen={setOpenEditTenantDialog}
                />
              </TenantsCard>
            </div>
            <div className="mt-5">
              {authState.language === "en" ? "Tenants History" : "דיירי עבר"}
              <Button
                className="change-tenant-btn"
                onClick={() => setOpenHistoryListDialog(true)}
              >
                ראה עוד
              </Button>
              <ThemeStyleRTL>
                <Dialog
                  sx={DialogSelectEditTenantTypeMui}
                  open={openHistoryListDialog}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <div className="text-start">
                    <IconButton
                      aria-label="close"
                      onClick={() => setOpenHistoryListDialog(false)}
                    >
                      <Close className="dialog-top-close-btn" />
                    </IconButton>
                  </div>
                  <DialogContent className="dialog-content-change-tenant">
                    <TenantsList
                      isShowOnly={true}
                      tenantsList={[
                        currentTenant,
                        currentTenant,
                        currentTenant,
                        currentTenant,
                      ]}
                    />
                  </DialogContent>
                </Dialog>
                <TenantsHistoryList
                  tenants={[
                    currentTenant,
                    currentTenant,
                    currentTenant,
                    currentTenant,
                  ]}
                />
              </ThemeStyleRTL>
            </div>
          </div>
        </Grid>
        <Grid item xs={8} className="apartment-details-side">
          <div>
            {authState.language === "en" ? "Apartment Details" : "פרטי הדירה"}
          </div>
          <div className="mt-3">
            <Gallery images={currentApartment.images} mainImageIndex={0} />
            <Details
              apartment={currentApartment}
              language={authState.language}
            />
          </div>
        </Grid>
      </Grid>
    </LanguageContainer>
  );
}
