import { Stack, Button } from "@mui/material";

// Constans
const CANCEL = "ביטול";
const SAVE = "שמירה";

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
    <Stack direction={"row"} spacing={2} className="ltr">
      <Button
        // fullWidth
        variant="contained"
        className="form-btn bg-blue"
        onClick={onSave}
      >
        {saveText ?? SAVE}
      </Button>
      <Button
        // fullWidth
        variant="contained"
        className="form-btn bg-red"
        onClick={onCancel}
      >
        {cancelText ?? CANCEL}
      </Button>
    </Stack>
  );
}
