import { Close } from "@mui/icons-material";
import { Button, Grid, IconButton } from "@mui/material";
import { forwardRef, ReactNode, Ref } from "react";

// Constans
const SAVE = "שמירה";

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
    <div className="create-form-layout">
      <div className="create-form-postion">
        <div className="form-box">
          <Grid container>
            <Grid item xs={10}>
              <div className="sub-page-title">{title}</div>
            </Grid>
            <Grid item xs={2} textAlign="end">
              <IconButton
                onClick={onCancel}
                color="error"
                className="close-form-btn"
              >
                <Close sx={{ fontSize: 40 }} />
              </IconButton>
            </Grid>
          </Grid>
          <div>{children}</div>
          <div>{secondPart}</div>
          <div className="mt-3 text-end">
            <Button
              variant="contained"
              className="form-btn bg-blue"
              onClick={onSubmit}
            >
              {saveBtnText ?? SAVE}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const CreateFormLayoutRef = forwardRef(CreateFormLayout);

export default CreateFormLayoutRef;
