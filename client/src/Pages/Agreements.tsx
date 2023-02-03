import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { AuthContextType } from "../Data/types/Auth";
import Loading from "../Layout/Loading";

export default function AgreementsPage() {
  const { authState, setLoading } = useContext(AuthContext) as AuthContextType;
  const [agreementsData, setAgreementsData] = useState<
    {
      name: string;
      agreements: string[];
      currentAgreement: string;
    }[][]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const tenantApiService = await import("../Services/Api/TenantApi");
        const data = await tenantApiService.default.getAgreementsData(
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
      {agreementsData.map((tenant) =>
        tenant.map((data) => (
          <iframe
            src={`${data.currentAgreement}`}
            title={`user-doc`}
            width="100%"
            height="500px"
            className="user-image"
          />
        )),
      )}
    </div>
  );
}
