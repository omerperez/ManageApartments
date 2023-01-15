import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import { Tenant } from "../../Data/interfaces/entities/Tenant.entity";
import { AuthContextType } from "../../Data/types/Auth";
import Loading from "../../Layout/Loading";
import DialogActionButtons from "../Global/DialogActionButtons";

interface RemoveTenantProps {
  tenant: Tenant;
  onCancel: () => void;
}
export default function RemoveTenant({ tenant, onCancel }: RemoveTenantProps) {
  // Constans
  const REMOVE_TENANT_TEXT = "האם אתה בטוח שברצונך להסיר את הדייר ?";

  const [searchParams] = useSearchParams();
  const { authState, setLoading } = useContext(AuthContext) as AuthContextType;
  const [editLoading, setEditLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    setEditLoading(true);
    const apartmentId = searchParams.get("apartmentId") as string;
    const TenantServiceApi = (await import("../../Services/Api/TenantApi"))
      .default;
    TenantServiceApi.changeTenant(authState.mobile, "", apartmentId).then(
      () => {
        setEditLoading(false);
        setLoading(true);
      },
    );
  };

  if (editLoading) {
    return <Loading text={"מסיר דייר..."} />;
  }

  return (
    <div className="text-center rtl">
      <h2>{REMOVE_TENANT_TEXT}</h2>
      <DialogActionButtons onSubmit={onSubmit} onCancel={onCancel} />
    </div>
  );
}
