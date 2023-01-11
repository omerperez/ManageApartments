import { Grid } from "@mui/material";
import { useError403 } from "../../../Services/Utils/useError403";

type GalleryProps = {
  images: string[];
  mainImageIndex: number;
};

export default function Gallery({ images, mainImageIndex }: GalleryProps) {
  return (
    <Grid container spacing={1}>
      <Grid item sm={9} xl={9}>
        <img
          className="img-style"
          src={images[mainImageIndex ?? 0]}
          alt="main-apartment"
        />
      </Grid>
      <Grid item sm={3} lg={2.5} xl={3} className="w-100">
        <div style={{ overflow: "auto", maxHeight: "600px" }}>
          {images &&
            images.map(
              (img, index) =>
                index !== 0 && (
                  <img
                    className="images-gallery"
                    src={img}
                    key={`images-gallery-${index}`}
                    alt={`car-${index}`}
                    onError={useError403}
                  />
                ),
            )}
        </div>
      </Grid>
    </Grid>
  );
}
