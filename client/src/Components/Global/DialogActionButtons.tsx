import { Button, DialogActions } from "@mui/material";

// Constans
const SAVE_CHANGES = "שמור שינויים";
const BACK_TO_MENU = "חזור לתפריט";

interface DialogActionButtonsProps {
  onSubmit: () => void;
  onCancel: () => void;
}
export default function DialogActionButtons({
  onSubmit,
  onCancel,
}: DialogActionButtonsProps) {
  return (
    <DialogActions sx={{ marginTop: 5 }}>
      <Button
        fullWidth
        variant="contained"
        onClick={onSubmit}
        className="dialog-btn dialog-save-btn"
      >
        {SAVE_CHANGES}
      </Button>
      <Button
        fullWidth
        variant="contained"
        onClick={onCancel}
        className="dialog-btn dialog-cancel-btn"
      >
        {BACK_TO_MENU}
      </Button>
    </DialogActions>
  );
}
