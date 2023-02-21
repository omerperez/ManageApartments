import { Button, DialogActions } from "@mui/material";

// Constans
const SAVE_CHANGES = "שמור שינויים";
const BACK_TO_MENU = "בטל";

interface DialogActionButtonsProps {
  onSubmit: () => void;
  onCancel?: () => void;
}
export default function DialogActionButtons({
  onSubmit,
  onCancel,
}: DialogActionButtonsProps) {
  return (
    <DialogActions sx={{ marginTop: 8 }}>
      {onCancel && (
        <Button
          fullWidth
          variant="contained"
          onClick={onCancel}
          sx={{ margin: "10px" }}
          className="form-btn bg-red"
        >
          {BACK_TO_MENU}
        </Button>
      )}
      <Button
        fullWidth
        variant="contained"
        onClick={onSubmit}
        sx={{ margin: "10px" }}
        className="form-btn bg-blue"
      >
        {SAVE_CHANGES}
      </Button>
    </DialogActions>
  );
}
