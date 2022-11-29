import React, { FC, ReactNode, useContext } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { createTheme } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { AuthContext } from "../../Contexts/AuthContext";

const theme = createTheme({
  direction: "rtl",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

type Props = {
  children: ReactNode;
};

export default function ThemeStyleRTL({ children }: Props) {
  const { state } = useContext(AuthContext);

  if (state.language === "en") return <div className="ltr"> {children} </div>;

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}
