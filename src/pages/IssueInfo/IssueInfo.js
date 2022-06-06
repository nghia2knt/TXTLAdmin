import React, { Fragment, useEffect, useState } from "react";

import "./IssueInfo.scss";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { Button,Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import CurrencyFormat from "react-currency-format";
import { Alert } from "@material-ui/lab";
import { getInvoice, updateStatus } from "../../actions/invoices.actions";
import AdminPageTitle from "../../components/general/AdminPageTitle";
import { onLoadingTrue } from "../../actions/user.action";
import apiService from "../../services/api.service";

const columns = [
    { id: 'name', label: 'Tên', minWidth: 30 },
    { id: 'info', label: 'Chi Tiết', minWidth: 30 },
    { id: 'price', label: 'Chi Phí', minWidth: 30, format: (value) => value.toLocaleString('vi-VN') + "đ", },
  ];

const IssueInfo = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [invoice,setInvoice] = useState('');
    const error = useSelector((state) => state.invoices.error);
    const param = useParams()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const mapIsPaid = {
      "true":"Đã thanh toán",
      "false":"Chưa thanh toán",}
      
    useEffect(() => {
  
      apiService
      .issues()
      .getIssueInvoiceId(param.id)
      .then((response) => {
          setInvoice(response.data.data)
      })
      .catch((error) => {
          alert(error.response.data.message)
  
      })
     
    }, [])
   
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const onPrint = () => {
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
          "total_price":invoice.totalPrice,
          "items": invoice.issues
        }
        apiService
        .template()
        .createPDFIssue(requestBody)
        .then((response) => {
            const pdfWindow = window.open();
              pdfWindow.location.href = response.data.download_url;
        })
        .catch((error) => {
            alert(error.response.message)
    
        })
       
    }

    const onConfirm = (id) => {
        apiService
        .issues()
        .setPaid(id)
        .then((response) => {
            window.location.href="/IssueList/"+param.id
           
        })
        .catch((error) => {
            alert(error.response.message)
    
        })
    }

  return (

    <div id="invoicesDetail">
        <AdminPageTitle Title="Thông tin hóa đơn phụ thu" />
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
                              <Typography gutterBottom>Trạng thái : {mapIsPaid[invoice.isPaid]}</Typography>
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
                          </div>
                      </Grid>
                  </Grid>
                  <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                          CHI TIẾT PHỤ THU
                  </Typography>
                {invoice.issues && (

                    <div>
             <TableContainer style={{ height: 400, width: '100%' }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                <TableRow>
                    {columns.map((column) => (
                    <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                    >
                        {column.label}
                    </TableCell>
                    ))}
                </TableRow>
                </TableHead>
                <TableBody>
                {invoice.issues.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id == 'user') {
                            return (
                            <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number' ? column.format(value.name) : value.name}
                            </TableCell>
                            );
                        }
                        else{
                            return (
                            <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                            );
                        }
                        })}
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={invoice.issues.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Số lượng mỗi trang"
            />
            </div>
            )}
                  <Grid item xs={12}>
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
                          
                            {
                                invoice.isPaid != true && (
                                    <div>
                                          <ListItemText primary="Cập Nhật Trạng thái:" />
                                <ListItem>
                                
                                
                                <Button variant="contained" color="primary" onClick={(e) =>onConfirm(invoice.id)}>
                                        Đã Thanh Toán
                                </Button>
                                </ListItem>
                                </div>)
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

export default IssueInfo;
