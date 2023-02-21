import { Grid, Stack } from "@mui/material";
import {
  ChangeEvent,
  forwardRef,
  Ref,
  useEffect,
  useMemo,
  useState,
} from "react";
import PriceToPay from "./PriceToPay";

interface TenantRowProps {
  name: string;
  previousMonthAppointed?: number;
  currentMonthAppointed?: number;
  price: number;
  type: "water" | "electric";
  isShowTotalPrice: boolean;
  initIsShowTotalPrice: () => void;
}

// Constans
const PREV_MONTH_LABEL = "מונה חודש שעבר";
const WATER_UNIT_TEXT = "(מ״ק)";
const ELCETRIC_UNIT_TEXT = "(קוט״ש)";
const CURRENT_MONTH_LABEL = "מונה חודש נוכחי";
const CALCULATE_BTN = "חשב עכשיו";

const BillTenantRow = (
  {
    name,
    previousMonthAppointed,
    currentMonthAppointed,
    price,
    type,
    isShowTotalPrice,
    initIsShowTotalPrice,
  }: TenantRowProps,
  ref: Ref<any>,
) => {
  const [value, setValue] = useState<number | undefined>(currentMonthAppointed);
  const [totalUsed, setTotalUsed] = useState<number | null>(
    currentMonthAppointed && previousMonthAppointed
      ? currentMonthAppointed - previousMonthAppointed
      : null,
  );
  const [totalPrice, setTotalPrice] = useState<number | null>(
    currentMonthAppointed && previousMonthAppointed
      ? (currentMonthAppointed - previousMonthAppointed) * price
      : null,
  );
  const [isShowClaculate, setIsShowClaculate] = useState<boolean>(
    currentMonthAppointed && previousMonthAppointed ? true : false,
  );

  const handleClick = () => {
    if (value && previousMonthAppointed) {
      const total = value - previousMonthAppointed;
      setTotalUsed(total);
      setTotalPrice(total * price);
      setIsShowClaculate(true);
    }
  };

  useEffect(() => {
    if (isShowTotalPrice && value && previousMonthAppointed) {
      const total = value - previousMonthAppointed;
      setTotalUsed(total);
      setTotalPrice(total * price);
      setIsShowClaculate(true);
    }
  }, [isShowTotalPrice]);

  useMemo(() => {
    if (!isShowClaculate && totalPrice) {
      initIsShowTotalPrice();
    }
  }, [isShowClaculate]);

  const changeRowStyle = () => {
    setIsShowClaculate(false);
  };

  if (isShowClaculate && totalPrice && totalUsed) {
    return (
      <PriceToPay
        type={type}
        name={name}
        totalPrice={totalPrice}
        totalUsed={totalUsed}
        changeRowStyle={changeRowStyle}
      />
    );
  }

  return (
    <div>
      <div className="input-label" style={{ fontSize: "24px" }}>
        {name}
      </div>
      <Grid container className="price-to-pay-container">
        <Grid item xs={12} sm={4} className="bills-input-container">
          <div className="input-label">
            {PREV_MONTH_LABEL}
            <span className="unit-text">
              {type === "electric" ? ELCETRIC_UNIT_TEXT : WATER_UNIT_TEXT}
            </span>
          </div>
          <input
            disabled
            value={previousMonthAppointed}
            className="bills-input disabled-bg"
          />
        </Grid>
        <Grid item xs={12} sm={4} className="bills-input-container">
          <div className="input-label">
            {CURRENT_MONTH_LABEL}
            <span className="unit-text">
              {type === "electric" ? ELCETRIC_UNIT_TEXT : WATER_UNIT_TEXT}
            </span>
          </div>
          <input
            className="bills-input"
            value={value}
            ref={ref}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setValue(+event.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} sm={4} className="m-lg-auto text-lg-center">
          <button
            className={`calc-btn ${type}-bg mt-lg-4`}
            onClick={handleClick}
          >
            {CALCULATE_BTN}
          </button>
        </Grid>
      </Grid>
    </div>
  );
};

const BillTenantRowForwardRef = forwardRef(BillTenantRow);

export default BillTenantRowForwardRef;
