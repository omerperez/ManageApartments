import { HighlightOff } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import { ChangeEvent } from "react";
import Image from "./Image";

// Constans
const MAIN_IMAGE = "תמונה ראשית";

interface ImagesMobileListProps {
  images: (string | File)[];
  mainImageIndex: number;
  onClickRemove?: (index: number) => void;
  onChangeMainImage?: (index: number) => void;
  onAddNewImage?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function ImagesMobileList({
  images,
  mainImageIndex,
  onClickRemove,
  onChangeMainImage,
  onAddNewImage,
}: ImagesMobileListProps) {
  return (
    <>
      {!onClickRemove && (
        <Grid item xs={12} className="mb-2" key={`mobile-img-main`}>
          <Image
            src={images[mainImageIndex]}
            alt="main"
            className={"user-image"}
          />
        </Grid>
      )}
      {images.map(
        (img, index) =>
          index !== mainImageIndex && (
            <Grid item xs={12} className="mb-2" key={`mobile-img-${index}`}>
              <div className={onClickRemove ? "relative" : ""}>
                <Image
                  src={img}
                  alt="main"
                  className={
                    index === mainImageIndex
                      ? "user-active-image"
                      : "user-image"
                  }
                  onClick={() => onChangeMainImage && onChangeMainImage(index)}
                />
                {onClickRemove && (
                  <div className="remove-pos">
                    <IconButton
                      onClick={() => onClickRemove && onClickRemove(index)}
                      size="large"
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <HighlightOff fontSize="large" className="remove-icon" />
                    </IconButton>
                  </div>
                )}
              </div>
              {mainImageIndex === index && (
                <h4 className="active-image-text">{MAIN_IMAGE}</h4>
              )}
            </Grid>
          ),
      )}
    </>
  );
}
