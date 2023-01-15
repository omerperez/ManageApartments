import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

interface ApartmentImagesProps {
  mainImageIndex: number;
  images: string[];
}

export default function ApartmentImages({
  mainImageIndex,
  images,
}: ApartmentImagesProps) {
  const [mainImage, setMainImage] = useState<string>("");
  const [sideImages, setSideImages] = useState<string[]>([]);

  useEffect(() => {
    setMainImage(images[mainImageIndex]);
    images.splice(mainImageIndex, 1);
    setSideImages(images);
  }, []);

  return (
    <Grid container>
      <Grid item sm={9}>
        <img src={mainImage} className="main-image" alt="main" />
      </Grid>
      <Grid item sm={3} className="grid-side-images">
        {sideImages.map((src, key) => (
          <div key={`apartment_image_${key}`}>
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
