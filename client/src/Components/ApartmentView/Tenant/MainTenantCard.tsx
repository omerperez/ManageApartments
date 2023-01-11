import { Card, CardContent, Grid } from "@mui/material";
import { tenantContentCardProperties } from "../../../Assets/Profile";
import { ITenant } from "../../../Data/interfaces/ITenant";
import TenantActionsCard from "./TenantCard/TenantActionsCard";
import TopTenantCard from "./TenantCard/TopTenantCard";

interface MainTenantCardProps {
  tenant?: ITenant;
}
export default function MainTenantCard({ tenant }: MainTenantCardProps) {
  const getTenantCardValue = (key: string, tenant?: ITenant) => {
    if (key === "Occupancy Period") {
      return tenant ? `${tenant.startDate} - ${tenant.endDate}` : "הדירה פנויה";
    }
    return tenant ? tenant[key as keyof ITenant] : "-";
  };

  return (
    <Card className="tenant-card">
      <TopTenantCard
        firstName={tenant?.firstName}
        lastName={tenant?.lastName}
        gender={tenant?.gender}
      />
      <CardContent className="tenant-card-content">
        <Grid container>
          {tenantContentCardProperties.map((property, key) => (
            <Grid item sm={property.gridSize} key={`td-lbls-${key}`}>
              <div className="apartment-details-others-label">
                {property.he_label}
              </div>
              <div className="apartment-details-others-value">
                {getTenantCardValue(property.key, tenant)}
              </div>
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <TenantActionsCard />
    </Card>
  );
}
