import { Button, Grid } from "@mui/material";
import { ChangeEvent, useMemo, useState } from "react";
import { useError403 } from "../../Services/Utils/useError403";
import ImagesCarouselActions from "../Create/CreateApartment/ImagesCarouselActions";

// Constans
const REMOVE_IMAGE = "הסרה";

// Need to export
const readFile = (image: File) => {
  return URL.createObjectURL(image);
};

interface EditImagesCarouselProps {
  databaseImages: string[];
  onRemoveDatabaseImage: (image: string) => void;
  mainImageIndex: number;
  onChangeMainImage: (index: number) => void;
  newImages: File[];
  onRemoveNewImage: (image: File) => void;
  addNewImage: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function EditImagesCarousel({
  databaseImages,
  onRemoveDatabaseImage,
  newImages,
  onRemoveNewImage,
  mainImageIndex,
  onChangeMainImage,
  addNewImage,
}: EditImagesCarouselProps) {
  const [currentImage, setCurrentImage] = useState<number>(mainImageIndex);
  const [totalImagesCount, setTotalImagesCount] = useState<number>(
    databaseImages.length + newImages.length,
  );

  useMemo(() => {
    const totalCount = newImages.length + databaseImages.length;
    setTotalImagesCount(totalCount);
  }, [newImages, databaseImages]);

  const getPrevImage = () => {
    if (currentImage !== 0) {
      return currentImage - 1;
    }
    const totalImages = databaseImages.length + newImages.length - 1;
    return totalImages;
  };

  const getImageSrc = (srcImagesType: "next" | "prev") => {
    const index = srcImagesType === "next" ? getNextImage() : getPrevImage();
    if (index < databaseImages.length) {
      return databaseImages[index];
    }
    return readFile(newImages[index - databaseImages.length]);
  };

  const getNextImage = () => {
    if (currentImage !== totalImagesCount - 1) {
      return currentImage + 1;
    }
    return 0;
  };

  const handleClickNext = () => {
    const nextIndex = getNextImage();
    setCurrentImage(nextIndex);
  };

  const handleClickPrev = () => {
    const nextIndex = getPrevImage();
    setCurrentImage(nextIndex);
  };

  if (databaseImages.length === 0 && newImages.length === 0) {
    return null;
  }

  const handleClickRemove = () => {
    const dbImagesLength = databaseImages.length;
    if (currentImage < dbImagesLength) {
      onRemoveDatabaseImage(databaseImages[currentImage]);
    } else {
      const fileIndex = currentImage - dbImagesLength;
      onRemoveNewImage(newImages[fileIndex]);
    }
    if (databaseImages.length === 0 && newImages.length === 0) {
      setCurrentImage(-1);
    } else {
      setCurrentImage(0);
    }
  };

  const mainImage = (
    <div className="relative">
      <img
        onClick={() => onChangeMainImage(currentImage)}
        src={
          currentImage < databaseImages.length
            ? databaseImages[currentImage]
            : readFile(newImages[currentImage - databaseImages.length])
        }
        alt={`preview-img-${currentImage}`}
        height={300}
        width={"100%"}
        onError={useError403}
        className={
          currentImage === mainImageIndex ? "user-active-image" : "user-image"
        }
      />
      <div className="remove-image-carousel-pos">
        <Button
          onClick={handleClickRemove}
          variant="contained"
          className="remove-btn-carousel"
        >
          {REMOVE_IMAGE}
        </Button>
      </div>
    </div>
  );

  if (databaseImages.length + newImages.length === 1) {
    return (
      <>
        {mainImage}
        <ImagesCarouselActions
          handleClickNext={handleClickNext}
          handleClickPrev={handleClickPrev}
          addFiles={addNewImage}
        />
      </>
    );
  }

  return (
    <Grid container>
      <Grid item xs={2}>
        <img
          src={getImageSrc("prev")}
          alt={`preview-img-${currentImage}`}
          width={"100%"}
          className={`prev-image-carousel ${
            mainImageIndex === getPrevImage() ? "active-image-carousel" : ""
          }`}
          onClick={() => setCurrentImage(getPrevImage())}
          onError={useError403}
        />
      </Grid>
      <Grid item xs={8}>
        {mainImage}
      </Grid>
      <Grid item xs={2}>
        <img
          src={getImageSrc("next")}
          alt={`preview-img-${getNextImage()}`}
          width={"100%"}
          className={`next-image-carousel ${
            mainImageIndex === getNextImage() ? "active-image-carousel" : ""
          }`}
          onClick={() => setCurrentImage(getNextImage())}
          onError={useError403}
        />
      </Grid>
      <ImagesCarouselActions
        handleClickNext={handleClickNext}
        handleClickPrev={handleClickPrev}
        addFiles={addNewImage}
      />
    </Grid>
  );
}
