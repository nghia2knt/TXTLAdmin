import {Button,Avatar,IconButton, TextField, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { KeyboardDatePicker } from "@material-ui/pickers";
import React, { useEffect, useState,Fragment} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { changeAvatar, editUserProfile, getUsers,getUser, onLoadingTrue } from "../../actions/user.action";
import AdminPageTitle from "../../components/general/AdminPageTitle";
import "./CustomerDetail.scss";

const CustomerDetail = () => {
  const dispatch = useDispatch()
  const userProfile = useSelector((state) => state.user.userEdit);
  const error = useSelector((state) => state.user.error);
  const [selectedDate, setSelectedDate] = useState(null);
  const param = useParams()

  useEffect(() => {
    dispatch(onLoadingTrue())
    dispatch(getUser(param.id));
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date)
  };

  const onSave = () => {
    const requestBody = {
        id: userProfile.id,
      phoneNumber: userProfile.phoneNumber,
      name: userProfile.name,
      idCard:userProfile.idCard,
      birthDay: selectedDate,
      avatar: userProfile.avatar,
      address: userProfile.address
    }
    dispatch(onLoadingTrue())

    dispatch(editUserProfile(requestBody))
  }
  const onChangeAvatar = (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    dispatch(onLoadingTrue())

    dispatch(changeAvatar(userProfile.id, formData))
  };
  return (
    <div id="customerDetailContent">
                 <AdminPageTitle Title="Chỉnh sửa thông tin người dùng" />

     {userProfile && (
        <div className="input-container">
             <Fragment>
          <Typography variant="h6" textAlign="center">CHỈNH SỬA THÔNG TIN</Typography>
          <IconButton variant="contained" component="label">
            <Avatar  style={{ width: 150, height: 150 }} alt="user-avatar" src={userProfile.avatar}>Ảnh</Avatar>
            <input type="file" hidden accept=".jpg, .jpeg, .png, .gif" onChange={onChangeAvatar}/>
          </IconButton>
          <TextField id="name" label="Tên" className="text-field" fullWidth defaultValue={userProfile.name} onChange={(e) => userProfile.name=(e.target.value)}/>
          <KeyboardDatePicker
                id="date-picker-dialog"
                label="Ngày sinh"
                format="dd-MM-yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                className="text-field"
                invalidDateMessage="Ngày sai định dạng"
          />
          <TextField id="idcard" label="CMND/CCCD" className="text-field" fullWidth defaultValue={userProfile.idCard} onChange={(e) => userProfile.idCard = e.target.value}/>
          <TextField id="phonenumber" label="Số điện thoại" className="text-field"  fullWidth defaultValue={userProfile.phoneNumber} onChange={(e) => userProfile.phoneNumber = e.target.value}/>
          <TextField id="address" label="Địa chỉ" className="text-field" fullWidth defaultValue={userProfile.address} onChange={(e) => userProfile.address = e.target.value}/>
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

export default CustomerDetail ;
