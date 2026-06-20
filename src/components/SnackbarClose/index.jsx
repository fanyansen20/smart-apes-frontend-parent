import React from "react";
import { useSnackbar } from "notistack";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

function SnackbarClose({ snackbarKey }) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton
      sx={{
        color: "white",
        textTransform: "none",
        "&:hover": {
          backgroundColor: "transparent",
        },
      }}
      size="small"
      onClick={() => closeSnackbar(snackbarKey)}
    >
      <ClearIcon fontSize="inherit" />
    </IconButton>
  );
}

export default SnackbarClose;
