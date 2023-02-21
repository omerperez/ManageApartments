import { Button } from "@mui/material";
import { ChangeEvent } from "react";

// CONSTANS
const REMOVE_NEW_FILE = "בטל שינויים";
const UPLOAD_NEW_FILE = "עדכן חוזה";

interface UpdateDocumentProps {
  document: string;
  newDocument: File | null;
  changeDocument: (newDoc: File | null) => void;
}

export default function UpdateDocument({
  document,
  newDocument,
  changeDocument,
}: UpdateDocumentProps) {
  const handleChangeFiles = (file: File) => {
    changeDocument(file);
  };

  const removeNewDocument = () => {
    changeDocument(null);
  };

  const readFile = (currentFile: File | null) => {
    if (currentFile) {
      return URL.createObjectURL(currentFile);
    }
    return document;
  };

  return (
    <div>
      <div className="d-flex w-100">
        <Button
          variant="contained"
          fullWidth
          className="edit-tenant-document-btn remove-new-document"
          onClick={removeNewDocument}
        >
          {REMOVE_NEW_FILE}
        </Button>
        <Button
          variant="contained"
          fullWidth
          className="edit-tenant-document-btn upload-new-document"
          component="label"
        >
          {UPLOAD_NEW_FILE}
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
      <iframe
        src={readFile(newDocument)}
        title={`user-doc`}
        loading="lazy"
        width={"100%"}
        style={{ minHeight: 350 }}
      />
    </div>
  );
}
