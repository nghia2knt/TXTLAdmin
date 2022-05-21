import {Button,Avatar,IconButton, TextField, Typography } from "@material-ui/core";
import { Alert, Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState,Fragment} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllBrandList } from "../../actions/brand.actions";
import {  createNewCar, uploadFile } from "../../actions/car.actions";
import {  onLoadingTrue } from "../../actions/user.action";
import AdminPageTitle from "../../components/general/AdminPageTitle";
import "./CarForm.scss";

const CarForm = () => {
  const dispatch = useDispatch()

  const error = useSelector((state) => state.car.error);
  const upload = useSelector((state) => state.car.uploadFile);
  const listAllBrands = useSelector((state) => state.brand.listAllBrands);
  const [brandNameValue, setBrandNameValue] = useState(null);
  const [engineTypeValue, setEngineTypeValue] = useState(null);
  const [transmissionValue, setTransmissionValue] = useState(null);
  const [name,setName] = useState("")
  const [model,setModel] = useState("")
  const [licensePlate,setLiscensePlate] = useState("")
  const [seats,setSeats] = useState("")
  const [price,setPrice] = useState(0)
  
  const listEngineType = ["GAS", "ELECTRICITY"];
  const listTransmissionType = ["MANUAL", "AUTOMATIC"];
  useEffect(() => {
    dispatch(getAllBrandList());
  }, []);

  const onSave = () => {
    const requestBody = {
      brandId: brandNameValue.id,
      name: name,
      model: model,
      licensePlate: licensePlate,
      transmission: transmissionValue,
      engineType: engineTypeValue,
      seats: seats,
      price: price,
      image: upload
    }
    dispatch(onLoadingTrue())
    dispatch(createNewCar(requestBody))
  }
  const onChangeImage = (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0])
    dispatch(onLoadingTrue())
    dispatch(uploadFile(formData))
  };
  return (
    <div id="carForm">
     <AdminPageTitle Title="Thêm xe mới và cơ sở dữ liệu" />

        <div className="input-container">
             <Fragment>
          <Typography variant="h6" textAlign="center">NHẬP THÔNG TIN</Typography>
          <IconButton variant="contained" component="label">
                <Avatar variant="square" style={{ width: 150, height: 150 }} alt="user-avatar" src={upload}>
                    ẢNH MINH HỌA
                </Avatar>            
              <input type="file" hidden accept=".jpg, .jpeg, .png, .gif" onChange={onChangeImage}/>
          </IconButton>
          <TextField id="name" label="Tên" className="text-field" fullWidth defaultValue={name} onChange={(event) =>setName(event.target.value)}/>
          <TextField id="model" label="Mẫu xe" className="text-field" fullWidth defaultValue={model} onChange={(event) =>setModel(event.target.value)}/>
          <TextField id="licensePlate" label="Biển số" className="text-field" fullWidth defaultValue={licensePlate} onChange={(event) =>setLiscensePlate(event.target.value)}/>
          <TextField id="seats" label="Số ghế" className="text-field" fullWidth defaultValue={seats} onChange={(event) =>setSeats(event.target.value)}/>
          <TextField id="price" label="Giá tiền (giờ)" className="text-field" fullWidth defaultValue={price} onChange={(event) =>setPrice(event.target.value)}/>
          <Autocomplete
                id="combo-box-brand"
                value={brandNameValue}
                onChange={(event, value) => {
                   setBrandNameValue(value)
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
                value={engineTypeValue}
                onChange={(event, value) => {
                  setEngineTypeValue(value)
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
                value={transmissionValue}
                onChange={(event, value) => {
                  setTransmissionValue(value)
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
   
      {error && (
        <Alert severity="error">Lỗi: {error}</Alert>
      )}
      
    </div>
  );
};

export default CarForm ;
