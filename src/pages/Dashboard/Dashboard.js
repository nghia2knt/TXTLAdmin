import React from "react";

import AdminPageTitle from "../../components/general/AdminPageTitle";
import Wrapper from "../../components/general/Wrapper";

const Dashboard = () => {
  return (
    <div id="Dashboard">
      <AdminPageTitle Title="Dashboard" />
      <Wrapper>Dashboard 1</Wrapper>
      <Wrapper>Dashboard 2</Wrapper>
    </div>
  );
};

export default Dashboard;
