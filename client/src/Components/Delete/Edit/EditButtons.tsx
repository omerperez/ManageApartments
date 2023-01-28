import { Stack, Button } from "@mui/material";
// import { Stack } from "react-bootstrap";

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
  // Constans
  const CANCEL = "ביטול";
  const SAVE = "שמירה";

  return (
    <Stack direction={"row"} spacing={2} className="ltr">
      <Button
        fullWidth
        variant="contained"
        className="edit-btn edit-save-btn"
        onClick={onSave}
      >
        {saveText ?? SAVE}
      </Button>
      <Button
        fullWidth
        variant="contained"
        className="edit-btn edit-cancel-btn"
        onClick={onCancel}
      >
        {cancelText ?? CANCEL}
      </Button>
    </Stack>
  );
}
