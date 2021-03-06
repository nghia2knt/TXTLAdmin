import {  Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./InvoicesList.scss";
import {Grid } from "@material-ui/core";
import AdminPageTitle from "../../components/general/AdminPageTitle";
import Wrapper from "../../components/general/Wrapper";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { countWaitInvoice, getInvoices, updateStatus } from "../../actions/invoices.actions";
import { onLoadingTrue } from "../../actions/user.action";
import { Autocomplete } from "@material-ui/lab";

const columns = [
    { id: 'id', label: 'Mã', minWidth: 10 },
    { id: 'createAt', label: 'Ngày tạo', minWidth: 10 },
    { id: 'startTime', label: 'Bắt đầu', minWidth: 10 },
    { id: 'endTime', label: 'Kết thúc', minWidth: 10 },
    { id: 'customerName', label: 'Tên khách hàng', minWidth: 10 },
    { id: 'customerEmail', label: 'Email khách hàng', minWidth: 10 },
    { id: 'customerIDCard', label: 'CMND', minWidth: 10 },
    { id: 'customerPhone', label: 'Số điện thoại', minWidth: 10 },
    { id: 'carName', label: 'Tên xe', minWidth: 10 },
    { id: 'carLicensePlate', label: 'Biển số xe', minWidth: 10 },
    { id: 'car', label: 'Hình ảnh', minWidth: 10 },
    { id: 'totalPrice', label: 'Giá tiền', minWidth: 10, format: (value) => value.toLocaleString('vi-VN') + "đ",},
    { id: 'statusType', label: 'Trạng thái', minWidth: 10},
  ];
  const mapValue = {
    "WAIT":"Đang chờ xác nhận",
    "CONFIRMED":"Đã được xác nhận",
    "LATE":"Chậm trả xe",
    "REQ_REFUND":"Yêu cầu hoàn tiền",
    "REFUNDED":"Đã hoàn tiền",
    "DONE":"Thuê hoàn tất",
    "CANCEL":""
  }

const InvoicesList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const data = useSelector((state) => state.invoices.invoices);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [beginDate, setBeginDate] = useState(Date.now()-(72000000*7))
    const [endDate, setEndDate] = useState(Date.now());
    const [customerName, setCustomerName] = useState(null);
    const [customerEmail, setCustomerEmail] = useState(null);
    const [customerIDCard, setCustomerIDCard] = useState(null);
    const [customerPhone, setCustomerPhone] = useState(null);
    const [carName, setCarName] = useState(null);
    const [carLicensePlate, setCarLicensePlate] = useState(null);
    const [status, setStatus] = useState({value: null});

    useEffect(() => {
      setStatus({name: "Đang chờ xác nhận",value: "WAIT"});
      dispatch(countWaitInvoice())
      let numWeeks = 2;
      let start = new Date();
      start.setDate(start.getDate() - numWeeks * 7);

      let end = new Date();
      end.setDate(end.getDate() + 1);
        const param = {
            fromDate: start,
            toDate: end,
            customerName: customerName,
            customerEmail: customerEmail,
            customerPhone: customerPhone,
            customeridcard: customerIDCard,
            carName: carName,
            carLicensePlate: carLicensePlate,
            status: "WAIT",
            page: 1,
            size: 100,
          }
          dispatch(onLoadingTrue())
          dispatch(getInvoices(param))
   }, [])
 
    const statusType = [{name: "Tất cả",value:""}, 
    {name: "Đang chờ xác nhận",value: "WAIT"}, 
    {name: "Đã được xác Nhận",value: "CONFIRMED"}, 
    {name: "Thuê hoàn tất",value: "DONE"},
    {name: "Chậm trả xe",value: "LATE"},
    {name: "Yêu cầu hoàn tiền",value: "REQ_REFUND"},
    {name: "Đã hoàn tiền",value: "REFUNDED"},
  ];
   
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
   

  const handleBeginDateChange = (date) => {
    setBeginDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const onSearch = () => {

    const param = {
      fromDate: beginDate,
      toDate: endDate,
      customerName: customerName,
      customerEmail: customerEmail,
      customerPhone: customerPhone,
      customeridcard: customerIDCard,
      carName: carName,
      carLicensePlate: carLicensePlate,
      status: status.value,
      page: 1,
      size: 100,
    }
    dispatch(onLoadingTrue())

    dispatch(getInvoices(param))
  }

  
  
    return (
      <div id="invoicesList">
          <AdminPageTitle Title="Danh Sách Lịch Đặt" />
      <Wrapper>

            <Grid>
            <KeyboardDateTimePicker
          id="date-picker-dialog"
          label="Ngày Tạo Từ"
          format="dd-MM-yyyy hh:mm"
          value={beginDate}
          onChange={handleBeginDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          className="text-field"
          invalidDateMessage="Ngày sai định dạng"


        />
        <KeyboardDateTimePicker
          id="date-picker-dialog"
          label="Ngày Tạo Đến"
          format="dd-MM-yyyy hh:mm"
          value={endDate}
          onChange={handleEndDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          className="text-field"
          invalidDateMessage="Ngày sai định dạng"



        />

       <TextField id="name" label="Tên khách hàng" className="text-field"     onChange={(e) => setCustomerName(e.target.value)}/>
       <TextField id="email" label="Email" className="text-field"    onChange={(e) =>  setCustomerEmail(e.target.value)}/>
       <TextField id="sdt" label="Số điện thoại" className="text-field"    onChange={(e) => setCustomerPhone(e.target.value)}/>
       <TextField id="cmnd" label="CMND" className="text-field"   onChange={(e) => setCustomerIDCard(e.target.value)}/>
       <TextField id="carName" label="Tên Xe" className="text-field"   onChange={(e) => setCarName(e.target.value)}/>
       <TextField id="carLicensePlate" label="Biển số xe" className="text-field"   onChange={(e) => setCarLicensePlate(e.target.value)}/>
 
       
            
            

  
            </Grid>
            
            
            <Grid item xs={2}>
            <Autocomplete
          
                id="combo-box-status"
                value={status}
                onChange={(event, value) => {
                  setStatus(value);
                }}
                options={statusType}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className="text-field"
                    margin="dense"
                    label="Trạng thái"
                  />
                )}
              />
           </Grid>
        </Wrapper>
        <Button variant="contained" color="primary" className="btn" onClick={onSearch}>
                        Tìm kiếm
                </Button>
       <Paper></Paper>
       
          <Paper>
          <TableContainer>
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
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={(e) => navigate("/Invoices/"+row["id"])}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id == 'car') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <img src={value.image} width="200"></img>
                            </TableCell>
                          );
                        } else 
                        if (column.id == 'statusType') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                               {column.format && typeof value === 'number' ? column.format(value) : mapValue[value]}
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
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
       
      </div>
    );
  };
  
  export default InvoicesList;
  