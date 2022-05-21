import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//material
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ForumIcon from "@material-ui/icons/Forum";

import { findSelf } from "../../actions/user.action";
import jwtDecode from "jwt-decode";
import AccountPopup from "./AccountPopup";
import "./AdminHeader.scss";

const AdminHeader = (props) => {
  const [openPopup, setOpenPopup] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.user.userDetail);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate(`/Login`, true);
    } else {
      const decoded = jwtDecode(token);
      const expDate = decoded.expDate;
      const dateNow = Date.now();

      if (expDate < dateNow) {
        navigate(`/Login`, { replace: true });
        localStorage.setItem("token", "");
      }
    }
  }, [navigate, token]);

  useEffect(() => {
    dispatch(findSelf());
  }, [dispatch]);

  const handleOpenPopup = () => {
    setOpenPopup((state) => !state);
  };

  return (
    <div className="admin-header">
      {openPopup && <AccountPopup />}

      <div className={`logo-container ${props.collapse && "hidden"}`}>
        <a href="/admin">TXTL</a>
      </div>

      <div className="menu-icon-container" onClick={props.handleSetCollapse}>
        <MenuIcon className="menu-icon" />
      </div>

     
      <div className="account-container">
        <p onClick={handleOpenPopup}>{userDetail ? userDetail.name : "N/A"}</p>
        <AccountCircleIcon className="account-icon" onClick={handleOpenPopup} />
      </div>
    </div>
  );
};

export default AdminHeader;
