import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactNode, useContext } from "react";
import rtlPlugin from "stylis-plugin-rtl";
import { AuthContext } from "../Contexts/AuthContext";
import { AuthContextType } from "../Data/types/Auth";

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
  const { authState } = useContext(AuthContext) as AuthContextType;

  if (authState.language === "en")
    return <div className="ltr"> {children} </div>;

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}
