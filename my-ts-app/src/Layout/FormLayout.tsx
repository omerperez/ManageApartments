import { FormControl, FormLabel } from "@mui/material";
import ThemeRightToLeft from "./ThemeStyleRTL";

interface InputLayoutProps {
  error?: string;
  label?: string;
  children: JSX.Element;
}
export default function FormLayout({
  label,
  children,
  error,
}: InputLayoutProps) {
  return (
    <ThemeRightToLeft>
      <FormControl fullWidth>
        <FormLabel className="label-form" id={`form-title-label-${label}`}>
          {label}
        </FormLabel>
        {children}
      </FormControl>
      {error && <div className="input-error">{error}</div>}
    </ThemeRightToLeft>
  );
}
