import { Close } from "@mui/icons-material";
import { DialogTitle, Grid, IconButton } from "@mui/material";

interface GenericDialogTitleProps {
  title?: string;
  isShowCloseButton?: boolean;
  handleClose: () => void;
}
export default function GenericDialogTitle({
  title,
  isShowCloseButton,
  handleClose,
}: GenericDialogTitleProps) {
  if (title) {
    return (
      <DialogTitle>
        <Grid container>
          <Grid
            item
            xs={isShowCloseButton ? 10 : 12}
            md={isShowCloseButton ? 11 : 12}
          >
            <h2 className="dialog-title">{title}</h2>
          </Grid>
          {isShowCloseButton && (
            <Grid item xs={2} md={1}>
              <div className="text-end">
                <IconButton aria-label="close" onClick={handleClose}>
                  <Close className="dialog-close-btn-top" />
                </IconButton>
              </div>
            </Grid>
          )}
        </Grid>
      </DialogTitle>
    );
  }
  return null;
}
