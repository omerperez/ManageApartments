import { MoreVert } from "@mui/icons-material";
import { Grid, IconButton, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { CardActionsBtn } from "../../../Assets/Apartments";

type MenuProps = {
  apartmentName: string;
  language: string;
};
export default function CardMenuActions({
  apartmentName,
  language,
}: MenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickMenuBtn = (label: string) => {
    navigate({
      pathname: label === "edit" ? `/${`edit-apartment`}` : `/${`apartment`}`,
      search: createSearchParams({
        apartmentId: apartmentName,
      }).toString(),
    });
  };

  return (
    <Grid container>
      {CardActionsBtn.map((btn, key) => (
        <Grid item sm={4} key={`CardMenuActions-${key}`}>
          <IconButton onClick={() => handleClickMenuBtn(btn.label)}>
            {btn.icon}
          </IconButton>
        </Grid>
      ))}
    </Grid>
    // <div>
    //   <IconButton
    //     id="basic-button"
    //     aria-controls={open ? "basic-menu" : undefined}
    //     aria-haspopup="true"
    //     aria-expanded={open ? "true" : undefined}
    //     onClick={handleClick}
    //   >
    //     <MoreVert />
    //   </IconButton>
    //   <Menu
    //     id="basic-menu"
    //     anchorEl={anchorEl}
    //     open={open}
    //     onClose={handleClose}
    //     MenuListProps={{
    //       "aria-labelledby": "basic-button",
    //     }}
    //   >
    //     {CardActionsBtn.map((btn, key) => (
    //       <MenuItem
    //         onClick={() => handleClickMenuBtn(btn.label)}
    //         key={`menu-btn-${btn.label}-${key}`}
    //       >
    //         <Grid container spacing={2} className="rtl">
    //           <Grid item sm={8} className="text-end">
    //             {btn[`${language}_title`]}
    //           </Grid>
    //           <Grid item sm={4} className="m-auto">
    //             {btn.icon}
    //           </Grid>
    //         </Grid>
    //       </MenuItem>
    //     ))}
    //   </Menu>
    // </div>
  );
}
