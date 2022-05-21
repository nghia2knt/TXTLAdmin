import React, { useState } from "react";
import { Outlet } from "react-router-dom";

//material
import AdminHeader from "../components/global/AdminHeader";
import AdminNavMenu from "../components/global/AdminNavMenu";

import "./AdminLayout.scss";

const AdminLayout = () => {
  const [isCollapse, setIsCollapse] = useState(false);

  const handleSetCollapse = () => {
    setIsCollapse((state) => !state);
  };

  return (
    <div>
      <AdminHeader
        collapse={isCollapse}
        handleSetCollapse={handleSetCollapse}
      />
      <div className="admin-body">
        <AdminNavMenu collapse={isCollapse} />
        <div className={`admin-content ${isCollapse && "collapse"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
