import { Button, Grid } from "@mui/material";
import { useContext, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { defaultApartment, defaultTenant } from "../Assets/StaticData";
import Gallery from "../Components/ApartmentProfile/Gallery";
import Details from "../Components/ApartmentProfile/MainDetails";
import TenantsCard from "../Components/ApartmentProfile/TenantsCard";
import TenantsHistoryList from "../Components/ApartmentProfile/TenantsHistoryList";
import LanguageContainer from "../Components/Global/LanguageContainer";
import { AuthContext } from "../Contexts/AuthContext";
import "../Layout/CSS/Profile.css";

export default function ApartmentDetails() {
  const [searchParams] = useSearchParams();
  const { state } = useContext(AuthContext);

  useMemo(() => {
    const fetchData = async () => {
      if (searchParams) {
        const apartmentId = searchParams.get("apartmentId");
      }
    };
    fetchData();
  }, [searchParams]);

  return (
    <LanguageContainer
      heClassName="rtl apartment-details"
      enClassName="apartment-details"
    >
      <Grid container className="street-text">
        <Grid item xs={4} className="tenant-details-side">
          <div>
            {state.language === "en" ? "Main Tenant" : "דייר ראשי"}
            <Button className="change-tenant-btn">החלף דייר</Button>
            <div className="mt-2">
              <TenantsCard
                language={state.language}
                currentTenant={defaultTenant}
              />
            </div>
            <div className="mt-5">
              {state.language === "en" ? "Tenants History" : "דיירי עבר"}
              <Button className="change-tenant-btn">ראה עוד</Button>
              <TenantsHistoryList
                tenants={[
                  defaultTenant,
                  defaultTenant,
                  defaultTenant,
                  defaultTenant,
                ]}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={8} className="apartment-details-side">
          <div>
            {state.language === "en" ? "Apartment Details" : "פרטי הדירה"}
          </div>
          <div className="mt-3">
            <Gallery images={defaultApartment.images} mainImageIndex={0} />
            <Details apartment={defaultApartment} language={state.language} />
          </div>
        </Grid>
      </Grid>
    </LanguageContainer>
  );
}
