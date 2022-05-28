import {  Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./MessageList.scss";
import {Grid } from "@material-ui/core";
import AdminPageTitle from "../../components/general/AdminPageTitle";
import Wrapper from "../../components/general/Wrapper";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { countWaitInvoice, getInvoices, updateStatus } from "../../actions/invoices.actions";
import { findSelf, onLoadingTrue } from "../../actions/user.action";
import { Autocomplete } from "@material-ui/lab";
import apiService from "../../services/api.service";

const columns = [
    { id: 'id', label: 'Mã', minWidth: 10 },
    { id: 'createAt', label: 'Ngày tạo', minWidth: 10 },
    { id: 'fromUser', label: 'Gửi từ', minWidth: 10 },
    { id: 'toUser', label: 'Gửi đến', minWidth: 10 },
    { id: 'content', label: 'Nội dung', minWidth: 10 },
  ];
  
const MessageList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [data,setData] = useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  

    useEffect(() => {

        apiService
        .message()
        .getMessages()
        .then((response) => {
            setData(response.data.data)
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
   
  
    return (
      <div id="messageList">
          <AdminPageTitle Title="Danh Sách Tin Nhắn" />
  
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
                    <TableCell
                      key="option"
                      style={{ minWidth: 10}}
                    >
                      Tác Vụ
                    </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id == 'fromUser') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                                
                                <a href={"/Users/"+value.id}>{column.format && typeof value === 'number' ? column.format(value.name) : value.name+" ("+value.roles+")"}</a>                            </TableCell>
                          );
                        } else if ((column.id == 'toUser') && (row.toUser.id!=row.fromUser.id)) {
                          return (
                            <TableCell key={column.id} align={column.align}>
                                <a href={"/Users/"+value.id}>{column.format && typeof value === 'number' ? column.format(value.name) : value.name+" ("+value.roles+")"}</a>
                                
                            </TableCell>
                          );
                        } else if ((column.id == 'toUser') && (row.toUser.id==row.fromUser.id)) {
                          return (
                            <TableCell key={column.id} align={column.align}>
                                <a href='#'>{column.format && typeof value === 'number' ? column.format(value.name) : "Admin"}</a>
                                
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
                    <TableCell key="option" align="10">
                          <Button variant="contained" color="primary" className="btn" onClick={(e)=>navigate("/Messages/"+row.toUser.id)}>
                                Trả lời
                        </Button>
                      </TableCell>
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
  
  export default MessageList;
  