import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { AuthContextType } from "../Data/types/Auth";
import Loading from "../Layout/Loading";
import TenantApiService from "../Services/Api/TenantApi";

export default function TenantDocument() {
  const { authState, setLoading } = useContext(AuthContext) as AuthContextType;
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<
    | {
        id: string;
        firstName: string;
        lastName: string;
        agreement: string[];
        currentAgreement: string;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    const tenantId = searchParams.get("tenantId") as string;
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await TenantApiService.getAgreementsData(tenantId);
        // console.log(JSON.parse(data));
        setData(data);
      } catch (error) {
        setData(undefined);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (authState.loading) {
    return <Loading />;
  }

  if (!data) {
    return null;
  }

  return (
    <div style={{ padding: 50 }}>
      <h1>המסמכים שלי</h1>
      <Grid container spacing={4}>
        {data.agreement.map((src, index) => (
          <Grid
            item
            xs={12}
            sm={2}
            marginTop={2}
            key={`agreemant-tenant-${index}`}
          >
            <iframe
              src={src}
              title={`tenant-agreement`}
              width={"100%"}
              loading="lazy"
              height={380}
              //   className="user-image"
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
