import { Button } from "@mui/material";

const ELECTRIC_CARD_TITLE = `תעריף חשמל נוכחי`;
const ELECTRIC_PRICE_TEXT = `מחיר עובר קוט״ש`;
const WATER_PRICE_TEXT = `תעריף נמוך / גבוה לקוב`;
const WATER_CARD_TITLE = `תעריף מים נוכחי`;
const ELECTRIC_CALC_BTN = "למחשבון חשמל";
const WATER_CALC_BTN = "למחשבון מים";

type CardPriceTypeProps =
  | { type: "electric"; price: number }
  | { type: "water"; lowPrice: number; highPrice: number };

export default function CardPrice(props: CardPriceTypeProps) {
  if (props.type === "electric") {
    return (
      <div
        style={{ backgroundImage: `url(/staticImages/electric-bg.svg)` }}
        className="calculator-card-container"
      >
        <div className="calculator-card-title">{ELECTRIC_CARD_TITLE}</div>
        <div>
          <span className="calculator-price-text">{props.price}</span>
          <span className="ILS-text">{`ש״ח`}</span>
          <div className="ILS-text">{ELECTRIC_PRICE_TEXT}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ backgroundImage: `url(/staticImages/water-bg.svg)` }}
      className="calculator-card-container"
    >
      <div className="calculator-card-title">{WATER_CARD_TITLE}</div>
      <div>
        <span className="calculator-price-text">
          {props.lowPrice}
          <span className="calculator-text-or">{" / "}</span>
          {props.highPrice}
        </span>
        <span className="ILS-text">{`ש״ח`}</span>
        <div className="ILS-text">{WATER_PRICE_TEXT}</div>
      </div>
    </div>
  );
}
