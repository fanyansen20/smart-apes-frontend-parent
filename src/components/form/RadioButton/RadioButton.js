// MUI
import { FormControlLabel, Radio } from "@mui/material";

// Styles
import classes from "./RadioButton.module.scss";

const RadioButton = ({ value, label }) => {
  return (
    <FormControlLabel
      value={value}
      control={<Radio classes={{ root: classes.purpleRadio }} />}
      label={label}
    />
  );
};

export default RadioButton;
