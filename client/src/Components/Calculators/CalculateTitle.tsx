import { Grid } from "@mui/material";

interface Props {
  title: string;
  price: number;
  unit: string;
  onClickMultipleCalc: () => void;
}
// Constans
const CURRENT_PRICE = "עפ״י תעריף עדכני";
const FOR = "ש״ח ל";

export default function CalculateTitle(props: Props) {
  return (
    <Grid container className="mb-4 mt-3">
      <Grid item xs={4} className="bill-title">
        {props.title}
      </Grid>
      <Grid item xs={4} className="bill-title text-center">
        <span className="bill-sub-title-container">
          <span className="text-space">{CURRENT_PRICE}</span>
          <span className="text-space">{props.price}</span>
          <span className="bill-ils-title">{FOR + props.unit}</span>
        </span>
      </Grid>
      <Grid item xs={4} className="btn-container text-end">
        <button
          className="calc-btn electric-bg"
          onClick={props.onClickMultipleCalc}
        >
          חישוב מרובה
        </button>
      </Grid>
    </Grid>
  );
}
