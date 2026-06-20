// React
import React, { useState } from "react";

// React Router
import { useNavigate } from "react-router-dom";

// Mui
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Grid, IconButton, InputBase, Paper } from "@mui/material";

// Icon
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { ReactComponent as CartIcon } from "../../../../assets/logo/navbarIcon/carts.svg";

// Css
import classes from "./_SearchNavbar.module.scss";

const SearchNavbar = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState(false);

  const handleSubmitSearch = (e) => {
    if (e?.key === "Enter") {
      e.preventDefault();
      window.location.assign(
        `${process.env.REACT_APP_MARKETPLACE_URL}/search?query=${searchText}`
      );
    }
  };
  const handleClearSearch = () => setSearchText(null);
  const handleRedirectToCart = () =>
    window.location.assign(`${process.env.REACT_APP_MARKETPLACE_URL}/cart`);

  return (
    <Grid
      container
      p={1.5}
      className={classes.searchNavbar}
      alignItems={"center"}
    >
      <Grid container item xs={1} justifyContent="center">
        <IconButton
          className={classes.backIconBtn}
          size="small"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIosIcon fontSize="small" />
        </IconButton>
      </Grid>

      <Grid item xs={10}>
        <Paper
          variant="outlined"
          component="form"
          className={classes.searchInput}
        >
          <InputBase
            sx={{
              margin: 1,
            }}
            fullWidth
            value={searchText || ""}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => handleSubmitSearch(e)}
            placeholder="Search product or store"
            inputProps={{
              "aria-label": "Search product or store",
              sx: {
                fontFamily: "Poppins",
                fontSize: "12px !important",
                fontWeight: "400 !important",
                padding: 0,
              },
            }}
          />
          <IconButton
            onClick={() => handleClearSearch()}
            type="button"
            sx={{ paddingRight: "10px" }}
            size="small"
            aria-label="search"
          >
            {searchText ? <CloseIcon /> : <SearchIcon />}
          </IconButton>
        </Paper>
      </Grid>

      <Grid container item xs={1} justifyContent="center">
        <CartIcon onClick={handleRedirectToCart} />
      </Grid>
    </Grid>
  );
};

export default SearchNavbar;
