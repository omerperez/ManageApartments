import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pageLabels } from "../Assets/Apartments";
import { topDashboardTitles } from "../Assets/HomePage";
import { defaultApartment } from "../Assets/StaticData";
import GlobalButton from "../Components/Global/GlobalButton";
import Card from "../Components/HomePage/ApartmentCard/Card";
import SmallCard from "../Components/HomePage/TopCard";
import { AuthContext } from "../Contexts/AuthContext";
import { Apartment } from "../Data/builders/Apartment";
import { AuthContextType } from "../Data/types/Auth";
import "../Layout/CSS/Home.css";
import { getTextByCurrentTime } from "../Services/Utils/timeTextFunction";

export default function Home() {
  const { authState } = useContext(AuthContext) as AuthContextType;
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setApartments([
      defaultApartment,
      defaultApartment,
      defaultApartment,
      defaultApartment,
    ]);
  }, [authState]);

  return (
    <div className="home-page">
      <div className="welcome-title">{`${getTextByCurrentTime(
        authState,
      )}`}</div>
      <Grid container spacing={2}>
        {topDashboardTitles.map((card, index) => (
          <Grid item sm={3} key={`topDashboardTitle-${card.en_title + index}`}>
            <SmallCard
              language={authState.language}
              card={card}
              body={index !== 1 ? 10 * index : 3000}
            />
          </Grid>
        ))}
      </Grid>
      <GlobalButton
        classStyle="create-apartment-btn"
        text={pageLabels[authState.language].createBtn}
        fullWidth={false}
        icon={null}
        onClick={() => navigate("/create-apartment")}
      />
      <Grid container spacing={2} className="mt-2">
        {apartments.map((item, key) => (
          <Grid item xs={6} sm={3} key={`${item.name}-${key}`}>
            <Card apartment={item} language={authState.language} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
