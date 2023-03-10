import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";

const SxMuiStepper: SxProps<Theme> = {
  height: "100%",
  "& .muirtl-8t49rw-MuiStepConnector-line": {
    borderColor: "black",
    minHeight: "100%",
    margin: "0 5px",
  },
  "& .muirtl-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root": {
    width: 40,
    height: 40,
    border: "solid 2px white",
    borderRadius: "50%",
    color: "#2a2561",
  },
  "& .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root": {
    width: 40,
    height: 40,
    border: "solid 2px white",
    borderRadius: "50%",
    color: "#2a2561",
  },
  "& .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active": {
    color: "#4099ff",
  },
  "& .muirtl-zpcwqm-MuiStepConnector-root": {
    padding: "0 5px",
  },
  "& .css-zpcwqm-MuiStepConnector-root": {
    padding: "0 5px",
  },
  "& .muirtl-1hv8oq8-MuiStepLabel-label": {
    fontSize: 16,
    letterSpacing: 0.5,
    color: "#2a2561",
    fontFamily: "Rubik",
    fontWeight: 700,
  },
  "& .css-1hv8oq8-MuiStepLabel-label": {
    fontSize: 16,
    letterSpacing: 0.5,
    color: "#2a2561",
    fontFamily: "Rubik",
    fontWeight: 700,
  },
  "& .muirtl-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed": {
    color: "#319e88",
  },
  "& .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed": {
    color: "#319e88",
  },
  "& .muirtl-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active": {
    color: "#4099ff",
  },
};

const AddFabBtnMui: (
  isMobileScreen: boolean,
  isEditDialog?: boolean,
) => SxProps<Theme> = (isMobileScreen: boolean, isEditDialog?: boolean) => {
  if (isEditDialog) {
    return {
      position: "absolute",
      bottom: 90,
      right: 30,
    };
  }
  if (isMobileScreen) {
    return {
      padding: 4,
      backgroundColor: "#0b6efe",
      border: "solid 2px white",
      marginBottom: 2,
    };
  }
  return {
    padding: 4,
    backgroundColor: "#0b6efe",
    border: "solid 2px white",
    marginBottom: 2,
    margin: "5px 0",
  };
};

export { AddFabBtnMui, SxMuiStepper };
