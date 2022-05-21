import {  Button,  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, getUsers, onLoadingTrue } from "../../actions/user.action";
import "./CustomerList.scss";
import {Grid } from "@material-ui/core";
import AdminPageTitle from "../../components/general/AdminPageTitle";
import Wrapper from "../../components/general/Wrapper";

const columns = [
    { id: 'id', label: 'Mã', minWidth: 10 },
    { id: 'name', label: 'Tên', minWidth: 10 },
    { id: 'email', label: 'Email', minWidth: 10 },
    { id: 'phoneNumber', label: 'Số điện thoại', minWidth: 10 },
    { id: 'birthDay', label: 'Ngày sinh', minWidth: 10 },
    { id: 'idCard', label: 'CMND', minWidth: 10 },
    { id: 'avatar', label: 'Avatar', minWidth: 10 },
    { id: 'roles', label: 'ROLE', minWidth: 10 },
    { id: 'active', label: 'Trạng thái', minWidth: 10},
  ];
  
const CustomerList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const data = useSelector((state) => state.user.userList);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [idCard,setIdCard] = useState('')

  useEffect(() => {
    
       const param = {
                name: name,
                email: email,
                phoneNumber: phone,
                idCard: idCard,
        }
        dispatch(onLoadingTrue())

      dispatch(getUsers(param))
   
  }, [])


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onClear = () => {
    setName('')
    setEmail('')
    setPhone('')
    setIdCard('')
  }

  const onSearch = () => {
    const param = {
        name: name,
        email: email,
        phoneNumber: phone,
        idCard: idCard,
    }
    dispatch(onLoadingTrue())

    dispatch(getUsers(param))
   
  }

  const onSelect = (id) => {
    dispatch(onLoadingTrue())

    dispatch(getUser(id))
    navigate("/Users/"+id)
  }

  return (
    <div id="invoicesContent">
         <AdminPageTitle Title="Danh Sách Người Dùng" />
      <Wrapper>

            <Grid>
            <TextField id="email" label="Email" className="text-field" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <TextField id="name" label="Tên" className="text-field"  value={name}  onChange={(e) => setName(e.target.value)}/>
            <TextField id="phoneNumber" label="Số điện thoại" className="text-field" value={phone}    onChange={(e) => setPhone(e.target.value)}/>
            <TextField id="idCard"      label="CMND" className="text-field"  value={idCard}  onChange={(e) => setIdCard(e.target.value)}/>
            </Grid>
            
            
            <Grid>
              
           </Grid>
        </Wrapper>
        <Button variant="contained" color="primary" className="btn" onClick={onSearch}>
                        Tìm kiếm
         </Button>
         <Button variant="contained" className="btn" onClick={onClear}>
                        Xóa Trắng
         </Button>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={(e) => onSelect(row["id"])}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id == 'avatar') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <img src={value} width="200"></img>
                          </TableCell>
                        );
                      } else  if (column.id == 'active') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value == true && ("Đã kích hoạt")}
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

export default CustomerList;
