import { Button, Grid } from "@mui/material";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ApartmentCardButtons } from "../../../Assets/MyApartments";

type CardMenuActionsProps = {
  apartmentId: string;
};
export default function CardMenuActions({ apartmentId }: CardMenuActionsProps) {
  const navigate = useNavigate();

  const handleClickMenuBtn = (to: string) => {
    navigate({
      pathname: `/${to}`,
      search: createSearchParams({
        apartmentId: apartmentId,
      }).toString(),
    });
  };

  return (
    <Grid container className="mt-2">
      {ApartmentCardButtons.map((btn, key) => (
        <Grid item sm={4} key={`CardMenuActions-${key}`}>
          <Button
            fullWidth
            className={btn.className}
            endIcon={btn.icon}
            onClick={() => handleClickMenuBtn(btn.to)}
          >
            {btn.text}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}
