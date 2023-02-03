import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { AuthContextType } from "../Data/types/Auth";
import Loading from "../Layout/Loading";
import TenantApiService from "../Services/Api/TenantApi";
import { FolderShared } from "@mui/icons-material";
import { Grid } from "@mui/material";
import DocumentCard from "../Components/Documents/DocumentCard";

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
        // console.log(JSON.parse(data));
        setAgreementsData(data);
      } catch (error) {
        setAgreementsData([]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (authState.loading) {
    return <Loading />;
  }

  //   if (agreementsData.length === 0) return null;

  return (
    <div style={{ padding: 50 }}>
      <h1>המסמכים שלי</h1>
      <Grid container spacing={4}>
        {agreementsData.map((tenant) => (
          <Grid item xs={12} sm={2} marginTop={2}>
            <DocumentCard documentsCount={tenant.agreementsCount} {...tenant} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
