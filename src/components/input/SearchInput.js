//React
import { useState } from "react";

//Material UI
import { InputBase, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

//CSS
import classes from "./SearchInput.module.scss";

// helper
import handlerRedirectToMarketPlace from "../../helper/redirectToMarketplace";

const SearchInput = (props) => {
  const [searchInput, setSearchInput] = useState("");

  const inputChangeHandler = (event) => {
    setSearchInput(event.target.value);
  };

  const keyDownHandler = (event) => {
    if (searchInput !== "" && event.key === "Enter") {
      window.location = handlerRedirectToMarketPlace(`/search/${searchInput}`);
    }
  };

  return (
    <div className={classes.searchInputDiv}>
      <InputBase
        className={classes.searchInput}
        placeholder={props.placeholder}
        onChange={inputChangeHandler}
        onKeyDown={keyDownHandler}
        fullWidth
        name="search product"
        type="text"
        inputProps={{
          "aria-label": "search for product",
          autoComplete: "off",
        }}
        endAdornment={
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        }
      />
    </div>
  );
};

export default SearchInput;
