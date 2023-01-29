import { AddCircleOutline } from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MY_APARTMENT } from "../../../Assets/IConstans";
import { AuthContext } from "../../../Contexts/AuthContext";
import { AuthContextType } from "../../../Data/types/Auth";
import useMobieDesign from "../../../Hooks/useMobile";

// Constans
const CREATE_BTN_TOOLTIP = "צור דירה חדשה";

export default function CreateApartmentBtn() {
  const isMobileScreen = useMobieDesign();
  const { authState } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  const onHandleClick = () => {
    navigate("/create-apartment");
  };

  if (isMobileScreen) {
    return (
      <Tooltip title={CREATE_BTN_TOOLTIP}>
        <IconButton
          id="logout-button"
          onClick={onHandleClick}
          className={`lan-btn-design`}
        >
          <AddCircleOutline className="lan-icon" />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Button
      className="home-action-btn"
      fullWidth={true}
      onClick={onHandleClick}
    >
      {MY_APARTMENT[authState.language.toUpperCase()].createBtn}
    </Button>
  );
}
