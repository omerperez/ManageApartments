/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import CreateApartmentBtn from "../Components/Global/Buttons/CreateApartmentBtn";
import ApartmentCard from "../Components/HomePage/ApartmentCard/Card";
import HomeDashboard from "../Components/HomePage/ApartmentCard/HomeDashboard";
import { AuthContext } from "../Contexts/AuthContext";
import { Apartment } from "../Data/builders/Apartment";
import { AuthContextType } from "../Data/types/Auth";
import "../Layout/CSS/Home.css";
import Loading from "../Layout/Loading";

export default function MyApartments() {
  const { authState, setLoading } = useContext(AuthContext) as AuthContextType;
  const [apartments, setApartments] = useState<Apartment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { getAllApartments } = await import(
          "../Services/Api/ApartmentApi"
        );
        const apartments = await getAllApartments(authState.mobile);
        setApartments(apartments);
      } catch (error) {
        setApartments([]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useMemo(() => {
    if (authState.loading && apartments.length > 0) {
      const fetchData = async () => {
        try {
          const { getAllApartments } = await import(
            "../Services/Api/ApartmentApi"
          );
          const apartments = await getAllApartments(authState.mobile);
          setApartments(apartments);
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [authState.loading]);

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
