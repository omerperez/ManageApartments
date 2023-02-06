/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from "@mui/material";
import { useEffect, useMemo } from "react";
import CreateApartmentBtn from "../Components/Global/Buttons/CreateApartmentBtn";
import ApartmentCard from "../Components/HomePage/ApartmentCard/Card";
import HomeDashboard from "../Components/HomePage/ApartmentCard/HomeDashboard";
import { useApartmentsMetaData } from "../Hooks/useMetaData";
import "../Layout/CSS/Home.css";
import Loading from "../Layout/Loading";
import { getTextByCurrentTime } from "../Services/Utils/timeTextFunction";

export default function Home() {
  const { authState, apartments, fetchData } = useApartmentsMetaData();

  useEffect(() => {
    console.log("render");
    fetchData();
  }, []);

  if (authState.loading) {
    return <Loading />;
  }

  return (
    <div className="home-page">
      <div className="welcome-title">{`${getTextByCurrentTime(
        authState,
      )}`}</div>
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
