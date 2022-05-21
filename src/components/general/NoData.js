import React from "react";

//Material
import StorageIcon from "@material-ui/icons/Storage";

import "./NoData.scss";

const NoData = () => {
  return (
    <div className="no-data-component">
      <StorageIcon />
      <p>No Data</p>
    </div>
  );
};

export default NoData;
