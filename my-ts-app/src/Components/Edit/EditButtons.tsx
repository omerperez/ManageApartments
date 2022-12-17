import { Button } from "@mui/material";
import { Stack } from "react-bootstrap";
import "../../Layout/CSS/EditApartment.css";

interface EditButtonsProps {
  onSave: () => void;
  onCancel: () => void;
}

export default function EditButtons({ onSave, onCancel }: EditButtonsProps) {
  return (
    <Stack direction={"horizontal"}>
      <Button
        fullWidth
        variant="contained"
        className="edit-cancel-btn"
        onClick={onCancel}
      >
        ביטול
      </Button>
      <Button
        fullWidth
        variant="contained"
        className="edit-save-btn"
        onClick={onSave}
      >
        שמירה
      </Button>
    </Stack>
  );
}
