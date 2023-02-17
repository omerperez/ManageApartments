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
    backgroundColor: "bg-blue",
    icon: <ReplyAll sx={{ ...{ color: "#0080ff" }, ...MuiCardIcon }} />,
    objectKey: "availability",
  },
  {
    he_title: "הכנסות",
    en_title: "Revenues",
    backgroundColor: "bg-green",
    icon: <AttachMoney sx={{ ...{ color: "#15b37a" }, ...MuiCardIcon }} />,
    objectKey: "revenues",
  },
  {
    he_title: "כמות דירות",
    en_title: "Total Apartments",
    backgroundColor: "bg-yellow",
    icon: <HolidayVillage sx={{ ...{ color: "#ff9900" }, ...MuiCardIcon }} />,
    objectKey: "count",
  },
  {
    he_title: "חוזים שמסתיים בקרוב",
    en_title: "Contracts ending soon",
    backgroundColor: "bg-red",
    icon: <RequestPage sx={{ ...{ color: "#e90404" }, ...MuiCardIcon }} />,
    objectKey: "expiringContractscount",
  },
];

export { topDashboardTitles };
