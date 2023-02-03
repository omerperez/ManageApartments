import { FolderShared } from "@mui/icons-material";
import { Stack, IconButton, Grid } from "@mui/material";
import React from "react";

interface Props {
  id: string;
  name: string;
  documentsCount: number;
  isActive: boolean;
}

const DocumentCard: React.FC<Props> = ({
  id,
  name,
  documentsCount,
  isActive,
}) => {
  const TOTLA = "סה״כ";
  const DOCUMENTS = "מסמכים";

  return (
    <div className="text-center">
      <div style={{ fontSize: "28px", color: "black" }}>{name}</div>
      <IconButton
        color={isActive ? "primary" : "default"}
        sx={{ maxHeight: 155 }}
      >
        <FolderShared sx={{ fontSize: 200 }} />
      </IconButton>
      <div style={{ color: "black", fontSize: "20px" }}>
        <div>{`${TOTLA} ${documentsCount} ${DOCUMENTS}`}</div>
      </div>
    </div>
  );
};

export default DocumentCard;
