import { Button, Stack } from "@mui/material";
import { cloneElement, ReactElement } from "react";

interface ChangeTenantButtonProps {
  onClick: () => void;
  color: string;
  icon: ReactElement;
  text: string;
  disabled?: boolean;
}
export default function ChangeTenantButton({
  onClick,
  color,
  icon,
  text,
  disabled,
}: ChangeTenantButtonProps) {
  return (
    <Button
      disabled={disabled}
      fullWidth
      className={`change-tenant-dialog-btn ${color}-border`}
      onClick={onClick}
    >
      <Stack>
        <div className="m-auto">
          {cloneElement(icon, { className: "change-tenant-icon" })}
        </div>
        <div className="text-black nowrap">{text}</div>
      </Stack>
    </Button>
  );
}
