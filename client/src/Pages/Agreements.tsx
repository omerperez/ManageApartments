import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { AuthContextType } from "../Data/types/Auth";
import Loading from "../Layout/Loading";
import TenantApiService from "../Services/Api/TenantApi";
import { FolderShared } from "@mui/icons-material";

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
    <div>
      {agreementsData.map((tenant) => (
        <h1>{tenant.name}</h1>
      ))}
    </div>
  );
}
