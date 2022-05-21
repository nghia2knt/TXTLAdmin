import axios from "axios";
const moment = require('moment')

const baseApi = "https://4monce5w19.execute-api.us-east-2.amazonaws.com/api/";

const apiService = {
  auth(url = baseApi + "auth/") {
    return {
      login: (loginObject) => axios.post(url + "login/", loginObject),
    };
  },
  user(url = baseApi + "users") {
    return {
      self: () =>
        axios.get(url + "/self", {
          headers: { Authorization: localStorage.getItem("token") },
        }),
      getUsers: (param) =>
        axios.get(url, {
          headers: { Authorization: localStorage.getItem("token") },
          params: {
            name: param.name,
            email: param.email,
            phoneNumber: param.phoneNumber,
            idCard: param.idCard,
              page: 1,
              size: 999,
          },
          
      }),
      getUser: (id) =>
        axios.get(url+"/"+id, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },          
      }),
      editProfileUser: (requestBody) => axios.put(url + "/admin/"+requestBody.id, requestBody, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
      }),
      activeUser: (id) => axios.put(url + "/active-account/"+id, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
    }),
      changeAvatar: (id,formData) => axios.post(url +"/"+ id + "/avatar", formData, {
          headers: {
                "Content-Type": "multipart/form-data",
              Authorization: `${localStorage.getItem("token")}`,
          },
      }),
    };
  },
  cars(url = baseApi + "cars/") {
    return {
        carList: (filter) =>
        axios.get(url + "admin" + filter, {
          headers: { Authorization: localStorage.getItem("token") },
        }),
        getCar: (id) =>
        axios.get(url + id , {
          headers: { Authorization: localStorage.getItem("token") },
        }),
        editCar: (id,requestBody) =>
        axios.put(url + id , requestBody, {
          headers: { Authorization: localStorage.getItem("token") },
        }),
        createCar: (requestBody) =>
        axios.post(url , requestBody, {
          headers: { Authorization: localStorage.getItem("token") },
        }),
    };
     
    
  },
  brands(url = baseApi + "brands/") {
    return {
      brandList: () => axios.get(url),
      createBrand: (requestBody) =>
        axios.post(url , requestBody, {
          headers: { Authorization: localStorage.getItem("token") },
        }),
    };
  },
  invoices(url = baseApi + "invoices/") {
    return {
      getInvoices: (param) => axios.get(url,{
      headers: { Authorization: localStorage.getItem("token") },
      params: {
        fromDate: moment(param.fromDate).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"),
        toDate: moment(param.toDate).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"),
        customerName: param.customerName,
        customerEmail:  param.customerEmail,
        customerPhone:  param.customerPhone,
        customeridcard:  param.customerIDCard,
        carName:  param.carName,
        carLicensePlate:  param.carLicensePlate,
        page: 1,
        size: 999,
    },}),
    updateStatus: (id,requestBody) =>
        axios.put(url +"status/"+ id , requestBody, {
          headers: { Authorization: localStorage.getItem("token") },
        }),
      
    getInvoice: (id) =>
      axios.get(url + id , {
      headers: { Authorization: localStorage.getItem("token") },
    }),
    };
  },
  storage(url = baseApi + "storage/") {
    return {
      uploadFile: (formData) => axios.post(url + "upload-file", formData, {
        headers: {
              "Content-Type": "multipart/form-data",
            Authorization: `${localStorage.getItem("token")}`,
        },
    }),
    };
  },
};

export default apiService;
