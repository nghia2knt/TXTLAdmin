import React, { Fragment, useState, useEffect } from "react";

//Material
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";

import NoData from "../../general/NoData";
import "./DataTableCar.scss";
import { getCar } from "../../../actions/car.actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onLoadingTrue } from "../../../actions/user.action";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#E6E6E6",
    color: "#333333",
    fontFamily: `"Roboto Condensed", "Roboto", sans-serif`,
  },
  body: {
    fontSize: 15,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    fontFamily: "Roboto Condensed",
    "&:nth-of-type(even)": {
      backgroundColor: "#F7F9F9",
    },
    
  },
  
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const DataTable = (props) => {
  const [page, setPage] = useState(1);
  const [listItems, setListItems] = useState([]);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pageCount, listCars } = props;
  const classes = useStyles();

  useEffect(() => {
    if (listCars && listCars.length > 0) {
      const startIndex = page * 10 - 10;
      const endIndex = startIndex + 10;
      setListItems(listCars.slice(startIndex, endIndex));
    }
  }, [page, listCars]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const onSelect = (id) => {
    dispatch(onLoadingTrue())
    dispatch(getCar(id))
    navigate("/Cars/"+id)
  }

  return (
    <Fragment>
      <TableContainer component={Paper} className="table-car">
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow >
              <StyledTableCell>Biển số</StyledTableCell>
              <StyledTableCell>Tên xe</StyledTableCell>
              <StyledTableCell>Hãng xe</StyledTableCell>
              <StyledTableCell>Mẫu Xe</StyledTableCell>
              <StyledTableCell>Số chỗ</StyledTableCell>
              <StyledTableCell>Loại Động Cơ</StyledTableCell>
              <StyledTableCell>Hộp Số</StyledTableCell>
              <StyledTableCell>Hình ảnh</StyledTableCell>

            </TableRow>
          </TableHead>
          {listItems && listItems.length > 0 && (
            <TableBody>
              {listItems.map((row) => (
                <StyledTableRow key={row.licensePlate} onClick={(e) => onSelect(row.id)}>
                  <StyledTableCell>
                    {row.licensePlate}
                  </StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{row.brand.name}</StyledTableCell>
                  <StyledTableCell>{row.model}</StyledTableCell>
                  <StyledTableCell>{row.seats}</StyledTableCell>
                  <StyledTableCell>{row.engineType}</StyledTableCell>
                  <StyledTableCell>{row.transmission}</StyledTableCell>
                  <StyledTableCell><img src={row.image} width="200"></img></StyledTableCell>

                </StyledTableRow>
              ))}
            </TableBody>
          )}
        </Table>
        {!(listItems && listItems.length > 0) && <NoData />}
      </TableContainer>

      {listItems && listItems.length > 0 && (
        <div className="paging-container">
          <Pagination count={pageCount} onChange={handleChangePage} />
        </div>
      )}
    </Fragment>
  );
};

export default DataTable;
