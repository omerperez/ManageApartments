import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { cloneElement, forwardRef, ReactElement, Ref, useState } from "react";
import GenericDialogTitle from "./GenericDialogTitle";

// MUI
const DialogMui = {
  zIndex: 1200,
  direction: "rtl",
  "& .muirtl-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    maxWidth: 1600,
    width: 1200,
    border: "solid 2px #0080ff",
  },
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    maxWidth: 1600,
    width: 1200,
    border: "solid 2px #0080ff",
  },
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface GenericDialogProps {
  children: JSX.Element;
  content: JSX.Element;
  title?: string;
  onSubmit?: () => boolean;
  onCancel?: () => boolean;
  cancelActionsButtons?: boolean;
  cancelContent?: boolean;
  isShowCloseButton?: boolean;
}

export default function GenericDialog({
  children,
  content,
  title,
  onSubmit,
  onCancel,
  cancelActionsButtons,
  cancelContent,
  isShowCloseButton,
}: GenericDialogProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    if (onSubmit) {
      return setOpen(onSubmit());
    }
    setOpen(false);
  };

  const handleClose = () => {
    if (onCancel) {
      return setOpen(onCancel());
    }
    setOpen(false);
  };

  return (
    <div>
      {cloneElement(children, { onClick: handleClickOpen })}
      <Dialog
        sx={DialogMui}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <GenericDialogTitle
          title={title}
          isShowCloseButton={isShowCloseButton}
          handleClose={handleClose}
        />
        {cancelContent ? content : <DialogContent>{content}</DialogContent>}
        {!cancelActionsButtons && (
          <DialogActions>
            <Button
              fullWidth
              variant="contained"
              onClick={handleClose}
              className="dialog-btn dialog-cancel-btn"
            >
              בטל
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              className="dialog-btn dialog-save-btn"
            >
              שמור
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}
