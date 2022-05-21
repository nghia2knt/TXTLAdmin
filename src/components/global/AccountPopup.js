import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

//Material
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import "./AccountPopup.scss";

const AccountPopup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.setItem("token", "");
    navigate("/Login", { replace: true });
  };

  return (
    <div className="account-popup">
      <List component="nav" aria-label="main mailbox folders">
        
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon className="popup-icon" />
          </ListItemIcon>
          <p>Đăng Xuất</p>
        </ListItem>
      </List>
    </div>
  );
};

export default AccountPopup;
