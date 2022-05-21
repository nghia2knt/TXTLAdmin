import React from "react";

import SettingsIcon from "@material-ui/icons/Settings";
import "./AdminPageTitle.scss";

const AdminPageTitle = (props) => {
  return (
    <div className="admin-page-title">
      <SettingsIcon className="setting-icon" />
      <p>{props.Title}</p>
    </div>
  );
};

export default AdminPageTitle;
