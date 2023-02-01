import { RadioButtonChecked, PanoramaFishEye } from "@mui/icons-material";
import { Grid } from "@mui/material";

interface CounterImagesCarouselProps {
  images: (string | File)[];
  currentImageIndex: number;
}
export default function CounterImagesCarousel({
  images,
  currentImageIndex,
}: CounterImagesCarouselProps) {
  return (
    <Grid item xs={12} textAlign="center">
      {images.map((image, index) =>
        index === currentImageIndex ? (
          <RadioButtonChecked
            color="primary"
            className="circle-index-carousel"
            key={`circle-index-image-location-${index}`}
          />
        ) : (
          <PanoramaFishEye
            color="primary"
            className="circle-index-carousel"
            key={`circle-index-image-location-${index}`}
          />
        ),
      )}
    </Grid>
  );
}
