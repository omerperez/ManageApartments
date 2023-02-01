import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "../Image";

// Constans
const REMOVE_IMAGE = "הסרה";

interface ImagesCarouselViewProps {
  images: (string | File)[];
  mainCaruselImageIndex: number;
  onChangeCurrentImage: (index: number) => void;
  mainImageIndex?: number;
  onChangeMainImage?: (index: number) => void;
  handleClickRemove?: (index: number) => void;
}
export default function ImagesCarouselView({
  images,
  mainCaruselImageIndex,
  onChangeCurrentImage,
  onChangeMainImage,
  mainImageIndex,
  handleClickRemove,
}: ImagesCarouselViewProps) {
  const [prevImageIndex, setPrevImageIndex] = useState<number>(0);
  const [nextImageIndex, setNextImageIndex] = useState<number>(0);

  useEffect(() => {
    let prevIndex = images.length - 1;
    let nextIndex = mainCaruselImageIndex + 1;
    if (mainCaruselImageIndex > 0) {
      prevIndex = mainCaruselImageIndex - 1;
    }
    if (mainCaruselImageIndex >= images.length - 1) {
      nextIndex = 0;
    }
    setNextImageIndex(nextIndex);
    setPrevImageIndex(prevIndex);
  }, [mainCaruselImageIndex, images]);

  const getImageClassName = (index: number, isMainCarousleImage: boolean) => {
    if (mainImageIndex && isMainCarousleImage) {
      return index === mainImageIndex ? "user-active-image" : "user-image";
    }
    if (mainImageIndex && index === mainImageIndex) {
      return "active-image-carousel";
    }
    return "";
  };

  const handleChangeMainImage = (index: number) => {
    if (onChangeMainImage) {
      onChangeMainImage(index);
    }
  };

  if (images.length === 0) {
    return null;
  }

  const mainImage = (
    <div className={handleClickRemove ? "relative" : ""}>
      <Image
        onClick={() => handleChangeMainImage(mainCaruselImageIndex)}
        src={images[mainCaruselImageIndex]}
        alt={`Current-Img-${mainCaruselImageIndex}`}
        height={300}
        width={"100%"}
        className={getImageClassName(mainCaruselImageIndex, true)}
      />
      {handleClickRemove !== undefined ? (
        <div className="remove-image-carousel-pos">
          <Button
            onClick={() => {
              setPrevImageIndex((prevState) =>
                prevState === 0 ? images.length - 1 : prevState - 1,
              );
              handleClickRemove(mainCaruselImageIndex);
            }}
            variant="contained"
            className="remove-btn-carousel"
          >
            {REMOVE_IMAGE}
          </Button>
        </div>
      ) : null}
    </div>
  );

  if (images.length === 1) {
    return mainImage;
  }

  return (
    <>
      <Grid item xs={2}>
        <Image
          src={images[prevImageIndex]}
          alt={`Preview-Img-${prevImageIndex}`}
          width={"100%"}
          className={`prev-image-carousel ${getImageClassName(
            prevImageIndex,
            false,
          )}`}
          onClick={() => onChangeCurrentImage(prevImageIndex)}
        />
      </Grid>
      <Grid item xs={8}>
        {mainImage}
      </Grid>
      <Grid item xs={2}>
        <Image
          src={images[nextImageIndex]}
          alt={`Next-Img-${nextImageIndex}`}
          width={"100%"}
          className={`prev-image-carousel ${getImageClassName(
            nextImageIndex,
            false,
          )}`}
          onClick={() => onChangeCurrentImage(nextImageIndex)}
        />
      </Grid>
    </>
  );
}
