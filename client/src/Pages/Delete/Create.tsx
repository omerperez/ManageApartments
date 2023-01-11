import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { StepsLabels } from "../../Assets/Create";
import ApartmentForm from "../../Components/Delete/CreateDelete/CreateForms/ApartmentForm";
import AttachFilesFrom from "../../Components/Delete/CreateDelete/CreateForms/AttachFilesFrom";
import TenantForm from "../../Components/Delete/CreateDelete/CreateForms/TenantForm";
import Stepper from "../../Components/Delete/CreateDelete/Stepper/Stepper";
import { AuthContext } from "../../Contexts/AuthContext";
import {
  IApartmentCreateForm,
  IApartmentServerCreateRequest,
  IAttachFileForm,
  ITenantCreateForm,
} from "../../Data/interfaces/Form.interface";
import { AuthContextType } from "../../Data/types/Auth";
import "../Layout/CSS/Create.css";
import Loading from "../../Layout/Loading";
import { createApartmentRequest } from "../../Services/Api/ApartmentApi";

export default function Create() {
  const { authState } = useContext(AuthContext) as AuthContextType;
  const [activeStep, setActiveStep] = useState<number>(0);
  const [newApartment, setNewApartment] = useState<IApartmentCreateForm | null>(
    null,
  );
  const [newTenant, setNewTenant] = useState<ITenantCreateForm | null>(null);
  const [files, setFiles] = useState<IAttachFileForm | null>(null);

  const forms = [
    <ApartmentForm
      newApartment={newApartment}
      setActiveStep={setActiveStep}
      setNewApartment={setNewApartment}
    />,
    <TenantForm
      newTenant={newTenant}
      setNewTenant={setNewTenant}
      setActiveStep={setActiveStep}
    />,
    <AttachFilesFrom
      files={files}
      setFiles={setFiles}
      setActiveStep={setActiveStep}
    />,
    <Loading />,
  ];

  const handleSubmit = () => {
    if (newApartment && newTenant && files) {
      console.log("here!!");
      const apartment: IApartmentServerCreateRequest = {
        ...newApartment,
        mainImageIndex: files.mainImageIndex,
        currentTenantId: newTenant.id,
        managerId: authState.mobile,
      };
      createApartmentRequest(
        apartment,
        newTenant,
        files.images,
        files.images[0],
        // files.agreement ??
      ).then((res) => {
        console.log("res");
        console.log(res);
      });
    }
  };

  useEffect(() => {
    if (activeStep === 3) {
      handleSubmit();
    }
  }, [activeStep]);

  const handleSubmitStep = 3;
  if (activeStep === handleSubmitStep) {
    handleSubmit();
    return <Loading />;
  }

  return (
    <div className="create-form-layout">
      <Grid container className="create-grid-layout">
        <Grid item sm={2}>
          <Stepper steps={StepsLabels} activeStep={activeStep} />
        </Grid>
        <Grid item sm={10} className="padding-creates-form">
          {forms[activeStep]}
        </Grid>
      </Grid>
    </div>
  );
}
