import { useContext, ReactNode } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

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
  const { state } = useContext(AuthContext);
  return (
    <div className={state.language === "he" ? heClassName : enClassName}>
      {children}
    </div>
  );
}
