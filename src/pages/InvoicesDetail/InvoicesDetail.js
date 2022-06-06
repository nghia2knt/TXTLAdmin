import React, { Fragment, useEffect, useState } from "react";

import "./InvoicesDetail.scss";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Button,Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import CurrencyFormat from "react-currency-format";
import { Alert } from "@material-ui/lab";
import { getInvoice, updateStatus } from "../../actions/invoices.actions";
import AdminPageTitle from "../../components/general/AdminPageTitle";
import { onLoadingFalse, onLoadingTrue } from "../../actions/user.action";
import apiService from "../../services/api.service";

const mapValue = {
    "WAIT":"Đang chờ xác nhận",
    "CONFIRMED":"Đã được xác nhận",
    "LATE":"Chậm trả xe",
    "REQ_REFUND":"Yêu cầu hoàn tiền",
    "REFUNDED":"Đã hoàn tiền",
    "DONE":"Thuê hoàn tất",
    "CANCEL":""
  }
const InvoicesDetail = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const param = useParams()
  const invoice = useSelector((state) => state.invoices.getInvoice);
  const error = useSelector((state) => state.invoices.error);

  useEffect(() => {
    dispatch(getInvoice(param.id));
  }, []);

  const onConfirm = (id) => {
    const requestBody ={
        status: "CONFIRMED"
    }
    dispatch(onLoadingTrue())

    dispatch(updateStatus(id,requestBody))
  }
  const onCancel = (id) => {
    const requestBody ={
        status: "CANCEL"
    }
    dispatch(onLoadingTrue())

    dispatch(updateStatus(id,requestBody))
  }
  const onDone = (id) => {
    const requestBody ={
        status: "DONE"
    }
    dispatch(onLoadingTrue())

    dispatch(updateStatus(id,requestBody))
  }

  const onLate = (id) => {
    const requestBody ={
        status: "LATE"
    }
    dispatch(onLoadingTrue())

    dispatch(updateStatus(id,requestBody))
  }


  const onPrint = () => {
      onLoadingTrue()
    const requestBody ={
        "company": "Công ty TXTL IUH",
        "email": "lactuy47@gmail.com",
        "invoice_no": invoice.id,
        "invoice_date": invoice.createAt,
        "invoice_due_date": invoice.createAt,
        "address": "12 Nguyen Van Bao, Go Vap",
        "company_bill_to": "",
        "website": "https://iuh.edu.vn",
        "document_id": invoice.id,
        "customer_name":invoice.customerName,
        "customer_email":invoice.customerEmail,
        "customer_address":invoice.customerAddress,
        "items": [
          {
            "name": invoice.car.name,
            "date": invoice.startTime + " -> " + invoice.endTime + "",
            "price": invoice.car.price,
            "total_price": invoice.totalPrice
          }
           
        ]
      }
      apiService
      .template()
      .createPDF(requestBody)
      .then((response) => {
        onLoadingFalse()
          const pdfWindow = window.open();
            pdfWindow.location.href = response.data.download_url;
      })
      .catch((error) => {
          alert(error.response.message)
  
      })
     

   
  }
  return (

    <div id="invoicesDetail">
        <AdminPageTitle Title="Thông tin hóa đơn - lịch đặt" />
        {invoice && (
        <div className="input-container">
        <Fragment>
                              
                <Typography variant="h6" textAlign="center">THÔNG TIN HÓA ĐƠN</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                  
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                    </Typography>
                        <div>
                            <Typography gutterBottom>Mã hóa đơn: {invoice.id}</Typography>
                            <Typography gutterBottom>Ngày tạo: {invoice.createAt}</Typography>
                            <Typography gutterBottom>Trạng thái : {mapValue[invoice.statusType]}</Typography>
                            <Button variant="contained" color="primary" onClick={(e) =>onPrint()}>
                                       Xuất hóa đơn
                            </Button>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                        THÔNG TIN KHÁCH HÀNG
                    </Typography>
                        <div>
                            <Typography gutterBottom>Tên khách hàng: {invoice.customerName}</Typography>
                            <Typography gutterBottom>Số điện thoại: {invoice.customerPhone}</Typography>
                            <Typography gutterBottom>Email : {invoice.customerEmail}</Typography>
                            <Typography gutterBottom>CMND: {invoice.customerIDCard}</Typography>
                            Tài khoản thuê: <a href={"/Users/"+invoice.user.id}>[Xem thông tin]</a>

                        </div>
                    </Grid>
                </Grid>
                <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                        THÔNG TIN THUÊ XE
                </Typography>
                <img src={invoice.car.image}/>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                    
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <List disablePadding>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary="Tên xe:" />
                            
                            <a href={"/Cars/"+invoice.car.id}>{invoice.carName}</a>
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary="Thời gian bắt đầu:" />
                            <Typography  sx={{ fontWeight: 1000}}>
                                {invoice.startTime}
                            </Typography>
                        
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary="Thời gian kết thúc:" />
                            <Typography  sx={{ fontWeight: 1000}}>
                                {invoice.endTime}
                            </Typography>
                        </ListItem>
                    </List>
                    </Grid>
                    <List disablePadding>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary="Tổng Tiền:" />
                            
                            <Typography  variant="h5" color="secondary" gutterBottom>
                                    <CurrencyFormat
                                    value={invoice.totalPrice}
                                    displayType={'text'} thousandSeparator={true} suffix="đ"
                                    />
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary="Cập Nhật Trạng thái:" />
                            {
                                invoice.statusType == "WAIT" && (
                                    <div>
                                <ListItem>
                                
                                
                                <Button variant="contained" color="primary" onClick={(e) =>onConfirm(invoice.id)}>
                                        Chấp thuận
                                </Button>
                                </ListItem>
                                <ListItem>
                                <Button variant="contained" color="secondary"  onClick={(e) =>onCancel(invoice.id)}>
                                        Hủy Hóa Đơn 
                                </Button>
                                </ListItem>
                                </div>)
                            }

                            {
                                invoice.statusType == "CONFIRMED" && (
                                <div>

                                <ListItem>
                                <Button variant="contained" color="primary" onClick={(e) =>onDone(invoice.id)}>
                                        Hoàn Thành
                                </Button>
                                </ListItem>
                                <ListItem>
                                 <Button variant="contained" color="secondary" onClick={(e) =>onLate(invoice.id)}>
                                        Chậm trả xe
                                </Button>
                                </ListItem>
                                </div>
                                )
                            }

                                {
                                invoice.statusType == "LATE" && (
                                <div>

                                <ListItem>
                                <Button variant="contained" color="primary" onClick={(e) =>onDone(invoice.id)}>
                                        Hoàn Thành
                                </Button>
                                </ListItem>

                               
                                </div>
                                )
                            }
                            {
                                invoice.statusType == "LATE" && (
                                <div>

                               
                                <ListItem>  
                                <ListItemText primary="Xử lý trả xe trễ:" />
     
                                 <Button variant="contained" color="secondary" onClick={(e)=>navigate("/CreateIssue/User/"+invoice.user.id)}>
                                        Tạo hóa đơn phụ thu
                                </Button>
                                </ListItem>
                                </div>
                                )
                            }
                        
                        </ListItem>
                       
                    </List>
                    <Grid item xs={12} sm={3}>
                   
                    </Grid>
                </Grid>
               
                
        </Fragment>
        </div>
        )}
        {error && (
        <Alert severity="error">Lỗi: {error}</Alert>
        )}

</div>
  );
};

export default InvoicesDetail;
