import { SxProps, Theme } from "@mui/material";

const MuiSideMenuButtonIcon: SxProps<Theme> = {
  // color: "#2A2561",
  color: "white",
  fontSize: 42,
};

const MuiPapperMobileMenu = {
  position: "fixed",
  bottom: -0.5,
  left: 0,
  right: 0,
  zIndex: 10,
  height: 56,
};

const MuiMobileMenuButton = {
  background: "#0b6efe",
  "& .css-imwso6-MuiBottomNavigationAction-label": {
    color: "#b9e1ff",
  },
  "& .css-vubbuv": {
    color: "#b9e1ff",
  },
  "& .css-i4bv87-MuiSvgIcon-root": {
    color: "#b9e1ff",
  },
  "& .css-6f4m11.Mui-selected": {
    color: "white",
  },
  ".css-5efxf5.Mui-selected": {
    color: "white",
  },
};

const MuiMobileMenuButtonActive = {
  "& .css-imwso6-MuiBottomNavigationAction-label": {
    color: "white",
  },
  "& .css-i4bv87-MuiSvgIcon-root": {
    color: "white",
  },
  ".css-5efxf5.Mui-selected": {
    color: "white",
  },
  "& .css-6f4m11.Mui-selected": {
    color: "white",
  },
};

const MuiMobileBarContainer = {
  width: "100%",
  height: 60,
  "& .css-11b3ww9-MuiPaper-root-MuiAppBar-root": {
    backgroundColor: "#0b6efe",
  },
  "& .css-1iu42c5": {
    backgroundColor: "#0b6efe",
  },
};

export {
  MuiSideMenuButtonIcon,
  MuiMobileMenuButton,
  MuiPapperMobileMenu,
  MuiMobileMenuButtonActive,
  MuiMobileBarContainer,
};
