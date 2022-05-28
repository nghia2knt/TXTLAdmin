import { Button,  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { onLoadingTrue } from "../../actions/user.action";


import Wrapper from "../../components/general/Wrapper";

import AdminPageTitle from "../../components/general/AdminPageTitle";
import "./BrandEdit.scss";
import { createBrand, getAllBrandList } from "../../actions/brand.actions";
import apiService from "../../services/api.service";

const BrandEdit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name,setName] = useState('')
  const param = useParams()

  useEffect(() => {
    apiService
      .brands()
      .getBrandInfo(param.id)
      .then((response) => {
          setName(response.data.data.name)
      })
      .catch((error) => {
          alert(error.response.data.message)
      })
  }, []);

  const onSave = () => {
      const body = {
          name: name
      }
    apiService
    .brands()
    .putBrand(param.id,body)
    .then((response) => {
        navigate("/BrandList")
    })
    .catch((error) => {
        alert(error.response.data.message)
    })
  }
  
 
  return (
    <div id="brandEdit">
     <AdminPageTitle Title="Chỉnh sửa tên hãng xe" />
     <Wrapper>
        <div className="input-container">
             <Fragment>
          <Typography variant="h6" textAlign="center">Thay Đổi Tên Hãng Xe</Typography>
          
          <TextField id="name" label="Tên Hãng Xe" className="text-field" fullWidth value={name} onChange={(e) => setName(e.target.value)}/>
         
        <Button variant="contained" onClick={onSave}>Lưu</Button>
          </Fragment>
        </div>
    </Wrapper>
       
    </div>
  );
};

export default BrandEdit;
