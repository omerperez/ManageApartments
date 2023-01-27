import { useMediaQuery } from "@mui/material";

const useMobieDesign = (maxWidth?: string) => {
  // const [width, height] = useWindowSize();
  const maxWidthSize = maxWidth ?? 600;

  const isMobileMatch = useMediaQuery(`(max-width:${maxWidthSize}px)`);

  return isMobileMatch;
};

export default useMobieDesign;
