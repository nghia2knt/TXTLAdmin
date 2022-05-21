import React from "react";

import AdminPageTitle from "../../components/general/AdminPageTitle";
import Wrapper from "../../components/general/Wrapper";

const Dashboard = () => {
  return (
    <div id="Dashboard">
      <AdminPageTitle Title="Dashboard" />
      <Wrapper>Giới thiệu: Bạn đang ở trang admin.</Wrapper>
      <Wrapper>Trần Minh Nghĩa - Khóa luận tốt nghiệp - IUH</Wrapper>
    </div>
  );
};

export default Dashboard;
