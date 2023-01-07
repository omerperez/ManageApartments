import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { StepsLabels } from "../Assets/Create";
import ApartmentForm from "../Components/Create/CreateForms/ApartmentForm";
import AttachFilesFrom from "../Components/Create/CreateForms/AttachFilesFrom";
import TenantForm from "../Components/Create/CreateForms/TenantForm";
import Stepper from "../Components/Create/Stepper/Stepper";
import AttachImages from "../Components/CreateApartment/AttachImages";
import CreateApartmentForm from "../Components/CreateApartment/Form";
import CreateTenantForm from "../Components/CreateTenant/Form";
import { AuthContext } from "../Contexts/AuthContext";
import { CreateApartmentDto } from "../Data/interfaces/dto/CreateApartmentDto";
import {
  IApartmentCreateForm,
  IApartmentServerCreateRequest,
  IAttachFileForm,
  ITenantCreateForm,
} from "../Data/interfaces/Form.interface";
import { AuthContextType } from "../Data/types/Auth";
import "../Layout/CSS/Create.css";
import Loading from "../Layout/Loading";
import {
  createApartmentRequest,
  createApartment,
} from "../Services/Api/ApartmentApi";

export default function Create() {
  const { authState } = useContext(AuthContext) as AuthContextType;
  // const [activeStep, setActiveStep] = useState<number>(0);
  // const [newApartment, setNewApartment] = useState<IApartmentCreateForm | null>(
  //   null,
  // );
  // const [newTenant, setNewTenant] = useState<ITenantCreateForm | null>(null);
  // const [files, setFiles] = useState<IAttachFileForm | null>(null);
  const [step, setStep] = useState<number>(0);
  const [apartmentImages, setApartmentImages] = useState<File[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [tenant, setTenant] = useState<ITenantCreateForm | null>(null);
  const [apartmentDetails, setApartmentDetails] =
    useState<CreateApartmentDto | null>(null);

  // const forms = [
  //   <ApartmentForm
  //     newApartment={newApartment}
  //     setActiveStep={setActiveStep}
  //     setNewApartment={setNewApartment}
  //   />,
  //   <TenantForm
  //     newTenant={newTenant}
  //     setNewTenant={setNewTenant}
  //     setActiveStep={setActiveStep}
  //   />,
  //   <AttachFilesFrom
  //     files={files}
  //     setFiles={setFiles}
  //     setActiveStep={setActiveStep}
  //   />,
  //   <Loading />,
  // ];

  // const handleSubmit = () => {
  //   if (newApartment && newTenant && files) {
  //     console.log("here!!");
  //     const apartment: IApartmentServerCreateRequest = {
  //       ...newApartment,
  //       mainImageIndex: files.mainImageIndex,
  //       currentTenantId: newTenant.id,
  //       managerId: authState.mobile,
  //     };
  //     createApartmentRequest(
  //       apartment,
  //       newTenant,
  //       files.images,
  //       files.images[0],
  //       // files.agreement ??
  //     ).then((res) => {
  //       console.log("res");
  //       console.log(res);
  //     });
  //   }
  // };

  useEffect(() => {
    if (step === 2) {
      setLoading(true);
      const createNewApartment = async () => {
        if (apartmentDetails) {
          const apartmentDetailsObject = {
            ...apartmentDetails,
            owner: "0522520484",
            mainImageIndex: mainImageIndex,
          } as CreateApartmentDto;
          const response = await createApartment(
            apartmentDetailsObject,
            apartmentImages,
          );
          console.log(response);
        }
        setLoading(false);
        setStep(3);
      };
      createNewApartment();
    }
  }, [step]);

  if (loading) {
    return <Loading text="יוצר דירה אנא המתן" />;
  }
  // useEffect(() => {
  //   if (activeStep === 3) {
  //     handleSubmit();
  //   }
  // }, [activeStep]);

  // const handleSubmitStep = 3;
  // if (activeStep === handleSubmitStep) {
  //   handleSubmit();
  //   return <Loading />;
  // }

  return (
    <div className="create-form-layout">
      {step === 0 ? (
        <CreateApartmentForm
          setApartmentDetails={setApartmentDetails}
          setStep={setStep}
        />
      ) : step === 1 ? (
        <AttachImages
          setStep={setStep}
          setApartmentImages={setApartmentImages}
          setMainImageIndex={setMainImageIndex}
        />
      ) : step === 3 ? (
        <CreateTenantForm setNewTenant={setTenant} />
      ) : (
        <Button onClick={() => setStep(1)}>Back</Button>
      )}
      {/* <Grid container className="create-grid-layout">
        <Grid item sm={2}>
          <Stepper steps={StepsLabels} activeStep={activeStep} />
        </Grid>
        <Grid item sm={10} className="padding-creates-form">
          {forms[activeStep]}
        </Grid>
      </Grid> */}
    </div>
  );
}
