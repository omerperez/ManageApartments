import { FolderShared } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

// Constans
const TOTLA = "סה״כ";
const DOCUMENTS = "מסמכים";

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
  const navigate = useNavigate();
  const handleClick = () => {
    return navigate({
      pathname: "/tenant-agreement",
      search: createSearchParams({
        tenantId: id,
      }).toString(),
    });
  };

  return (
    <div className="text-center">
      <div style={{ fontSize: "28px", color: "black" }}>{name}</div>
      <IconButton
        onClick={handleClick}
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
