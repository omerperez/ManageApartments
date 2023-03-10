import { Grid } from "@mui/material";
import { ChangeEvent, useState } from "react";
import CounterImagesCarousel from "./CounterImagesCarousel";
import ImagesCarouselNavigation from "./ImagesCarouselNavigation";
import ImagesCarouselView from "./ImagesCarouselView";

interface CarouselProps {
  images: (string | File)[];
  mainImageIndex: number;
  onRemoveImage?: (index: number) => void;
  onChangeMainImage?: (index: number) => void;
  onAddNewImage?: (event: ChangeEvent<HTMLInputElement>) => void;
  onHandleClickChangeView?: () => void;
}

export default function Carousel({
  images,
  mainImageIndex,
  onRemoveImage,
  onChangeMainImage,
  onAddNewImage,
  onHandleClickChangeView,
}: CarouselProps) {
  const [currentImage, setCurrentImage] = useState<number>(mainImageIndex);

  const chagneCarouselCurrentImageIndexOnRemove = (
    index: number,
    imagesLength: number,
  ) => {
    if (index !== 0 && imagesLength !== 0) {
      setCurrentImage((prevState) => prevState - 1);
    }
  };

  const onHandleClickRemove = (imageIndex: number) => {
    if (onRemoveImage) {
      onRemoveImage(imageIndex);
      chagneCarouselCurrentImageIndexOnRemove(imageIndex, images.length);
    }
  };

  const handleClickNext = () => {
    let nextIndex = currentImage + 1;
    if (currentImage === images.length - 1) {
      nextIndex = 0;
    }
    setCurrentImage(nextIndex);
  };

  const handleClickBack = () => {
    let prevIndex = currentImage - 1;
    if (currentImage === 0) {
      prevIndex = images.length - 1;
    }
    setCurrentImage(prevIndex);
  };

  return (
    <Grid container sx={{ maxWidth: "100%" }}>
      <ImagesCarouselView
        images={images}
        mainCaruselImageIndex={currentImage}
        mainImageIndex={mainImageIndex}
        onChangeCurrentImage={(index: number) => setCurrentImage(index)}
        onChangeMainImage={onChangeMainImage}
        handleClickRemove={onRemoveImage ? onHandleClickRemove : undefined}
      />
      <CounterImagesCarousel images={images} currentImageIndex={currentImage} />
      <ImagesCarouselNavigation
        handleClickNext={handleClickNext}
        handleClickPrev={handleClickBack}
        addFiles={onAddNewImage}
        onHandleClickChange={onHandleClickChangeView}
      />
    </Grid>
  );
}
