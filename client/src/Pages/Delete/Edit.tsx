import { Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { defaultApartment } from "../../Assets/StaticData";
import ChangeTenant from "../../Components/Edit/EditApartment/ChangeTenant";
import EditApartmentForm from "../../Components/Edit/EditApartment/EditApartment";
import { IApartment } from "../../Data/interfaces/IApartment";
import { ITenant } from "../../Data/interfaces/ITenant";
import "../Layout/CSS/EditApartment.css";
import Loading from "../../Layout/Loading";

export default function EditApartment1() {
  // const { authState,  } = useContext(AuthContext) as AuthContextType;

  const [currentApartment, setCurrentApartment] = useState<IApartment | null>(
    null,
  );
  const [tenant, setTenant] = useState<ITenant | null>(null);

  const [images, setImages] = useState<string[]>([]);
  const [mainImages, setMainImage] = useState<number>(0);
  const [openEditImages, setOpenEditImages] = useState<boolean>(false);
  const [openEditTenant, setOpenEditTenant] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = () => {
      setCurrentApartment(defaultApartment);
      setImages(defaultApartment.images);
      setMainImage(defaultApartment.mainImageIndex);
      setLoading(false);
    };
    fetchData();
  }, []);

  const title = "עריכת דירה";

  if (loading || !currentApartment) {
    return <Loading />;
  }

  return (
    <div className="create-form-layout">
      <div className="edit-form">
        <Grid container spacing={1.5}>
          <Grid item sm={8} className="sub-page-title">
            {title}
          </Grid>
          <Grid item sm={4}>
            <Stack direction={"row"} justifyContent={"flex-end"}>
              {/* <EditImages
                prevImages={currentApartment.images}
                images={images}
                setImages={setImages}
                mainImageIndex={mainImages}
                setMainImageIndex={setMainImage}
                open={openEditImages}
                setOpen={setOpenEditImages}
              /> */}
              <ChangeTenant
                editTenant={tenant}
                apartmentId={currentApartment.name} //change to id
                open={openEditTenant}
                setOpen={setOpenEditTenant}
              />
            </Stack>
          </Grid>
        </Grid>
        <EditApartmentForm editApartment={currentApartment} />
      </div>
    </div>
  );
}
