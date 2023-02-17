import { Button } from "@mui/material";
import { ChangeEvent } from "react";

const LIMIT_FILE_SIZE_TEXT = "כל קובץ עד 10MB";

interface UploadImagesBtnProps {
  text: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  accept: string;
}

export default function UploadImagesBtn({
  text,
  onChange,
  accept,
}: UploadImagesBtnProps) {
  return (
    <Button
      variant="contained"
      fullWidth
      className="file-btn"
      component="label"
    >
      <div className="upload-image-btn-text">
        <span>
          {text}
          <span style={{ margin: "0 4px", color: "#919191" }}>
            {"או גרור קבצים לתיבה"}
          </span>
        </span>
        <div className="upload-image-btn-subtext">{LIMIT_FILE_SIZE_TEXT}</div>
      </div>
      <input
        accept={accept}
        multiple
        type="file"
        id="file-browser-input"
        name="file-browser-input"
        onChange={onChange}
      />
    </Button>
  );
}
