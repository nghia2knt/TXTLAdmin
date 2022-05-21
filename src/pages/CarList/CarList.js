import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//material
import { Button, Grid, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import FilterListIcon from "@material-ui/icons/FilterList";
import AddIcon from "@material-ui/icons/Add";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { getAllBrandList } from "../../actions/brand.actions";
import {
  getAllCarList,
  getAllCarListByFilter,
} from "../../actions/car.actions";
import AdminPageTitle from "../../components/general/AdminPageTitle";
import Wrapper from "../../components/general/Wrapper";
import DataTableCar from "../../components/pages/CarList/DataTableCar";
import { StyleTextFieldListPage } from "../../styles/StyleTextFieldListPage";
import "./CarList.scss";

const CarList = () => {
  const [uniqueSeatsCars, setUniqueSeatsCars] = useState([]);
  const [uniqueNameCars, setUniqueNameCars] = useState([]);
  const [uniqueModelCars, setUniqueModelCars] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [nameValue, setNameValue] = useState(null);
  const [brandNameValue, setBrandNameValue] = useState(null);
  const [modelValue, setModelValue] = useState(null);
  const [seatsValue, setSeatsValue] = useState(null);
  const [engineTypeValue, setEngineTypeValue] = useState(null);
  const [transmissionValue, setTransmissionValue] = useState(null);

  const dispatch = useDispatch();
  const listAllBrands = useSelector((state) => state.brand.listAllBrands);
  const listAllCars = useSelector((state) => state.car.listAllCars);
  const listAllCarsByFilter = useSelector(
    (state) => state.car.listAllCarsByFilter
  );

  const classes = StyleTextFieldListPage();
  //mockup data
  const listEngineType = ["GAS", "ELECTRICITY"];
  const listTransmissionType = ["MANUAL", "AUTOMATIC"];

  useEffect(() => {
    dispatch(getAllBrandList());
    dispatch(getAllCarList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCarListByFilter(filterValue));
  }, [dispatch, filterValue]);

  useEffect(() => {
    if (listAllCars && listAllCars.length > 0) {
      setUniqueSeatsCars([...new Set(listAllCars.map((item) => item.seats))]);
      setUniqueNameCars([...new Set(listAllCars.map((item) => item.name))]);
      setUniqueModelCars([...new Set(listAllCars.map((item) => item.model))]);
    }
  }, [listAllCars]);

  const calculatePageNumber = (pageSize, itemIndex) => {
    return Math.ceil(++itemIndex / pageSize);
  };

  const handleSearch = () => {
    let value = "";

    if (nameValue) {
      value += `&name=${nameValue}`;
    }
    if (brandNameValue) {
      value += `&brand=${brandNameValue.id}`;
    }
    if (modelValue) {
      value += `&model=${modelValue}`;
    }
    if (seatsValue) {
      value += `&seats=${seatsValue}`;
    }
    if (engineTypeValue) {
      value += `&engine=${engineTypeValue}`;
    }
    if (transmissionValue) {
      value += `&transmission=${transmissionValue}`;
    }

    setFilterValue(value);
  };

  const handleCancelFilter = () => {
    setFilterValue("");
    setNameValue(null);
    setBrandNameValue(null);
    setModelValue(null);
    setSeatsValue(null);
    setEngineTypeValue(null);
    setTransmissionValue(null);
  };

  return (
    <div id="CarList">
      <AdminPageTitle Title="Danh Sách Xe" />
      <Wrapper>
        <div className="root">
          <Grid container spacing={4}>
            {/* row 1 */}
            <Grid item xs={4}>
              <label>Tên Xe</label>
              <Autocomplete
                id="combo-box-license"
                value={nameValue}
                onChange={(event, value) => {
                  setNameValue(value);
                }}
                options={uniqueNameCars || []}
                getOptionLabel={(option) => option || ""}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    margin="dense"
                    classes={classes}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <label>Hãng Xe</label>
              <Autocomplete
                id="combo-box-brand"
                value={brandNameValue}
                onChange={(event, value) => {
                  setBrandNameValue(value);
                }}
                options={listAllBrands || []}
                getOptionLabel={(option) => option.name || ""}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    margin="dense"
                    classes={classes}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <label>Mẫu Xe</label>
              <Autocomplete
                id="combo-box-model"
                value={modelValue}
                onChange={(event, value) => {
                  setModelValue(value);
                }}
                options={uniqueModelCars || []}
                getOptionLabel={(option) => option || ""}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    margin="dense"
                    classes={classes}
                  />
                )}
              />
            </Grid>

            {/* row 2 */}
            <Grid item xs={4}>
              <label>Số Chỗ</label>
              <Autocomplete
                id="combo-box-seats"
                value={seatsValue}
                onChange={(event, value) => {
                  setSeatsValue(value);
                }}
                options={uniqueSeatsCars || []}
                getOptionLabel={(option) => option.toString() || ""}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    margin="dense"
                    classes={classes}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <label>Loại Động Cơ</label>
              <Autocomplete
                id="combo-box-engine"
                value={engineTypeValue}
                onChange={(event, value) => {
                  setEngineTypeValue(value);
                }}
                options={listEngineType}
                getOptionLabel={(option) => option.toLowerCase()}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    margin="dense"
                    classes={classes}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <label>Hộp Số</label>
              <Autocomplete
                id="combo-box-transmission"
                value={transmissionValue}
                onChange={(event, value) => {
                  setTransmissionValue(value);
                }}
                options={listTransmissionType}
                getOptionLabel={(option) => option.toLowerCase()}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    margin="dense"
                    classes={classes}
                  />
                )}
              />
            </Grid>
            
          </Grid>
        </div>

        <div className="button-container">
          <Button
            variant="contained"
            className="button-primary"
            startIcon={<FilterListIcon />}
            onClick={handleSearch}
          >
            Tìm Kiếm
          </Button>
          <Button
            variant="contained"
            className="button-secondary"
            startIcon={<CloseIcon />}
            onClick={handleCancelFilter}
          >
            Xóa
          </Button>
        </div>
      </Wrapper>
      <Wrapper>
        <div className="button-container-right">
          <Link to="/CarForm">
            <Button
              variant="contained"
              className="button-primary"
              startIcon={<AddIcon />}
            >
              Thêm Xe
            </Button>
          </Link>
        </div>
        <DataTableCar
          pageCount={
            listAllCarsByFilter
              ? calculatePageNumber(10, listAllCarsByFilter.length)
              : 0
          }
          listCars={listAllCarsByFilter}
        />
      </Wrapper>
    </div>
  );
};

export default CarList;
