import { Person } from "@mui/icons-material";
import { Divider, Grid } from "@mui/material";
import { tenantsCardProperties } from "../../Assets/HomePage";
import { Tenant } from "../../Data/builders/Tenant";
import { getDateFormat } from "../../Services/Utils/formats";

type TenantsCardProps = {
  tenants: Tenant[];
  language: string;
};

export default function TenantsCard({ tenants, language }: TenantsCardProps) {
  return (
    <div className="p-2 m-2 tenants-card ">
      <div className="d-flex justify-content-start">
        <div className="fs-4 ml-10 mr-10">
          {tenantsCardProperties[language].mainTitle}
        </div>
        <Person fontSize="large" />
      </div>
      <Divider className="m-3" style={{ background: "black" }} />
      <Grid container className="m-2" spacing={0}>
        {tenants.map((tenant, index) => {
          return (
            <>
              <Grid item xs={9} className="ms-auto">
                <div className={index !== 0 ? "mt-4" : ""}>
                  {/* {tenant.gender === "male" ? (
                    <img
                      src={maleImage}
                      width={50}
                      className="ml-10 mr-10"
                      alt="male"
                    />
                  ) : (
                    <img src={famaleImage} alt="female" />
                  )}
                  <span>{`${tenant.firstName} ${tenant.lastName}`}</span> */}
                </div>
              </Grid>
              <Grid item xs={3} className="m-auto white-space">
                <span>{`${
                  tenantsCardProperties[language].finishContact
                } ${getDateFormat(tenant.startDate)}`}</span>
              </Grid>
            </>
          );
        })}
      </Grid>
    </div>
  );
}
