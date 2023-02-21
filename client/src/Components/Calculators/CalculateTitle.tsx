import { Grid } from "@mui/material";

// Constans
const CURRENT_PRICE = "עפ״י תעריף עדכני";
const FOR = "ש״ח ל";

interface Props {
  title: string;
  price: number;
  unit: string;
  onClickMultipleCalc: () => void;
}

export default function CalculateTitle(props: Props) {
  return (
    <Grid container className="bill-title-container">
      <Grid item xs={12} sm={4} className="bill-title">
        {props.title}
      </Grid>
      <Grid item xs={12} sm={4} className="bill-title">
        <span className="bill-sub-title-container">
          <span className="text-space">{CURRENT_PRICE}</span>
          <span className="text-space">{props.price}</span>
          <span className="bill-ils-title">{FOR + props.unit}</span>
        </span>
      </Grid>
      <Grid item xs={12} sm={4} className="btn-container">
        <button
          className={`calc-btn ${
            props.unit === "מ״ק" ? "water-bg" : "electric-bg"
          }`}
          onClick={props.onClickMultipleCalc}
        >
          חישוב מרובה
        </button>
      </Grid>
    </Grid>
  );
}
