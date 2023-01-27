/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid } from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MY_APARTMENT } from "../Assets/IConstans";
import ApartmentCard from "../Components/HomePage/ApartmentCard/Card";
import HomeDashboard from "../Components/HomePage/ApartmentCard/HomeDashboard";
import { AuthContext } from "../Contexts/AuthContext";
import { Apartment } from "../Data/builders/Apartment";
import { AuthContextType } from "../Data/types/Auth";
import "../Layout/CSS/Home.css";
import Loading from "../Layout/Loading";
import { getTextByCurrentTime } from "../Services/Utils/timeTextFunction";

export default function Home() {
  const { authState, setLoading } = useContext(AuthContext) as AuthContextType;
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const navigate = useNavigate();

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
      <div className="welcome-title">{`${getTextByCurrentTime(
        authState,
      )}`}</div>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={12}>
          <HomeDashboard language={authState.language} />
        </Grid>
        <Grid item xs={6} sm={12}>
          <Button
            className="home-action-btn"
            fullWidth={true}
            onClick={() => navigate("/create-apartment")}
          >
            {MY_APARTMENT[authState.language.toUpperCase()].createBtn}
          </Button>
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
