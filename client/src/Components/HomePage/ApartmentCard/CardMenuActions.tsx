import { Button, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ApartmentCardButtons } from "../../../Assets/MyApartments";

type CardMenuActionsProps = {
  apartmentName: string;
};
export default function CardMenuActions({
  apartmentName,
}: CardMenuActionsProps) {
  const navigate = useNavigate();

  const handleClickMenuBtn = (to: string) => {
    navigate({
      pathname: `/${to}`,
      search: createSearchParams({
        apartmentId: apartmentName,
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
