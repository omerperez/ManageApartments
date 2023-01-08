import { Grid } from "@mui/material";
import { ReactNode } from "react";
import FormButtons from "../Components/Edit/EditButtons";

interface CreateFormLayoutProps {
  title: string;
  children: ReactNode;
  secondPart: JSX.Element;
  saveBtnText?: string;
  cancelBtnText?: string;
  onSubmit: () => void;
  onCancel: () => void;
}
export default function CreateFormLayout({
  title,
  children,
  secondPart,
  saveBtnText,
  cancelBtnText,
  onSubmit,
  onCancel,
}: CreateFormLayoutProps) {
  return (
    <div className="edit-form">
      <div className="sub-page-title">{title}</div>
      <Grid container spacing={1.5}>
        <Grid item sm={8}>
          {children}
        </Grid>
        <Grid item sm={4}>
          {secondPart}
        </Grid>
      </Grid>
      <div className="mt-2">
        <FormButtons
          saveText={saveBtnText}
          cancelText={cancelBtnText}
          onSave={onSubmit}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}
