/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ApartmentDetails from "../Components/ApartmentView/ApartmentDetails";
import ApartmentImages from "../Components/ApartmentView/ApartmentImages";
import TenantCard from "../Components/ApartmentView/Tenant/TenantCard";
import TenantHistory from "../Components/ApartmentView/Tenant/TenantHistory";
import { AuthContext } from "../Contexts/AuthContext";
import { Apartment } from "../Data/builders/Apartment";
import { Tenant } from "../Data/interfaces/entities/Tenant.entity";
import { AuthContextType } from "../Data/types/Auth";
import "../Layout/CSS/Profile.css";
import Loading from "../Layout/Loading";
import { getApartmentView } from "../Services/Api/ApartmentApi";

// Constans
const APARTMENT_DETAILS_TITLE = "פרטי הדירה";
const TENANT_DETAILS_TITLE = "דייר נוכחי";

export default function ApartmentView() {
  const { authState, setLoading } = useContext(AuthContext) as AuthContextType;
  const [searchParams] = useSearchParams();
  const [currentApartment, setCurrentApartment] = useState<Apartment>();
  const [tenant, setTenant] = useState<Tenant>();
  const [tenantsHistory, setTenantsHistory] = useState<Tenant[]>([]);
  const [apartmentId, setApartmentId] = useState<string>("");
  useEffect(() => {
    const currentApartmentId = searchParams.get("apartmentId") as string;
    setApartmentId(currentApartmentId);
    getApartmentView(currentApartmentId).then((data) => {
      setLoading(true);
      setTenant(data.tenant);
      setTenantsHistory(data.tenantHistory);
      setCurrentApartment(data.apartment);
      setLoading(false);
    });
  }, [searchParams]);

  useMemo(() => {
    if (authState.loading && apartmentId) {
      getApartmentView(apartmentId).then((data) => {
        setLoading(true);
        setTenant(data.tenant);
        setTenantsHistory(data.tenantHistory);
        setCurrentApartment(data.apartment);
        setLoading(false);
      });
    }
  }, [authState.loading]);

  if (authState.loading || !currentApartment) {
    return <Loading />;
  }

  return (
    <Grid container className="apartment-details street-text">
      <Grid item sm={4} className="tenant-details-side">
        <div>
          {TENANT_DETAILS_TITLE}
          <div className="mt-2">
            <TenantCard
              tenant={tenant}
              isTenantHistory={tenantsHistory.length > 0}
            />
          </div>
          <TenantHistory tenants={tenantsHistory} />
        </div>
      </Grid>
      <Grid item sm={8} className="apartment-details-side">
        <div className="hide-title-mobile">{APARTMENT_DETAILS_TITLE}</div>
        <div className="mt-3">
          <ApartmentImages
            images={currentApartment.images}
            mainImageIndex={currentApartment.mainImageIndex}
          />
          <ApartmentDetails apartment={currentApartment} />
        </div>
      </Grid>
    </Grid>
  );
}
