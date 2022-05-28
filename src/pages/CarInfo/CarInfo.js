import {Button,Avatar,IconButton, TextField, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from "@material-ui/core";
import { Alert, Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState,Fragment} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { changeImage, editCar } from "../../actions/car.actions";
import {  onLoadingFalse, onLoadingTrue } from "../../actions/user.action";
import { getCar } from "../../actions/car.actions";

import AdminPageTitle from "../../components/general/AdminPageTitle";
import "./CarInfo.scss";
import apiService from "../../services/api.service";

const columns = [
    { id: 'user', label: 'Người dùng', minWidth: 30 },
    { id: 'createAt', label: 'Thời gian', minWidth: 30 },
    { id: 'point', label: 'Điểm', minWidth: 30 },
    { id: 'content', label: 'Nội dung', minWidth: 30 },
    
  ];

const CarInfo = () => {
  const dispatch = useDispatch()
  const carInfo = useSelector((state) => state.car.getCar);
  const error = useSelector((state) => state.car.error);
  const listAllBrands = useSelector((state) => state.brand.listAllBrands);
  const navigate = useNavigate()
  const [votes, setVotes] = useState([])
  const [page, setPage] = React.useState(0);

  const param = useParams()
  const listEngineType = ["GAS", "ELECTRICITY"];
  const listTransmissionType = ["MANUAL", "AUTOMATIC"];
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    dispatch(onLoadingTrue())
    dispatch(getCar(param.id));
    apiService
    .cars()
    .getVote(param.id)
    .then((response) => {
        setVotes(response.data.data)
    })
    .catch((error) => {
        alert(error.response.data.message)

    })
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const onEdit = () => {
        navigate("/EditCar/"+param.id)
  }
  const onDelete = (id) => {
    apiService
      .votes()
      .deleteVote(id)
      .then((response) => {
        apiService
        .cars()
        .getVote(param.id)
        .then((response) => {
            setVotes(response.data.data)
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
    <div id="carInfo">
     <AdminPageTitle Title="Thông tin xe" />

     {carInfo && (
        <div className="input-container">
             <Fragment>
          <Typography variant="h6" textAlign="center">THÔNG TIN XE</Typography>
                <Avatar variant="square" style={{ width: 150, height: 150 }} alt="user-avatar" src={carInfo.image}>
                    N
                </Avatar>            
          <TextField id="name" label="Tên" className="text-field" fullWidth value={carInfo.name}/>
             <TextField id="model" label="Mẫu xe" className="text-field" fullWidth value={carInfo.model}/>
             <TextField id="licensePlate" label="Biển số" className="text-field" fullWidth value={carInfo.licensePlate}/>
             <TextField id="seats" label="Số ghế" className="text-field" fullWidth value={carInfo.seats} />
             <TextField id="price" label="Giá tiền (giờ)" className="text-field" fullWidth value={carInfo.price} />
             <TextField id="brand" label="Hãng xe" className="text-field" fullWidth value={carInfo.brand.name} />
             <TextField id="engineType" label="Nhiên liệu" className="text-field" fullWidth value={carInfo.engineType} />
             <TextField id="transmission" label="Hộp số" className="text-field" fullWidth value={carInfo.transmission} />
        <Button variant="contained" onClick={onEdit}>Chỉnh sửa thông tin xe</Button>

        <Typography variant="h6" gutterBottom>
        LƯỢT ĐÁNH GIÁ: {votes.length}
      </Typography>
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
                    <TableCell
                      key="option"
                      style={{ minWidth: 10}}
                    >
                      Tác Vụ
                    </TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {votes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
                         <TableCell key="option" align="10">
                          <Button variant="contained" color="secondary" onClick={(e)=>onDelete(row["id"])}>
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
            count={votes.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Fragment>
        </div>
     )}
      {error && (
        <Alert severity="error">Lỗi: {error}</Alert>
      )}
      
    </div>
  );
};

export default CarInfo ;
