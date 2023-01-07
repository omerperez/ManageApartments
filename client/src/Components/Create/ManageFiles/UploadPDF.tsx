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
    // if (file) {
    //   getBase64(file).then((result) => {
    //     setPdf(file);
    //   });
    // }
  };

  const removePdfFile = () => {
    setPdf(null);
  };

  if (!pdf) {
    return (
      <Button
        variant="contained"
        fullWidth
        className={buttonClassName ?? "file-btn"}
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
    );
  }

  return (
    <div className="relative">
      <iframe
        src={`${pdf}`}
        title={`user-doc`}
        width={"100%"}
        height={380}
        className="user-image"
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
