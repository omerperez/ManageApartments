import { useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import { Tenant } from "../../Data/interfaces/entities/Tenant.entity";
import { AuthContextType } from "../../Data/types/Auth";
import DialogActionButtons from "../Global/DialogActionButtons";

interface RemoveTenantProps {
  tenant: Tenant;
  onCancel: () => void;
}
export default function RemoveTenant({ tenant, onCancel }: RemoveTenantProps) {
  // Constans
  const REMOVE_TENANT_TEXT = "האם אתה בטוח שברצונך להסיר את הדייר ?";

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { authState } = useContext(AuthContext) as AuthContextType;

  const onSubmit = async () => {
    const apartmentId = searchParams.get("apartmentId") as string;
    const TenantServiceApi = (await import("../../Services/Api/TenantApi"))
      .default;
    TenantServiceApi.changeTenant(authState.mobile, "", apartmentId).then(
      () => {
        // response;
        return navigate(`apartment?apartmentId=${apartmentId}`);
      },
    );
  };

  return (
    <div className="text-center rtl">
      <h2>{REMOVE_TENANT_TEXT}</h2>
      <DialogActionButtons onSubmit={onSubmit} onCancel={onCancel} />
    </div>
  );
}
