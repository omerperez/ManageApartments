import { Button } from "@mui/material";
import { Stack } from "react-bootstrap";
import "../../Layout/CSS/EditApartment.css";

interface EditButtonsProps {
  onSave: () => void;
  onCancel: () => void;
  saveText?: string;
  cancelText?: string;
}

export default function FormButtons({
  saveText,
  cancelText,
  onSave,
  onCancel,
}: EditButtonsProps) {
  return (
    <Stack direction={"horizontal"}>
      <Button
        fullWidth
        variant="contained"
        className="edit-btn edit-cancel-btn"
        onClick={onCancel}
      >
        {cancelText ?? "ביטול"}
      </Button>
      <Button
        fullWidth
        variant="contained"
        className="edit-btn edit-save-btn"
        onClick={onSave}
      >
        {saveText ?? "שמירה"}
      </Button>
    </Stack>
  );
}
