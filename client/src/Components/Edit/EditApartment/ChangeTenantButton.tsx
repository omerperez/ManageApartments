import { Button, Stack } from "@mui/material";
import { cloneElement, ReactElement } from "react";

interface ChangeTenantButtonProps {
  onClick: () => void;
  color: string;
  icon: ReactElement;
  text: string;
}
export default function ChangeTenantButton({
  onClick,
  color,
  icon,
  text,
}: ChangeTenantButtonProps) {
  return (
    <Button
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
