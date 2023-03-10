import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Button, Grid, IconButton } from "@mui/material";
import { ChangeEvent } from "react";

//   Constans
const ADD_IMAGE_BTN = "הוסף תמונות";
const CHANGE_VIEW = "שנה תצוגה";

interface ImagesCarouselNavigationProps {
  handleClickNext: () => void;
  handleClickPrev: () => void;
  addFiles?: (event: ChangeEvent<HTMLInputElement>) => void;
  onHandleClickChange?: () => void;
}

export default function ImagesCarouselNavigation({
  handleClickNext,
  handleClickPrev,
  addFiles,
  onHandleClickChange,
}: ImagesCarouselNavigationProps) {
  const onClickChangeView = () => {
    if (onHandleClickChange) {
      onHandleClickChange();
    }
  };
  return (
    <Grid container className="carousel-action-btns">
      <Grid item xs={3}>
        <IconButton onClick={handleClickPrev}>
          <ArrowForwardIos className="carousel-btn-icon" />
        </IconButton>
      </Grid>
      <Grid item xs={6} textAlign="center">
        {addFiles ? (
          <Button
            aria-label={"add-image-carousel-btn"}
            fullWidth
            variant="contained"
            className="file-btn-carousel"
            component="label"
          >
            {ADD_IMAGE_BTN}
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={addFiles}
            />
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            className="file-btn-carousel"
            component="label"
            onClick={onClickChangeView}
          >
            {CHANGE_VIEW}
          </Button>
        )}
      </Grid>
      <Grid item xs={3} textAlign="end">
        <IconButton onClick={handleClickNext}>
          <ArrowBackIos className="carousel-btn-icon" />
        </IconButton>
      </Grid>
    </Grid>
  );
}
