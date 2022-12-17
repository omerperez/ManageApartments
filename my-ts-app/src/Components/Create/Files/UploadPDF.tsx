import { HighlightOff } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { getBase64 } from "../../../Services/FileService";

interface UploadPdfProps {
  pdf: string;
  setPdf: Dispatch<SetStateAction<string>>;
}
export default function UploadPDF({ pdf, setPdf }: UploadPdfProps) {
  const handleChangeFiles = (file: File) => {
    if (file) {
      getBase64(file).then((result) => {
        setPdf(result);
      });
    }
  };

  const removePdfFile = () => {
    setPdf("");
  };

  if (!pdf) {
    return (
      <Button
        variant="contained"
        fullWidth
        className="file-btn"
        component="label"
      >
        <h1>העלאת חוזה</h1>
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
