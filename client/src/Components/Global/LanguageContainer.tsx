import { useContext, ReactNode } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { AuthContextType } from "../../Data/types/Auth";

interface LanguageContainerProps {
  children: ReactNode;
  heClassName?: string;
  enClassName?: string;
}

export default function LanguageContainer({
  children,
  heClassName,
  enClassName,
}: LanguageContainerProps) {
  const { authState } = useContext(AuthContext) as AuthContextType;
  return (
    <div className={authState.language === "he" ? heClassName : enClassName}>
      {children}
    </div>
  );
}
