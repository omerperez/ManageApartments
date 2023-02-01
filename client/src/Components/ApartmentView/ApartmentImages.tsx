import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import useMobieDesign from "../../Hooks/useMobile";
import { useError403 } from "../../Services/Utils/useError403";
import ApartmentMobileImages from "../Global/Mobile/Images/ApartmentMobileImages";

// Constans
const APARTMENT_DETAILS_TITLE = "פרטי הדירה";

interface ApartmentImagesProps {
  mainImageIndex: number;
  images: string[];
}

export default function ApartmentImages({
  mainImageIndex,
  images,
}: ApartmentImagesProps) {
  const isMobileScreen = useMobieDesign();
  const [mainImage, setMainImage] = useState<string>("");
  const [sideImages, setSideImages] = useState<string[]>([]);

  useEffect(() => {
    setMainImage(images[mainImageIndex]);
    const otherImages = images.filter((img) => img !== images[mainImageIndex]);
    setSideImages(otherImages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isMobileScreen) {
    return (
      <ApartmentMobileImages
        title={APARTMENT_DETAILS_TITLE}
        images={images}
        mainImageIndex={mainImageIndex}
      />
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
