import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllBrandList } from "../../actions/brand.actions";
import { countWaitInvoice, getInvoices } from "../../actions/invoices.actions";

import AdminPageTitle from "../../components/general/AdminPageTitle";
import Wrapper from "../../components/general/Wrapper";

const Dashboard = () => {
  const wait = useSelector((state) => state.invoices.waitInvoice);
  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    
     dispatch(countWaitInvoice())
 }, [])
  return (
    <div id="Dashboard">
      <AdminPageTitle Title="Dashboard" />
      {wait>0 && (
      <Wrapper><Typography variant="h6" textAlign="center" color="secondary">Thông báo: Hiện tại đang có {wait} hóa đơn đang đợi giải quyết.</Typography></Wrapper>
      )}
      <Wrapper>Trần Minh Nghĩa - Khóa luận tốt nghiệp - IUH</Wrapper>
    </div>
  );
};

export default Dashboard;
