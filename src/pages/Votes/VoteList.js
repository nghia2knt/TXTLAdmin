import {  Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./VoteList.scss";
import {Grid } from "@material-ui/core";
import AdminPageTitle from "../../components/general/AdminPageTitle";
import Wrapper from "../../components/general/Wrapper";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { countWaitInvoice, getInvoices, updateStatus } from "../../actions/invoices.actions";
import { onLoadingTrue } from "../../actions/user.action";
import { Autocomplete } from "@material-ui/lab";
import apiService from "../../services/api.service";

const columns = [
    { id: 'id', label: 'Mã', minWidth: 10 },
    { id: 'createAt', label: 'Ngày tạo', minWidth: 10 },
    { id: 'user', label: 'Người dùng', minWidth: 10 },
    { id: 'car', label: 'Xe', minWidth: 10 },
    { id: 'point', label: 'Điểm', minWidth: 10 },
    { id: 'content', label: 'Nội dung', minWidth: 10 },
  ];
  
const VoteList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [data,setData] = useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

  

    useEffect(() => {
      apiService
      .votes()
      .getVotes()
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
   


  const onDelete = (id) => {
    apiService
      .votes()
      .deleteVote(id)
      .then((response) => {
        apiService
        .votes()
        .getVotes()
        .then((response) => {
            setData(response.data.data)
        })
        .catch((error) => {
            alert(error.response.data.message)
        })
      })
      .catch((error) => {
          alert(error.response.data.message)
      })
  }

  
  
    return (
      <div id="voteList">
          <AdminPageTitle Title="Lượt đánh giá" />
  
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
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id == 'car') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                                
                                <a href={"/Cars/"+value.id}>{column.format && typeof value === 'number' ? column.format(value.name) : value.name}</a>                            </TableCell>
                          );
                        } else if (column.id == 'user') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                                <a href={"/Users/"+value.id}>{column.format && typeof value === 'number' ? column.format(value.name) : value.name}</a>
                                
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
                          <Button variant="contained" color="secondary" className="btn" onClick={(e)=>onDelete(row["id"])}>
                                Xóa
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
  
  export default VoteList;
  