import { Grid } from "@mui/material";
import { ChangeEvent, useState } from "react";
import ImagesCarouselNavigation from "./ImagesCarouselNavigation";
import CounterImagesCarousel from "./CounterImagesCarousel";
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

  const removeImageSrcFromArray = (index: number) => {
    if (onRemoveImage) {
      onRemoveImage(index);
      chagneCarouselCurrentImageIndexOnRemove(index, images.length);
    }

    // const dbImagesLength = databaseImages.length;
    // if (index < dbImagesLength) {
    //   if (onRemoveDatabaseImage) {
    //     onRemoveDatabaseImage(databaseImages[index]);
    //   }
    // } else {
    //   if (onRemoveImageFile) {
    //     const fileIndex = index - dbImagesLength;
    //     onRemoveImageFile(fileImages[fileIndex]);
    //   }
    // }
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
    <Grid container>
      <ImagesCarouselView
        images={images}
        mainCaruselImageIndex={currentImage}
        mainImageIndex={mainImageIndex}
        onChangeCurrentImage={(index: number) => setCurrentImage(index)}
        onChangeMainImage={onChangeMainImage}
        handleClickRemove={onHandleClickRemove}
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
