import { Button, Grid } from "@mui/material";
import { useContext } from "react";
import IConstans from "../../../../Assets/IConstans";
import { AuthContext } from "../../../../Contexts/AuthContext";
import { AuthContextType } from "../../../../Data/types/Auth";

interface StepperBtnsProps {
  next: () => void;
  back: () => void;
  activeStep: number;
}

export default function StepperButtons({
  next,
  back,
  activeStep,
}: StepperBtnsProps) {
  const { authState } = useContext(AuthContext) as AuthContextType;
  const CONSTANS = IConstans[`${authState.language.toUpperCase()}_STEPPER`];

  return (
    <Grid container className="mt-3">
      <Grid item sm={6} className="text-start">
        <Button
          className="stepper-btn"
          variant="contained"
          disabled={activeStep === 0}
          onClick={back}
        >
          {CONSTANS.back}
        </Button>
      </Grid>
      <Grid item sm={6} className="text-end">
        <Button
          onClick={next}
          className="stepper-btn next-btn"
          variant="outlined"
        >
          {activeStep === 2 ? CONSTANS.create : CONSTANS.next}
        </Button>
      </Grid>
    </Grid>
  );
}
