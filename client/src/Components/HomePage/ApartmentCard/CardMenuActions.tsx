import { Button, Grid } from "@mui/material";
import { useContext } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ApartmentCardButtons } from "../../../Assets/MyApartments";
import { AuthContext } from "../../../Contexts/AuthContext";
import { AuthContextType } from "../../../Data/types/Auth";
import GenericDialog from "../../Global/GenericDialog";

type CardMenuActionsProps = {
  apartmentId: string;
};
export default function CardMenuActions({ apartmentId }: CardMenuActionsProps) {
  const navigate = useNavigate();
  const { authState, setLoading } = useContext(AuthContext) as AuthContextType;

  const handleClickMenuBtn = (to: string) => {
    if (to !== "delete") {
      return navigate({
        pathname: `/${to}`,
        search: createSearchParams({
          apartmentId: apartmentId,
        }).toString(),
      });
    }
    return;
  };

  const onDelete = () => {
    setLoading(true);
    import("../../../Services/Api/ApartmentApi").then((module) => {
      module.deleteApartment(apartmentId, authState.mobile);
    });
    return false;
  };

  const DELETE_APARTMENT_DIALOG_TEXT = "האם אתה בטוח שברצונך למחוק את הדירה?";

  return (
    <Grid container className="mt-2">
      {ApartmentCardButtons.map((btn, key) => (
        <Grid item xs={4} key={`CardMenuActions-${key}`}>
          {btn.to === "delete" ? (
            <GenericDialog
              onSubmit={onDelete}
              content={
                <div className="rtl">
                  <h1>{DELETE_APARTMENT_DIALOG_TEXT}</h1>
                </div>
              }
            >
              <Button fullWidth className={btn.className} endIcon={btn.icon}>
                {btn.text}
              </Button>
            </GenericDialog>
          ) : (
            <Button
              fullWidth
              className={btn.className}
              endIcon={btn.icon}
              onClick={() => handleClickMenuBtn(btn.to)}
            >
              {btn.text}
            </Button>
          )}
        </Grid>
      ))}
    </Grid>
  );
}
