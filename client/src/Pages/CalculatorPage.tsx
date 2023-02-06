import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import CardPrice from "../Components/Calculators/CardPrice";
import "../Layout/CSS/Layout.css";
import Loading from "../Layout/Loading";
import ApiService from "../Services/Api/OtherApi";
import { Calculate } from "@mui/icons-material";
import { Stack } from "@mui/system";

export default function CalculatorPage() {
  const [loading, setLoading] = useState<boolean>(true);

  const [electricPrice, setElectricPrice] = useState<number>(0);
  const [lowWaterPrice, setLowWaterPrice] = useState<number>(0);
  const [highWaterPrice, setHighWaterPrice] = useState<number>(0);

  useEffect(() => {
    const fetchdata = async () => {
      const { water, electric } = await ApiService.getCalculatorPrices();
      setLowWaterPrice(water.low);
      setHighWaterPrice(water.high);
      setElectricPrice(electric / 100);
      setLoading(false);
    };
    fetchdata();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const CALCULATOR_TITLE_PAGE = "ניהול חשבונות";
  const ELECTRIC_CALC_BTN = "למחשבון חשמל";
  const WATER_CALC_BTN = "למחשבון מים";

  return (
    <div className="calculator-page">
      <h1>{CALCULATOR_TITLE_PAGE}</h1>
      <Grid container spacing={2}>
        <Grid item xs={6} className="text-center">
          <CardPrice type={"electric"} price={electricPrice} />
          <Button className="calculator-btn electric-bg">
            <Grid container spacing={3}>
              <Grid item xs={9}>
                {ELECTRIC_CALC_BTN}
              </Grid>
              <Grid item xs={3}>
                <Calculate className="calculator-icon" />
              </Grid>
            </Grid>
          </Button>
        </Grid>
        <Grid item xs={6} textAlign="center">
          <CardPrice
            type={"water"}
            lowPrice={lowWaterPrice}
            highPrice={highWaterPrice}
          />

          <Button className="calculator-btn water-bg" fullWidth>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                {WATER_CALC_BTN}
              </Grid>
              <Grid item xs={3}>
                <Calculate className="calculator-icon" />
              </Grid>
            </Grid>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
