import { HighlightOff } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useError403 } from "../../../../Services/Utils/useError403";

const UPLOAD_DOC = "העלאת חוזה";
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
      <div className="upload-doc-btn-position">
        <Button
          variant="contained"
          fullWidth
          className="file-btn"
          component="label"
        >
          <h1>{textButton ?? UPLOAD_DOC}</h1>
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
    <div className="relative">
      <iframe
        src={readFile(pdf)}
        title={`user-doc`}
        width={"80vw"}
        className="h-100"
        onError={useError403}
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
