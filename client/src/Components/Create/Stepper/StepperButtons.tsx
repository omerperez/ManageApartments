import { Button, Grid } from "@mui/material";
import { useContext } from "react";
import IConstans from "../../../Assets/IConstans";
import { AuthContext } from "../../../Contexts/AuthContext";
import { PrivateContext } from "../../../Contexts/Private";
import { AuthContextType } from "../../../Data/types/Auth";
import { PrivateContextType } from "../../../Data/types/Private";

interface StepperBtnsProps {
  next: () => void;
  back: () => void;
}

export default function StepperButtons({ next, back }: StepperBtnsProps) {
  const { authState } = useContext(AuthContext) as AuthContextType;
  const { privateState } = useContext(PrivateContext) as PrivateContextType;
  const CONSTANS = IConstans[`${authState.language.toUpperCase()}_STEPPER`];

  return (
    <Grid container className="mt-3">
      <Grid item sm={6} className="text-start">
        <Button
          className="stepper-btn"
          variant="contained"
          disabled={privateState.activeStep === 0}
          onClick={back}
        >
          {CONSTANS.back}
        </Button>
      </Grid>
      <Grid item sm={6} className="text-end">
        <Button
          onClick={next}
          disabled={privateState.activeStep === 2}
          className="stepper-btn next-btn"
          variant="outlined"
        >
          {privateState.activeStep === 2 ? CONSTANS.create : CONSTANS.next}
        </Button>
      </Grid>
    </Grid>
  );
}
