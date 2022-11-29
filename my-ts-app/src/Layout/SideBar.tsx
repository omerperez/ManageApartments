import { Divider, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { bodyCards } from "../Assets/HomePage";

export default function SideBar() {
  const navigate = useNavigate();

  if (bodyCards.length === 0) return null;

  return (
    <div className="m-3">
      <div className="side-nav-logo-part">
        <h1 className="side-nav-text">AM</h1>
        <span className="side-nav-text">Apartment Manager</span>
        <Divider className="side-nav-divider" />
      </div>
      <div className="side-nav-icons">
        {bodyCards.map((bodyCard, key) => {
          return (
            <div className="side-nav-icons-space">
              <IconButton
                onClick={() => {
                  navigate(bodyCard.to);
                }}
                key={`homepage-btn${key}`}
              >
                {bodyCard.icon}
              </IconButton>
            </div>
          );
        })}
      </div>
    </div>
  );
}
