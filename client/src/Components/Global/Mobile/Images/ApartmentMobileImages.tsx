import { Button, Grid } from "@mui/material";
import { ChangeEvent, useState } from "react";
import Carousel from "./ImagesCarousel/Carousel";
import ImagesMobileList from "./ImagesMobileList";

// Constans
const CHANGE_VIEW = "שינוי תצוגה";
const APARTMENT_DETAILS_TITLE = "פרטי הדירה";

interface ApartmentMobileImagesProps {
  title?: string;
  images: (string | File)[];
  mainImageIndex: number;
  onClickRemove?: (index: number) => void;
  onChangeMainImage?: (index: number) => void;
  onAddNewImage?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function ApartmentMobileImages({
  title,
  images,
  mainImageIndex,
  onClickRemove,
  onChangeMainImage,
  onAddNewImage,
}: ApartmentMobileImagesProps) {
  const [isCarouselView, setIsCarouselView] = useState<boolean>(true);

  const changeApartmentMainImagesIndexOnRemove = (index: number) => {
    if (onChangeMainImage) {
      if (index === mainImageIndex || mainImageIndex === 0) {
        onChangeMainImage(0);
      } else {
        onChangeMainImage(mainImageIndex - 1);
      }
    }
  };

  const onHandleClickRemove = (imageIndex: number) => {
    if (onClickRemove) {
      changeApartmentMainImagesIndexOnRemove(imageIndex);
      onClickRemove(imageIndex);
    }
  };

  const onHandleClickChangeView = () => {
    setIsCarouselView((prevState) => !prevState);
  };

  return (
    // <>
    //   <div className="mb-2">
    //     <ChangeImagesViewBtn
    //       onHandleClickChange={() => {
    //         setIsCarouselView((prevState) => !prevState);
    //       }}
    //       isCarouselView={isCarouselView}
    //     />
    //   </div>
    <Grid container>
      <Grid item xs={6}>
        {title ?? APARTMENT_DETAILS_TITLE}
      </Grid>
      <Grid item textAlign="center" className="mb-2" xs={6}>
        <Button
          fullWidth
          variant="outlined"
          className="change-images-view"
          component="label"
          onClick={() => setIsCarouselView((prevState) => !prevState)}
        >
          {CHANGE_VIEW}
        </Button>
      </Grid>
      {isCarouselView ? (
        <Carousel
          images={images}
          mainImageIndex={mainImageIndex}
          onRemoveImage={onHandleClickRemove}
          onChangeMainImage={onChangeMainImage}
          onAddNewImage={onAddNewImage}
          onHandleClickChangeView={onHandleClickChangeView}
        />
      ) : (
        <ImagesMobileList
          images={images}
          mainImageIndex={mainImageIndex}
          onClickRemove={onClickRemove}
          onChangeMainImage={onChangeMainImage}
          onAddNewImage={onAddNewImage}
        />
      )}
    </Grid>
  );
}
