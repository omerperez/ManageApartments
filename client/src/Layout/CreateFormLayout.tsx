import { Grid } from "@mui/material";
import { forwardRef, ReactNode, Ref } from "react";
import FormButtons from "../Components/Delete/Edit/EditButtons";

interface CreateFormLayoutProps {
  title: string;
  children: ReactNode;
  secondPart: JSX.Element;
  saveBtnText?: string;
  cancelBtnText?: string;
  onSubmit: () => void;
  onCancel: () => void;
}
function CreateFormLayout(
  {
    title,
    children,
    secondPart,
    saveBtnText,
    cancelBtnText,
    onSubmit,
    onCancel,
  }: CreateFormLayoutProps,
  ref: Ref<HTMLDivElement>,
) {
  return (
    <div className="edit-form" ref={ref} id="scroll">
      <div className="sub-page-title">{title}</div>
      <Grid container spacing={1.5}>
        <Grid item xs={12} sm={8}>
          {children}
        </Grid>
        <Grid xs={12} item sm={4}>
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

const CreateFormLayoutRef = forwardRef(CreateFormLayout);

export default CreateFormLayoutRef;
