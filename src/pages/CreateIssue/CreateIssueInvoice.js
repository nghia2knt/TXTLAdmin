import React, { Fragment, useEffect, useState } from "react";

import "./CreateIssueInvoice.scss";
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
  TextField,
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

const CreateIsssueInvoice = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [issues,setIssues] = useState([]);
    const [totalPrice,setTotalPrice] = useState(0);
    const error = useSelector((state) => state.invoices.error);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [name,setName] = useState('')
    const [info,setInfo] = useState('')
    const [price,setPrice] = useState(0)
    const [user,setUser] = useState(null)
    const param = useParams()

    const mapIsPaid = {
      "true":"Đã thanh toán",
      "false":"Chưa thanh toán",}
      
    useEffect(() => {
        apiService
      .user()
      .getUser(param.id)
      .then((response) => {
          setUser(response.data.data)
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
    const onAdd = () => {
        if (name == "") {
            alert("Tên dịch vụ không được rỗng")
            return
        }
        if (info == "") {
            alert("Thông tin dịch vụ không được rỗng")
            return

        }
        if (price == "") {
            alert("Giá tiền dịch vụ không được rỗng")
            return

        }
        if  ((price < 0) || (isNaN(price))) {
            alert("Giá tiền không hợp lệ")
            return

        }
        const newValue = {
            name:name,
            info: info,
            price: price
        }
        setIssues(old => [...old, newValue])
        setTotalPrice(old => Number(old)+Number(price))
    }
    const onCreate =() =>{
        if (issues.length<=0) {
            alert("Chưa thêm chi tiết phụ thu")
            return
        }
        const requestBody = {
            userId : param.id,
            issues: issues
        }
        onLoadingTrue()
        apiService
        .issues()
        .create(requestBody)
        .then((response) => {
            navigate("/IssueList")
        })
        .catch((error) => {
            alert(error.response.data.message)

        })
    }
  return (

    <div id="invoicesDetail">
        <AdminPageTitle Title="Tạo Hóa Đơn Phụ Thu" />
       
          <div className="input-container">
          <Fragment>
                  <Typography variant="h6" textAlign="center">THÔNG TIN HÓA ĐƠN</Typography>
                    <Typography variant="h5" >
                          THÔNG TIN KHÁCH HÀNG
                      </Typography>
                      {user && (
                            <div>
                            <Typography gutterBottom>Tên khách hàng: {user.name}</Typography>
                            <Typography gutterBottom>Số điện thoại: {user.phoneNumber}</Typography>
                            <Typography gutterBottom>Email : {user.email}</Typography>
                            <Typography gutterBottom>CMND: {user.idCard}</Typography>  
                            </div>
                        )}
                         
                  <Grid container spacing={2}>
                        <Grid item xs={4}  spacing={2}>
                        <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                          NHẬP THÔNG TIN
                        </Typography>
                            <div>
                            <TextField id="name" 
                                label="Tên dịch vụ/vấn đề" 
                                variant="outlined" 
                                defaultValue={name} 
                                onChange={(event) =>setName(event.target.value)}/>
                            </div>
                                <div>
                                   <TextField id="info" 
                                label="Chi tiết dịch vụ" 
                                variant="outlined" 
                                defaultValue={info} 
                                onChange={(event) =>setInfo(event.target.value)}/>
                                </div>
                                <div>

                                 <TextField id="price" 
                                label="Giá tiền" 
                                variant="outlined" 
                                defaultValue={price} 
                                onChange={(event) =>setPrice(event.target.value)}/>
                                </div>
                                <Button
                            variant="contained"
                            color="primary"
                            onClick={(e)=>onAdd()}
                        >
                            Thêm
                        </Button>
                        <Grid item xs={12}>
                      <List disablePadding>
                          <ListItem sx={{ py: 1, px: 0 }}>
                              <ListItemText primary="Tổng Tiền:" />
                              
                              <Typography  variant="h5" color="secondary" gutterBottom>
                                      <CurrencyFormat
                                      value={totalPrice}
                                      displayType={'text'} thousandSeparator={true} suffix="đ"
                                      />
                              </Typography>
                          </ListItem>
                         
                         
                      </List>
                     
                      <Grid item xs={12} sm={3}>
                     
                      </Grid>
                      <Button variant="contained" color="secondary" onClick={(e)=>onCreate()}>
                                       Tạo Hóa Đơn
                       </Button>
                  </Grid>
                        </Grid>
                        <Grid item xs={8}>
                        <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                          CHI TIẾT PHỤ THU
                  </Typography>
                {issues && (

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
                {issues.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
            count={issues.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Số lượng mỗi trang"
            />
            </div>
            )}
                        </Grid>
                  </Grid>
                
                  
                  
                 
                  
          </Fragment>
          </div>
    
      
      {error && (
        <Alert severity="error">Lỗi: {error}</Alert>
      )}

</div>
  );
};

export default CreateIsssueInvoice;
