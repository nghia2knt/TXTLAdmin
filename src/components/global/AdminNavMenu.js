import React, { useState } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";

//material
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import DirectionsCarOutlinedIcon from "@material-ui/icons/DirectionsCarOutlined";
import PeopleOutlineOutlinedIcon from "@material-ui/icons/PeopleOutlineOutlined";
import TodayOutlinedIcon from "@material-ui/icons/TodayOutlined";
import ReceiptOutlinedIcon from "@material-ui/icons/ReceiptOutlined";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import RemoveIcon from "@material-ui/icons/Remove";

import "./AdminNavMenu.scss";
import { AddIcCallTwoTone, InsertComment, SettingsInputComponent } from "@material-ui/icons";
import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const AdminNavMenu = (props) => {
  const [openCarManagement, setOpenCarManagement] = useState(false);
  const [openCustomerManagement, setOpenCustomerManagement] = useState(false);
  const { pathname } = useLocation();
  const classes = useStyles();

  const open= useSelector((state) => state.user.loading);

  const handleIsCarManagement = () => {
    return pathname.includes("CarList") || pathname.includes("CarForm");
  };

  return (
    <div className={`admin-nav ${props.collapse && "hidden"}`}>
       <Backdrop className={classes.backdrop} open={open} >
            <CircularProgress color="inherit" />
          </Backdrop>
      {/* dashboard */}
      <NavLink to="/Dashboard" className={"nav-link-react"}>
        <div
          className={`nav-item ${
            pathname.includes("Dashboard") && "right-url"
          }`}
        >
          <DashboardOutlinedIcon className="nav-icon" />
          <p>Dashboard</p>
        </div>
      </NavLink>

      {/* car */}
      <div
        className={`nav-item ${openCarManagement && "chosen-block"} ${
          handleIsCarManagement() && "right-url"
        }`}
        onClick={() => setOpenCarManagement((state) => !state)}
      >
        <DirectionsCarOutlinedIcon className="nav-icon" />
        <p>Quản Lý Xe</p>
        <ExpandMore className="expand-icon" />
      </div>
      <Collapse in={openCarManagement}>
        <div className="nav-sub-menu">
          <NavLink to="/CarList" className={"nav-link-react"}>
            <div
              className={`nav-sub-menu-item ${
                pathname.includes("CarList") && "right-url"
              }`}
            >
              <RemoveIcon className="nav-icon" />
              <p>Danh sách xe</p>
            </div>
          </NavLink>
          <NavLink to="/CarForm" className={"nav-link-react"}>
            <div
              className={`nav-sub-menu-item ${
                pathname.includes("CarForm") && "right-url"
              }`}
            >
              <RemoveIcon className="nav-icon" />
              <p>Thêm xe mới</p>
            </div>
          </NavLink>
        </div>
      </Collapse>

      <NavLink to="/BrandList" className={"nav-link-react"}>
        <div
          className={`nav-item ${
            pathname.includes("BrandList") && "right-url"
          }`}
        >
        <SettingsInputComponent className="nav-icon" />
        <p>Danh Sách Hãng Xe</p>
        </div>
      </NavLink>

      {/* customer */}
      <div
        className={`nav-item ${openCustomerManagement && "chosen-block"} `}
        onClick={() => setOpenCustomerManagement((state) => !state)}
      >
        <PeopleOutlineOutlinedIcon className="nav-icon" />
        <p>Quản Lý Tài Khoản</p>
        <ExpandMore className="expand-icon" />
      </div>
      <Collapse in={openCustomerManagement}>
        <div className="nav-sub-menu">
            <NavLink to="/UserList" className={"nav-link-react"}>
            <div
              className={`nav-sub-menu-item ${
                pathname.includes("UserList") && "right-url"
              }`}
            >
              <RemoveIcon className="nav-icon" />
              <p>Danh sách người dùng</p>
            </div>
          </NavLink>
         
        </div>
      </Collapse>
      
      {/* invoices */}
      <NavLink to="/Invoices" className={"nav-link-react"}>
        <div
          className={`nav-item ${
            pathname.includes("Invoices") && "right-url"
          }`}
        >
        <TodayOutlinedIcon className="nav-icon" />
        <p>Hóa đơn - Lịch Thuê Xe</p>
        </div>
      </NavLink>

      {/* statistic */}
      
    </div>
  );
};

export default AdminNavMenu;
