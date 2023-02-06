import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import DocumentCard from "../Components/Documents/DocumentCard";
import { AuthContext } from "../Contexts/AuthContext";
import { AuthContextType } from "../Data/types/Auth";
import Loading from "../Layout/Loading";
import TenantApiService from "../Services/Api/TenantApi";

export default function AgreementsPage() {
  const { authState, setLoading } = useContext(AuthContext) as AuthContextType;
  const [agreementsData, setAgreementsData] = useState<
    {
      id: string;
      name: string;
      agreementsCount: number;
      isActive: boolean;
    }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await TenantApiService.getAgreemntsCountForEactTenant(
          authState.mobile,
        );
        setAgreementsData(data);
      } catch (error) {
        setAgreementsData([]);
      }
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (authState.loading) {
    return <Loading />;
  }

  //   if (agreementsData.length === 0) return null;

  return (
    <div style={{ padding: 50 }}>
      <h1>המסמכים שלי</h1>
      <Grid container spacing={4}>
        {agreementsData.map((tenant, index) => (
          <Grid
            item
            xs={12}
            sm={2}
            marginTop={2}
            key={`agreemant-tenant-${index}`}
          >
            <DocumentCard documentsCount={tenant.agreementsCount} {...tenant} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
