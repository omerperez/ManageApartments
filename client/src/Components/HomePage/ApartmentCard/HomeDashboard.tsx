import { Grid } from "@mui/material";
import { topDashboardTitles } from "../../../Assets/HomePage";
import DashboardCard from "../DashboardCard";

interface DashboardProps {
  language: string;
}

export default function HomeDashboard({ language }: DashboardProps) {
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
              body={index !== 1 ? 10 * index : 3000}
            />
          </div>
        </Grid>
      ))}
    </Grid>
  );
}
