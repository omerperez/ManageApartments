import { ElectricalServices, LocalDrink } from "@mui/icons-material";
import { StaticCalculatorCard } from "../Data/interfaces/Calculator.interface";
import { MuiCardIcon } from "../Layout/Mui/Home";

const electricCard: StaticCalculatorCard = {
  type: "electric",
  title: "תעריף חשמל נוכחי",
  backgroundColor: "bg-yellow",
  icon: <ElectricalServices sx={{ ...{ color: "#FFB64D" }, ...MuiCardIcon }} />,
};

const waterCard: StaticCalculatorCard = {
  type: "water",
  title: "תעריף מים נוכחי",
  backgroundColor: "bg-blue",
  icon: <LocalDrink sx={{ ...{ color: "#4099FF" }, ...MuiCardIcon }} />,
};

export { electricCard, waterCard };
