import { Grid } from "@mui/material";
import { IDashboardTitle } from "../../Data/interfaces/IHome";
import { numberWithCommas } from "../../Services/Utils/formats";

type TopCardProps = {
  language: string;
  card: IDashboardTitle;
  body: number;
};

export default function TopCard({ card, language, body }: TopCardProps) {
  return (
    <div className={`${card.backgroundColor} small-card-design`}>
      <Grid container spacing={1}>
        <Grid item xs={6} sm={9} className={`top-card-title-${language}`}>
          {card[`${language}_title`]}
        </Grid>
        <Grid item xs={6} sm={3} className="text-end">
          {card.icon}
        </Grid>
      </Grid>
      <div className="text-center">
        <span className="fw-bolder card-body">{numberWithCommas(body)}</span>
      </div>
    </div>
  );
}
