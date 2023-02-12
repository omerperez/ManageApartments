import { Stack } from "@mui/material";

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
    <div className="rtl">
      <div>
        <div className="input-label" style={{ fontSize: "24px" }}>
          {props.name}
        </div>
      </div>
      <Stack direction="row">
        <div className="price-to-pay-container">
          <div className="bill-price-container">
            <div className="bill-price-label">
              {props.type === "electric" ? ELECTRICITY_USE : WATER_USE}
              <span className="unit-text">
                {props.type === "electric" ? ELECTRIC_UNIT : WATER_UNIT}
              </span>
            </div>
            <span className="input-label">{props.totalUsed.toFixed(2)}</span>
          </div>
          <div className="bill-price-container">
            <div className="bill-price-label">
              {TOTAL_TO_PAY}
              <span className="unit-text"> {ILS}</span>
            </div>
            <div className="input-label">
              {props.totalPrice.toFixed(2)}
              <span className="unit-text"> {ILS}</span>
            </div>
          </div>
          <div className="btn-container">
            <button
              className="calc-btn recalc-bg"
              onClick={props.changeRowStyle}
            >
              {RECALCULATE}
            </button>
          </div>
          <div className="btn-container">
            <button className="calc-btn save-calc-bg">{SAVE_DATA}</button>
          </div>
        </div>
      </Stack>
    </div>
  );
}
