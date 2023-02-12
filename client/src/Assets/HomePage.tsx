import {
  AttachMoney,
  HolidayVillage,
  ReplyAll,
  RequestPage,
} from "@mui/icons-material";
import { ITopDashboardCard } from "../Data/interfaces/IHome";
import { MuiCardIcon } from "../Layout/Mui/Home";

const topDashboardTitles: ITopDashboardCard[] = [
  {
    he_title: "דירות זמינות",
    en_title: "Available Apartments",
    backgroundColor: "bg-yellow",
    icon: <ReplyAll sx={{ ...{ color: "#FFB64D" }, ...MuiCardIcon }} />,
    objectKey: "availability",
  },
  {
    he_title: "הכנסות",
    en_title: "Revenues",
    backgroundColor: "bg-blue",
    icon: <AttachMoney sx={{ ...{ color: "#4099FF" }, ...MuiCardIcon }} />,
    objectKey: "revenues",
  },
  {
    he_title: "כמות דירות",
    en_title: "Total Apartments",
    backgroundColor: "bg-green",
    icon: <HolidayVillage sx={{ ...{ color: "#2DD8B6" }, ...MuiCardIcon }} />,
    objectKey: "count",
  },
  {
    he_title: "חוזים שמסתיים בקרוב",
    en_title: "Contracts ending soon",
    backgroundColor: "bg-red",
    icon: <RequestPage sx={{ ...{ color: "#FF5370" }, ...MuiCardIcon }} />,
    objectKey: "expiringContractscount",
  },
];

export { topDashboardTitles };
