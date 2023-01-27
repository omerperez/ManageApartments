import { Grid } from "@mui/material";
import { ITopDashboardCard } from "../../Data/interfaces/IHome";
import { numberWithCommas } from "../../Services/Utils/formats";

type TopCardProps = {
  language: string;
  card: ITopDashboardCard;
  body: number;
};

export default function DashboardCard({ card, language, body }: TopCardProps) {
  return (
    <div className={`${card.backgroundColor} dashboard-card-layout`}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={9} className={`top-card-title-${language}`}>
          {card[`${language}_title`]}
        </Grid>
        <Grid item xs={12} sm={3} className="dashboard-card-icon">
          {card.icon}
        </Grid>
      </Grid>
      <div className="dashboard-card-body-text">{numberWithCommas(body)}</div>
    </div>
  );
}
