import { useState } from "react";

//MUI
import { TextField, InputAdornment, IconButton } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const InputTextField = ({
  label,
  value,
  name,
  handleChange,
  error,
  type,
  placeholder,
  helperText,
  passwordHelper,
  ...restProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <div className="container-input-text-field">
      {label && (
        <label className={error ? "label-error" : "label"}>{label}</label>
      )}
      <TextField
        fullWidth
        value={value}
        name={name}
        error={helperText && true}
        onChange={handleChange}
        placeholder={placeholder}
        size="small"
        type={showPassword ? "text" : type}
        helperText={helperText}
        FormHelperTextProps={{
          classes: {
            root: "textField-helper-text",
          },
        }}
        InputProps={
          passwordHelper && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }
        }
        {...restProps}
      />
    </div>
  );
};

export default InputTextField;
