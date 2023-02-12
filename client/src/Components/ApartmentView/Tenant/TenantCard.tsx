import { Card, CardContent, Grid } from "@mui/material";
import { tenantContentCardProperties } from "../../../Assets/Profile";
import { Tenant } from "../../../Data/interfaces/entities/Tenant.entity";
import TenantActionsCard from "./TenantCard/TenantActionsCard";
import TopTenantCard from "./TenantCard/TopTenantCard";

interface TenantCardProps {
  tenant?: Tenant;
  isTenantHistory?: boolean;
  hideActions?: boolean;
}

export default function TenantCard({
  tenant,
  isTenantHistory,
  hideActions,
}: TenantCardProps) {
  const getTenantCardValue = (key: string, tenant?: Tenant) => {
    if (!tenant && key !== "Occupancy Period") return "-";
    if (!tenant) return "הדירה פנויה";
    if (key === "Occupancy Period") {
      return `${tenant.startDate} - ${tenant.endDate}`;
    }
    if (key === "gender") {
      const genders = ["זכר", "נקבה"];
      return genders[+tenant.gender - 1];
    }
    return tenant[key as keyof Tenant];
  };

  return (
    <Card className="tenant-card" sx={{ boxShadow: "none" }}>
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
      {!hideActions && (
        <TenantActionsCard tenant={tenant} isTenantHistory={isTenantHistory} />
      )}
    </Card>
  );
}
