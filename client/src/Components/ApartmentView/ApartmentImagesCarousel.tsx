import { Grid } from "@mui/material";
import { useState } from "react";
import { useError403 } from "../../Services/Utils/useError403";
import ImagesCarouselActions from "../Create/CreateApartment/ImagesCarouselActions";

interface ApartmentImagesCarouselProps {
  images: string[];
  mainImageIndex: number;
  onHandleClickChange: () => void;
}

export default function ApartmentImagesCarousel({
  images,
  mainImageIndex,
  onHandleClickChange,
}: ApartmentImagesCarouselProps) {
  const [currentImage, setCurrentImage] = useState<number>(
    mainImageIndex < images.length - 1 ? mainImageIndex : 0,
  );

  const getPrevImage = () => {
    if (currentImage > 0) {
      return currentImage - 1;
    }
    return images.length - 1;
  };

  const getNextImage = () => {
    if (currentImage < images.length - 1) {
      return currentImage + 1;
    }
    return 0;
  };

  const handleClickNext = () => {
    setCurrentImage(getNextImage());
  };

  const handleClickPrev = () => {
    setCurrentImage(getPrevImage());
  };

  if (images.length === 0) {
    return null;
  }

  const isSingleImage = images.length === 1;

  return (
    <Grid container>
      {!isSingleImage && (
        <Grid item xs={2}>
          <img
            src={images[getPrevImage()]}
            alt={`preview-img`}
            onError={useError403}
            width={"100%"}
            className="prev-image-carousel"
            onClick={() => setCurrentImage(getPrevImage())}
          />
        </Grid>
      )}
      <Grid item xs={isSingleImage ? 12 : 8}>
        <img
          src={images[currentImage]}
          onError={(event) => console.log(event.target)}
          alt={`main-img-${currentImage}`}
          height={300}
          width={"100%"}
          className={"user-image"}
        />
      </Grid>
      {!isSingleImage && (
        <Grid item xs={2}>
          <img
            src={images[getNextImage()]}
            onError={useError403}
            alt={`next-img`}
            width={"100%"}
            className="next-image-carousel"
            onClick={() => setCurrentImage(getNextImage())}
          />
        </Grid>
      )}
      <ImagesCarouselActions
        handleClickNext={handleClickNext}
        handleClickPrev={handleClickPrev}
        onHandleClickChange={onHandleClickChange}
      />
    </Grid>
  );
}
