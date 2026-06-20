//React
import React from "react";

//Material-UI
import { Typography } from "@mui/material";

// Icon
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import HighlightOffIcon from "@mui/icons-material/HighlightOff";
// import ErrorIcon from "@mui/icons-material/Error";

// Notistack
// import { useSnackbar } from "notistack";

const AlertComponent = (props) => {
  // const variant = [];
  const className = [];

  if (props.isSuccess) {
    className.push("AlertComponentSucces");
  }

  if (props.isError) {
    className.push("AlertComponentError");
  }

  if (props.isInfo) {
    className.push("AlertComponentInfo");
  }

  if (props.isWarning) {
    className.push("AlertComponentWarning");
  }

  return (
    <div className="containerAlert">
      <Typography className="AlertTittle">{props.title}</Typography>
      <Typography className="AlertSubTittle">{props.subTittle}</Typography>
      {props.subTittleText !== undefined && (
        <Typography className="AlertSubTittleText">
          {props.subTittleText}
        </Typography>
      )}
    </div>
  );
};

export default AlertComponent;
