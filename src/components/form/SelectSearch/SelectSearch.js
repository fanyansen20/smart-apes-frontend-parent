// MUI
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
// import { Clear } from "@mui/icons-material";

const SelectSearch = (props) => {
  const {
    options, // option state from parent
    selected, // default value
    className, // custom class
    setSelected, // setSelected state from parent
    handleSearch, // function call api
    placeholder, // placeholder for input
    isLoading, // set loading api call
    helperText, // err message
    readOnly, // readonly -true/false-
    disabled, // disable -true/false-
    getOptionDisabled, // disable option list
  } = props;
  return (
    <Autocomplete
      size="small"
      value={selected || null}
      defaultValue={null}
      className={className}
      onChange={(event, newValue) => {
        setSelected(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        if (handleSearch) {
          handleSearch(newInputValue);
        }
      }}
      getOptionLabel={(option) => option.label}
      options={options}
      loading={isLoading}
      loadingText={
        <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <CircularProgress size={20} thickness={5} variant="indeterminate" />
          <p>Loading...</p>
        </div>
      }
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          error={helperText && true}
          helperText={helperText}
        />
      )}
      readOnly={readOnly}
      disabled={disabled}
      getOptionDisabled={getOptionDisabled}
    />
  );
};

export default SelectSearch;
