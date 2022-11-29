import { Grid } from "@mui/material";
import { useError403 } from "../../Services/Utils/useError403";

type GalleryProps = {
  images: string[];
  mainImageIndex: number;
};

export default function Gallery({ images, mainImageIndex }: GalleryProps) {
  return (
    <Grid container spacing={1}>
      <Grid item sm={9.5}>
        <img
          className="img-style"
          src={images[mainImageIndex ?? 0]}
          alt="main-apartment"
        />
      </Grid>
      <Grid item sm={2.5} className="w-100">
        {images &&
          images.map((img, index) =>
            index !== 0 ? (
              <img
                className="images-gallery"
                src={img}
                key={`images-gallery-${index}`}
                alt={`car-${index}`}
                onError={useError403}
              />
            ) : null,
          )}
      </Grid>
    </Grid>
  );
}
