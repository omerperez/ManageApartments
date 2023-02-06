/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from "@mui/material";
import { useEffect, useMemo } from "react";
import CreateApartmentBtn from "../Components/Global/Buttons/CreateApartmentBtn";
import ApartmentCard from "../Components/HomePage/ApartmentCard/Card";
import HomeDashboard from "../Components/HomePage/ApartmentCard/HomeDashboard";
import { useApartmentsMetaData } from "../Hooks/useMetaData";
import "../Layout/CSS/Home.css";
import Loading from "../Layout/Loading";

export default function MyApartments() {
  const { authState, apartments, fetchData } = useApartmentsMetaData();

  useEffect(() => {
    fetchData();
  }, []);

  if (authState.loading) {
    return <Loading />;
  }

  return (
    <div className="home-page">
      <Grid container spacing={2}>
        <Grid item sm={12} className="hide-dashboard-mobile">
          <HomeDashboard language={authState.language} />
        </Grid>
        <Grid item sm={12} className="hide-dashboard-mobile">
          <CreateApartmentBtn />
        </Grid>
        {apartments.map((item, key) => (
          <Grid item xs={12} sm={3} key={`${item.name}-${key}`}>
            <ApartmentCard apartment={item} language={authState.language} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
