import { Typography } from "@mui/material";
import { famaleImage, maleImage } from "../../../../Assets/StaticImages";

interface TopTenantCardProps {
  gender?: string;
  firstName?: string;
  lastName?: string;
}
export default function TopTenantCard({
  firstName,
  lastName,
  gender,
}: TopTenantCardProps) {
  return (
    <>
      <div className="text-center mt-3">
        <img
          src={gender && +gender === 2 ? famaleImage : maleImage}
          width={100}
          alt="profile-pic"
          className="profile-img"
        />
      </div>
      <Typography variant="h5" component="div" className="tenant-name">
        {firstName && lastName ? `${firstName} ${lastName}` : "לא קיים דייר"}
      </Typography>
    </>
  );
}
