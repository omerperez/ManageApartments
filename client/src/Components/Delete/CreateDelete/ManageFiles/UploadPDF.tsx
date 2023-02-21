import { Button } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useError403 } from "../../../../Services/Utils/useError403";

// CONSTANS
const REMOVE_DOC = "הסרת חוזה";
const UPLOAD_DOC = "צרף חוזה";

interface UploadPdfProps {
  pdf: File | null;
  setPdf: Dispatch<SetStateAction<File | null>>;
  textButton?: string;
}

export default function UploadPDF({ pdf, setPdf, textButton }: UploadPdfProps) {
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
    <div className="upload-file-container">
      <Button
        variant="contained"
        className="form-btn bg-red"
        onClick={removePdfFile}
      >
        {REMOVE_DOC}
      </Button>
      <iframe
        src={readFile(pdf)}
        title={`user-doc`}
        // width={"80vw"}
        className="upload-file-frame"
        onError={useError403}
      />
    </div>
  );
}
