import { Grid } from "@mui/material";

interface ApartmentImagesProps {
  mainImageIndex: number;
  images: string[];
}

export default function ApartmentImages({
  mainImageIndex,
  images,
}: ApartmentImagesProps) {
  const mainImage = images[mainImageIndex];
  images.splice(mainImageIndex, 1);
  return (
    <Grid container>
      <Grid item sm={9} className="grid-main-images">
        <img src={mainImage} className="main-image" alt="main" />
      </Grid>
      <Grid item sm={3} className="grid-side-images">
        {images.map((src, key) => (
          <div>
            <img
              src={src}
              alt={`apartment_image_${key}`}
              className="side-image"
            />
          </div>
        ))}
      </Grid>
    </Grid>
  );
}
