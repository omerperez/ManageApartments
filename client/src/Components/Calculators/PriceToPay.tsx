import { Grid, Stack } from "@mui/material";

interface Props {
  name: string;
  totalUsed: number;
  totalPrice: number;
  type: "water" | "electric";
  changeRowStyle: () => void;
}

// Constans
const ELECTRICITY_USE = "צריכת חשמל";
const WATER_USE = "צריכת מים";
const ELECTRIC_UNIT = "(קוט״ש)";
const WATER_UNIT = "(מ״ק)";
const TOTAL_TO_PAY = "סה״כ לתשלום";
const ILS = "(ש״ח)";
const SAVE_DATA = "שמור נתונים";
const RECALCULATE = "חשב מחדש";

export default function PriceToPay(props: Props) {
  return (
    <div>
      <div className="input-label" style={{ fontSize: "24px" }}>
        {props.name}
      </div>

      <Grid container className="price-to-pay-container">
        <Grid item xs={6} sm={3} className="bill-price-container">
          <div className="bill-price-label">
            {props.type === "electric" ? ELECTRICITY_USE : WATER_USE}
            <span className="unit-text">
              {props.type === "electric" ? ELECTRIC_UNIT : WATER_UNIT}
            </span>
          </div>
          <span className="input-label">{props.totalUsed.toFixed(2)}</span>
        </Grid>
        <Grid item xs={6} sm={3} className="bill-price-container">
          <div className="bill-price-label">
            {TOTAL_TO_PAY}
            <span className="unit-text"> {ILS}</span>
          </div>
          <div className="input-label">
            {props.totalPrice.toFixed(2)}
            <span className="unit-text"> {ILS}</span>
          </div>
        </Grid>
        <Grid item xs={6} sm={3} className="btn-container">
          <button className="calc-btn recalc-bg" onClick={props.changeRowStyle}>
            {RECALCULATE}
          </button>
        </Grid>
        <Grid item xs={6} sm={3} className="btn-container">
          <button className="calc-btn save-calc-bg">{SAVE_DATA}</button>
        </Grid>
      </Grid>
    </div>
  );
}
