import { Grid } from "@mui/material";
import { useContext } from "react";
import { topDashboardTitles } from "../../../Assets/HomePage";
import { ApplicationContext } from "../../../Contexts/ApplicationContext";
import { AppContextType } from "../../../Data/types/Private";
import DashboardCard from "../DashboardCard";

interface DashboardProps {
  language: string;
}

export default function HomeDashboard({ language }: DashboardProps) {
  const { appState } = useContext(ApplicationContext) as AppContextType;

  return (
    <Grid container spacing={2}>
      {topDashboardTitles.map((card, index) => (
        <Grid
          item
          xs={12}
          sm={3}
          key={`topDashboardTitle-${card.en_title + index}`}
        >
          <div>
            <DashboardCard
              language={language}
              card={card}
              body={appState ? appState.ownerStatisticsData[card.objectKey] : 0}
            />
          </div>
        </Grid>
      ))}
    </Grid>
  );
}
