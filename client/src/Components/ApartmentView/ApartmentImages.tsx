import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import useMobieDesign from "../../Hooks/useMobile";
import { useError403 } from "../../Services/Utils/useError403";
import ApartmentImagesCarousel from "./ApartmentImagesCarousel";

interface ApartmentImagesProps {
  mainImageIndex: number;
  images: string[];
}
// Constans
const CHANGE_VIEW = "שינוי תצוגה";
const APARTMENT_DETAILS_TITLE = "פרטי הדירה";

export default function ApartmentImages({
  mainImageIndex,
  images,
}: ApartmentImagesProps) {
  const isMobileScreen = useMobieDesign();
  const [mainImage, setMainImage] = useState<string>("");
  const [sideImages, setSideImages] = useState<string[]>([]);
  const [isCarouselView, setIsCarouselView] = useState<boolean>(true);

  useEffect(() => {
    setMainImage(images[mainImageIndex]);
    images.splice(mainImageIndex, 1);
    setSideImages(images);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isMobileScreen) {
    return isCarouselView ? (
      <ApartmentImagesCarousel
        mainImageIndex={mainImageIndex}
        images={images}
        onHandleClickChange={() => setIsCarouselView(false)}
      />
    ) : (
      <Grid container>
        <Grid item xs={6}>
          {APARTMENT_DETAILS_TITLE}
        </Grid>
        <Grid item textAlign="center" className="mb-2" xs={6}>
          <Button
            fullWidth
            variant="outlined"
            className="change-images-view"
            component="label"
            onClick={() => setIsCarouselView(true)}
          >
            {CHANGE_VIEW}
          </Button>
        </Grid>
        {images.map((img, key) => (
          <Grid item xs={12} className="mb-2" key={`mobile-img-${key}`}>
            <img
              src={img}
              onError={useError403}
              className="main-image"
              alt="main"
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={9}>
        <img
          src={mainImage}
          onError={useError403}
          className="main-image"
          alt="main"
        />
      </Grid>
      <Grid item xs={12} sm={3} className="grid-side-images">
        {sideImages.map((src, key) => (
          <div key={`apartment_image_${key}`}>
            <img
              src={src}
              onError={useError403}
              alt={`apartment_image_${key}`}
              className="side-image"
            />
          </div>
        ))}
      </Grid>
    </Grid>
  );
}
