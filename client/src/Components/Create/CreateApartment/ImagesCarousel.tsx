import { Button, Grid } from "@mui/material";
import { ChangeEvent, useCallback, useState } from "react";
import { useError403 } from "../../../Services/Utils/useError403";
import ImagesCarouselActions from "./ImagesCarouselActions";

interface ImagesCarouselProps {
  images: File[];
  onChangeMainImage: (index: number) => void;
  mainImageIndex: number;
  addFiles: (event: ChangeEvent<HTMLInputElement>) => void;
  removeImage: (removeImage: File) => void;
}

// Need to export
const readFile = (image: File) => {
  return URL.createObjectURL(image);
};

export default function ImagesCarousel({
  images,
  onChangeMainImage,
  mainImageIndex,
  addFiles,
  removeImage,
}: ImagesCarouselProps) {
  const [currentImage, setCurrentImage] = useState<number>(mainImageIndex);

  const getPrevImage = () => {
    if (currentImage !== 0) {
      return currentImage - 1;
    }
    return images.length - 1;
  };

  const getNextImage = () => {
    if (currentImage !== images.length - 1) {
      return currentImage + 1;
    }
    return 0;
  };

  const handleClickNext = useCallback(() => {
    const nextIndex = getNextImage();
    setCurrentImage(nextIndex);
  }, [currentImage, images]);

  const handleClickPrev = useCallback(() => {
    const nextIndex = getPrevImage();
    setCurrentImage(nextIndex);
  }, [currentImage, images]);

  if (images.length === 0) {
    return null;
  }

  const handleClickRemove = () => {
    setCurrentImage((prevState) => (prevState > 0 ? prevState - 1 : 0));
    removeImage(images[currentImage]);
  };

  const mainImage = (
    <div className="relative">
      <img
        onClick={() => onChangeMainImage(currentImage)}
        src={readFile(images[currentImage])}
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
          הסרה
        </Button>
      </div>
    </div>
  );

  if (images.length === 1) {
    return (
      <>
        {mainImage}
        <ImagesCarouselActions
          handleClickNext={handleClickNext}
          handleClickPrev={handleClickPrev}
          addFiles={addFiles}
        />
      </>
    );
  }

  return (
    <Grid container>
      <Grid item xs={2}>
        <img
          src={readFile(images[getPrevImage()])}
          alt={`preview-img-${currentImage}`}
          width={"100%"}
          className={`prev-image-carousel ${
            mainImageIndex === getPrevImage() ? "active-image-carousel" : ""
          }`}
          onClick={() => setCurrentImage(getPrevImage())}
        />
      </Grid>
      <Grid item xs={8}>
        {mainImage}
      </Grid>
      <Grid item xs={2}>
        <img
          src={readFile(images[getNextImage()])}
          alt={`preview-img-${getNextImage()}`}
          width={"100%"}
          className={`next-image-carousel ${
            mainImageIndex === getNextImage() ? "active-image-carousel" : ""
          }`}
          onClick={() => setCurrentImage(getNextImage())}
        />
      </Grid>
      <ImagesCarouselActions
        handleClickNext={handleClickNext}
        handleClickPrev={handleClickPrev}
        addFiles={addFiles}
      />
    </Grid>
  );
}
