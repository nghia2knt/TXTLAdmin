import {Button,Avatar,IconButton, TextField, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState,Fragment} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { activeUser, getUser, onLoadingTrue } from "../../actions/user.action";
import AdminPageTitle from "../../components/general/AdminPageTitle";
import "./UserDetail.scss";

const UserDetail = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userProfile = useSelector((state) => state.user.userEdit);
  const error = useSelector((state) => state.user.error);
  const param = useParams()

  useEffect(() => {
    dispatch(onLoadingTrue())

    dispatch(getUser(param.id));
  }, []);

  const onEdit = () => {
    navigate("/EditProfile/"+param.id);
  };
  const onActive= () => {
    dispatch(onLoadingTrue())

    dispatch(activeUser(param.id));
  };
  return (
    <div id="userDetail">
      <AdminPageTitle Title="Thông tin người dùng" />

     {userProfile && (
        <div className="input-container">
             <Fragment>
          <Typography variant="h6" textAlign="center">THÔNG TIN NGƯỜI DÙNG</Typography>
          <IconButton variant="contained" component="label">
            <Avatar  style={{ width: 150, height: 150 }} alt="user-avatar" src={userProfile.avatar}>Ảnh</Avatar>
          </IconButton>
          <Button variant="contained" onClick={(e)=>navigate("/Messages/"+userProfile.id)}>Nhắn Tin</Button>

          <TextField id="name" label="Tên" className="text-field" fullWidth value={userProfile.name}/>
          <TextField id="email" label="Email" className="text-field" fullWidth value={userProfile.email}/>
          <TextField id="birthday" label="Ngày sinh" className="text-field" fullWidth value={userProfile.birthDay}/>
          <TextField id="idcard" label="CMND/CCCD" className="text-field" fullWidth value={userProfile.idCard}/>
          <TextField id="phonenumber" label="Số điện thoại" className="text-field"  fullWidth value={userProfile.phoneNumber}/>
          <TextField id="address" label="Địa chỉ" className="text-field" fullWidth value={userProfile.address}/>
          <TextField id="role" label="ROLE" className="text-field" fullWidth value={userProfile.roles}/>
          <TextField id="active" label="Active" className="text-field" fullWidth value={userProfile.active.toString()}/>
          {
            !userProfile.active &&(
              <Button variant="contained" color="secondary" onClick={onActive}>Kích hoạt tài khoản</Button>
            )
          }
          <Button variant="contained" onClick={onEdit}>Chỉnh sửa thông tin</Button>
          </Fragment>
        </div>
     )}
      {error && (
        <Alert severity="error">Lỗi: {error}</Alert>
      )}
      
    </div>
  );
};

export default UserDetail;
