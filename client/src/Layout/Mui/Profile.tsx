const drawerWidth = 240;

const MuiSidebar = {
  displayFlex: { display: "flex" },
  childerBox: { flexGrow: 1, p: 3 },
  drawerSx: {
    width: drawerWidth,
    flexShrink: 1,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
      top: 65,
      background: "#90e6f9",
      borderColor: "#04CBF9",
    },
  },
  directionRtl: { direction: "rtl" },
};

export { MuiSidebar };
