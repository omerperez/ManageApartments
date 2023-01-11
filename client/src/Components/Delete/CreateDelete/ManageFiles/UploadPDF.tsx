import { HighlightOff } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface UploadPdfProps {
  pdf: File | null;
  setPdf: Dispatch<SetStateAction<File | null>>;
  textButton?: string;
  buttonClassName?: string;
}

export default function UploadPDF({
  pdf,
  setPdf,
  buttonClassName,
  textButton,
}: UploadPdfProps) {
  const handleChangeFiles = (file: File) => {
    setPdf(file);
  };

  const removePdfFile = () => {
    setPdf(null);
  };

  const readFile = (image: File) => {
    return URL.createObjectURL(image);
  };

  if (!pdf) {
    return (
      <div className="h-100 p-4 pb-5">
        <Button
          variant="contained"
          fullWidth
          className="file-btn"
          component="label"
        >
          <h1>{textButton ?? "העלאת חוזה"}</h1>
          <input
            hidden
            accept=".pdf"
            type="file"
            onChange={(e: ChangeEvent<any>) => {
              handleChangeFiles(e.target.files[0]);
            }}
          />
        </Button>
      </div>
    );
  }

  return (
    <div className="relative h-100 p-4 pb-1">
      <iframe
        src={readFile(pdf)}
        title={`user-doc`}
        width={"100%"}
        className="h-100"
      />
      <div className="remove-pos">
        <IconButton
          onClick={removePdfFile}
          size="large"
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <HighlightOff fontSize="large" className="remove-icon" />
        </IconButton>
      </div>
    </div>
  );
}
