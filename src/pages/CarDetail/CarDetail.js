import {Button,Avatar,IconButton, TextField, Typography } from "@material-ui/core";
import { Alert, Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState,Fragment} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { changeImage, editCar } from "../../actions/car.actions";
import {  onLoadingTrue } from "../../actions/user.action";
import { getCar } from "../../actions/car.actions";

import AdminPageTitle from "../../components/general/AdminPageTitle";
import "./CarDetail.scss";

const CarDetail = () => {
  const dispatch = useDispatch()
  const carInfo = useSelector((state) => state.car.getCar);
  const error = useSelector((state) => state.car.error);
  const listAllBrands = useSelector((state) => state.brand.listAllBrands);

  const param = useParams()
  const listEngineType = ["GAS", "ELECTRICITY"];
  const listTransmissionType = ["MANUAL", "AUTOMATIC"];

  useEffect(() => {
    dispatch(onLoadingTrue())
    dispatch(getCar(param.id));
  }, []);

  const onSave = () => {
    const requestBody = {
      brandId: carInfo.brand.id,
      name: carInfo.name,
      model: carInfo.model,
      licensePlate: carInfo.licensePlate,
      transmission: carInfo.transmission,
      engineType: carInfo.engineType,
      seats: carInfo.seats,
      price: carInfo.price,
      image: carInfo.image
    }
    dispatch(onLoadingTrue())
    dispatch(editCar(carInfo.id,requestBody))
  }
  const onChangeImage = (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    dispatch(onLoadingTrue())
    dispatch(changeImage(carInfo.id,formData,{
      brandId: carInfo.brand.id,
      name: carInfo.name,
      model: carInfo.model,
      licensePlate: carInfo.licensePlate,
      transmission: carInfo.transmission,
      engineType: carInfo.engineType,
      seats: carInfo.seats,
      price: carInfo.price,
      image: carInfo.image
    }))
  };
  return (
    <div id="carDetail">
     <AdminPageTitle Title="Chỉnh sửa thông tin xe" />

     {carInfo && (
        <div className="input-container">
             <Fragment>
          <Typography variant="h6" textAlign="center">CHỈNH SỬA THÔNG TIN</Typography>
          <IconButton variant="contained" component="label">
                <Avatar variant="square" style={{ width: 150, height: 150 }} alt="user-avatar" src={carInfo.image}>
                    N
                </Avatar>            
              <input type="file" hidden accept=".jpg, .jpeg, .png, .gif" onChange={onChangeImage}/>
          </IconButton>
          <TextField id="name" label="Tên" className="text-field" fullWidth defaultValue={carInfo.name} onChange={(e) => carInfo.name = e.target.value}/>
          <TextField id="model" label="Mẫu xe" className="text-field" fullWidth defaultValue={carInfo.model} onChange={(e) => carInfo.model = e.target.value}/>
          <TextField id="licensePlate" label="Biển số" className="text-field" fullWidth defaultValue={carInfo.licensePlate} onChange={(e) => carInfo.licensePlate = e.target.value}/>
          <TextField id="seats" label="Số ghế" className="text-field" fullWidth defaultValue={carInfo.seats} onChange={(e) => carInfo.seats = e.target.value}/>
          <TextField id="price" label="Giá tiền (giờ)" className="text-field" fullWidth defaultValue={carInfo.price} onChange={(e) => carInfo.price = e.target.value}/>
          <Autocomplete
                id="combo-box-brand"
                value={carInfo.brand}
                onChange={(event, value) => {
                    carInfo.brand.id = value.id
                }}
                options={listAllBrands || []}
                getOptionLabel={(option) => option.name || ""}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    label="Hãng"
                    className="text-field"
                    {...params}
                    defaultValue={'ád'}
                    margin="dense"
                  />
                )}
              />
          <Autocomplete
                id="combo-box-engine"
                value={carInfo.engineType}
                onChange={(event, value) => {
                  carInfo.engineType = value
                }}
                options={listEngineType}
                getOptionLabel={(option) => option.toLowerCase()}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    label="Nhiên liệu"
                    {...params}
                    className="text-field"
                    margin="dense"
                  />
                )}
              />
          <Autocomplete
                id="combo-box-transmission"
                value={carInfo.transmission}
                onChange={(event, value) => {
                  carInfo.transmission = value
                }}
                options={listTransmissionType}
                getOptionLabel={(option) => option.toLowerCase()}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Hộp số"
                    className="text-field"
                    margin="dense"
                  />
                )}
              />


        <Button variant="contained" onClick={onSave}>Lưu</Button>
          </Fragment>
        </div>
     )}
      {error && (
        <Alert severity="error">Lỗi: {error}</Alert>
      )}
      
    </div>
  );
};

export default CarDetail ;
