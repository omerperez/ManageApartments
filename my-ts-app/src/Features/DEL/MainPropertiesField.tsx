import React from "react";
import { Button } from "@mui/material";
import { mainApartmentProperties } from "../../Assets/Profile";

export default function MainPropertiesField() {
  return (
    <div className="h-100 m-2">
      {mainApartmentProperties.map((prop, key) => {
        return (
          <Button
            disabled
            className={`${prop.style} body-card-design mb-3 h-25 mw-100`}
            variant="outlined"
            key={`homepage-btn${key}`}
          >
            <div className="row d-flex justify-content-center">
              <div className="col-5">{prop.icon}</div>
            </div>
          </Button>
        );
      })}
    </div>
  );
}
