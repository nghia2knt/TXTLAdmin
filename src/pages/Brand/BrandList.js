import { Button,  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onLoadingTrue } from "../../actions/user.action";


import Wrapper from "../../components/general/Wrapper";

import AdminPageTitle from "../../components/general/AdminPageTitle";
import "./BrandList.scss";
import { createBrand, getAllBrandList } from "../../actions/brand.actions";
const columns = [
    { id: 'id', label: 'Mã', minWidth: 10 },
    { id: 'name', label: 'Tên', minWidth: 10 },
  ];
const BrandList = () => {
  const dispatch = useDispatch()
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const data = useSelector((state) => state.brand.listAllBrands);
  const [name,setName] = useState('')

  useEffect(() => {
    dispatch(onLoadingTrue())
    dispatch(getAllBrandList());
  }, []);

  const onSave = () => {
   const request = {
       name: name
   }
   dispatch(onLoadingTrue())
   dispatch(createBrand(request));
}
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div id="brandList">
     <AdminPageTitle Title="Danh sách hãng xe" />
     <Wrapper>
        <div className="input-container">
             <Fragment>
          <Typography variant="h6" textAlign="center">Thêm Hãng Xe Mới</Typography>
          
          <TextField id="name" label="Tên Hãng Xe" className="text-field" fullWidth defaultValue={name} onChange={(e) => setName(e.target.value)}/>
         
        <Button variant="contained" onClick={onSave}>Lưu</Button>
          </Fragment>
        </div>
    </Wrapper>
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
                 <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                   {columns.map((column) => {
                     const value = row[column.id];
                     
                       return (
                         <TableCell key={column.id} align={column.align}>
                           {column.format && typeof value === 'number' ? column.format(value) : value}
                         </TableCell>
                       );
                     
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

export default BrandList ;
