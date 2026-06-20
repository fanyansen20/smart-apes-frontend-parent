// React
import { Outlet, useNavigate } from "react-router-dom";

// styles
import classes from "./_LayoutOrderList.module.scss";

// icons
import SearchIcon from "@mui/icons-material/Search";

import { Container, Grid, InputAdornment, Typography } from "@mui/material";
import usePageUrlQuery from "../../../hooks/usePageUrlQuery";
import { DISPUTED_CATEGORIES } from "../../../pages/OrderList/constants";
import InputTextField from "../../form/InputTextField/InputTextField";

const LayoutOrderList = () => {
  const navigate = useNavigate();
  const param = usePageUrlQuery().get("status");

  function handleChangeCategory(param) {
    const params = new URLSearchParams();
    if (param) params.append("status", param);

    navigate({ pathname: `/disputed-order`, search: params.toString() });
  }

  const isActiveCategory = (index, queryParam) => {
    if (queryParam === param || (!param && index === 0))
      return classes.category__active;
  };

  return (
    <Container maxWidth="lg">
      <Grid container className={classes.content}>
        <Grid item md={8} className={classes.title}>
          <Typography>Disputed Order</Typography>
        </Grid>
        <Grid item md={4} className={classes.filterProducts}>
          <InputTextField
            label="Search Transaction ID"
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              fontSize: "1.9em",
              "& .MuiFormLabel-root": {
                color: "#CFCFCF",
                fontFamily: '"Poppins"',
                fontSize: 14,
              },
              "& .MuiInputBase-input": {
                fontFamily: '"Poppins"',
                color: "#CFCFCF",
              },
              "& .MuiFormLabel-root.Mui-focused": {
                color: "#CFCFCF",
                fontFamily: '"Poppins"',
              },
              "& .MuiSvgIcon-root": {
                color: "#CFCFCF",
              },
            }}
          />
        </Grid>
      </Grid>
      <Grid className={classes.container}>
        <div className={classes.categoryTabContainer}>
          {DISPUTED_CATEGORIES.map((category, index) => (
            <Typography
              Button
              className={`${classes.titleCategory} ${isActiveCategory(
                index,
                category.param
              )}`}
              key={index}
              onClick={() => handleChangeCategory(category.param)}
            >
              {category.label}
            </Typography>
          ))}
        </div>
        <Outlet />
      </Grid>
    </Container>
  );
};

export default LayoutOrderList;
