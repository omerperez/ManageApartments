import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Button, Grid, IconButton } from "@mui/material";
import { ChangeEvent } from "react";

interface ImagesCarouselActionsProps {
  handleClickNext: () => void;
  handleClickPrev: () => void;
  addFiles: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function ImagesCarouselActions({
  handleClickNext,
  handleClickPrev,
  addFiles,
}: ImagesCarouselActionsProps) {
  //   Constans
  const ADD_IMAGE_BTN = "הוסף תמונות";
  return (
    <Grid container className="carousel-action-btns">
      <Grid item xs={3}>
        <IconButton onClick={handleClickNext}>
          <ArrowForwardIos className="carousel-btn-icon" />
        </IconButton>
      </Grid>
      <Grid item xs={6}>
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
      </Grid>
      <Grid item xs={3} textAlign="end">
        <IconButton onClick={handleClickPrev}>
          <ArrowBackIos className="carousel-btn-icon" />
        </IconButton>
      </Grid>
    </Grid>
  );
}
