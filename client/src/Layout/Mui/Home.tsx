import { SxProps, Theme } from "@mui/material";
const MuiCard: SxProps<Theme> = {
  border: "solid 1px #919191",
  borderRadius: "4px",
  "& .MuiTypography-root": {
    fontFamily: "Tahoma",
    fontSize: 14,
  },
  "&  .muirtl-1qvr50w-MuiTypography-root": {
    fontSize: 22,
  },
};

const MuiCardIcon: SxProps<Theme> = {
  fontSize: 40,
  color: "white",
};

const SwipeableDrawerMui: SxProps<Theme> = {
  direction: "rtl",
  "& .css-9emuhu-MuiPaper-root-MuiDrawer-paper": {
    backgroundImage: `linear-gradient(19deg, #21d4fd 0%, #0b6efe 100%)`,
  },
};

export { MuiCard, MuiCardIcon, SwipeableDrawerMui };
