import { SxProps, Theme } from "@mui/material";
const MuiCard: SxProps<Theme> = {
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
  background: "white",
  borderRadius: "50%",
  padding: 1,
};

const SwipeableDrawerMui: SxProps<Theme> = {
  direction: "rtl",
  "& .css-9emuhu-MuiPaper-root-MuiDrawer-paper": {
    backgroundImage: `linear-gradient(19deg, #21d4fd 0%, #0b6efe 100%)`,
  },
};

const MuiIcon = { color: "#2A2561", fontSize: 42 };

export { MuiCard, MuiCardIcon, MuiIcon, SwipeableDrawerMui };
