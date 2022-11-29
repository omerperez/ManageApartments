import { useContext, useState } from "react";
import { StepsLabels } from "../Assets/Create";
import ApartmentPart from "../Components/CreateApartment/ApartmentPart";
import FilesPart from "../Components/CreateApartment/FilesPart";
import StepperForm from "../Components/CreateApartment/Stepper";
import TenantPart from "../Components/CreateApartment/TenantPart";
import { AuthContext } from "../Contexts/AuthContext";
import "../Layout/CSS/Create.css";

export default function Create() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const { state } = useContext(AuthContext);

  const FormSectionsFlow = [<ApartmentPart />, <TenantPart />, <FilesPart />];
  return (
    <div className="create-form-layout">
      <h1>
        {state.language === "en" ? "Create Apartment Form" : "יצירת דירה חדשה"}
      </h1>
      <div className="mt-5">
        <StepperForm
          steps={StepsLabels}
          children={FormSectionsFlow[activeStep]}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </div>
    </div>
  );
}
