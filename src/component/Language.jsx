import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";

const LanguageDropdown = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    props.setLang(e)
    setAnchorEl(null);
  };
  return (
    <div style={{marginLeft: 'auto'}}>
      <Button
        id="basic-button"
        aria-controls={open ? "lang-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <img
          style={{ marginLeft: "auto", marginRight: "10px" }}
          height="30"
          width="30"
          src={`assets/img/flags/${props.lang}.png`}
          alt={props.lang}
        />
      </Button>
      <Menu
        id="lang-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Button onClick={e => {
            handleClose(props.lang === "JP" ? "EN" : "JP")
        }}>
            <img
            style={{ marginLeft: "auto", marginRight: "10px" }}
            height="30"
            width="30"
            src={`assets/img/flags/${props.lang === "JP" ? "en" : "jp"}.png`}
            alt={props.lang}
            />
        </Button>
      </Menu>
    </div>
  );
};

export default LanguageDropdown;
