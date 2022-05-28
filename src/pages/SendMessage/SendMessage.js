import {  Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./SendMessage.scss";
import {Grid } from "@material-ui/core";
import AdminPageTitle from "../../components/general/AdminPageTitle";
import Wrapper from "../../components/general/Wrapper";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { countWaitInvoice, getInvoices, updateStatus } from "../../actions/invoices.actions";
import { findSelf, onLoadingFalse, onLoadingTrue } from "../../actions/user.action";
import { Autocomplete } from "@material-ui/lab";
import apiService from "../../services/api.service";
import { io } from 'socket.io-client';

const columns = [
    { id: 'createAt', label: 'Ngày tạo', minWidth: 10 },
    { id: 'fromUser', label: 'Gửi từ', minWidth: 10 },
    { id: 'content', label: 'Nội dung', minWidth: 10 },
  ];
  

let socket;

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(socket) socket.disconnect();
}



export const initiateSocketConnection = (room) => {
	socket = io.connect('http://52.90.99.251:3009/', {reconnect: true});
	console.log(`Connecting socket...`);
}
const SendMessage = () => {
    const userDetail = useSelector((state) => state.user.userDetail);
    const [conversation,setConversation] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const param = useParams()
    const [data,setData] = useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [mess, setMess] = useState('')

  

    useEffect(() => {
      const callback =  (msg) => {
          apiService
          .message()
          .getMessageByUserId(param.id)
          .then((response) => {
              setData(response.data.data)
          })
          .catch((error) => {
              alert(error.response.data.message)
          })
      };
      dispatch(findSelf());
      apiService
      .user()
      .getUser(param.id)
      .then((response) => {
        initiateSocketConnection();
        socket.on("adminMess", callback);
      return () => {
        socket.off(response.data.data.email, callback);
        disconnectSocket();
      }
      })
      .catch((err) => {
        alert(err.response.data.message.toString())
      }).finally();

      
   }, [])
 

    useEffect(() => {
      apiService
      .message()
      .getMessageByUserId(param.id)
      .then((response) => {
          setData(response.data.data)
      })
      .catch((error) => {
          alert(error.response.data.message)
      })
      apiService
      .user()
      .getUser(param.id)
      .then((response) => {
          setConversation(response.data.data)
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
   
   

    const onSendMess= (e) => {
      e.preventDefault();
      const body = {
        content: mess
      }
      apiService
      .message()
      .sendMess(param.id, body)
      .then((response) => {
        socket.emit('sendMess',response.data.data)
      })
      .catch((error) => {
          alert(error.response.data.message)
      })
      setMess('')
    }

    return (
      <div id="sendMessage">
        {conversation && (
          <div>
            <AdminPageTitle Title={"Tin Nhắn: "+conversation.name + " (" + conversation.email+ ")"} />
            <a href={"/Users/"+conversation.id}>[Xem Thông Tin Người Dùng]</a>
          </div>
          
        )}
   <Wrapper>
          <div className="input-container">
              <Fragment>
                <Typography variant="h6" textAlign="center">Nhập nội dung tin nhắn</Typography>
              <form onSubmit={(e) => onSendMess(e)}>
                <TextField id="name" label="" variant="outlined" autoComplete='off'
 className="text-field" fullWidth value={mess} onChange={(e) => setMess(e.target.value)}/>
                  <Button type="submit" variant="contained">
                    Send
                  </Button>
              </form>
                
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
                        if (column.id == 'toUser') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                                
                                <a href={"/Users/"+value.id}>{column.format && typeof value === 'number' ? column.format(value.name) : value.name}</a>                            </TableCell>
                          );
                        } else if (column.id == 'fromUser') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                                <a href={"/Users/"+value.id}>{column.format && typeof value === 'number' ? column.format(value.name) : value.name+" ("+value.roles+")"}</a>
                                
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
  
  export default SendMessage;
  