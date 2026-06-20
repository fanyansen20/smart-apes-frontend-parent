import React, { Fragment, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { Button } from "@mui/material";

const useNotification = () => {
  const [conf, setConf] = useState({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const action = (key) => (
    <Fragment>
      <Button
        sx={{ color: "white", textTransform: "none" }}
        size="small"
        onClick={() => {
          closeSnackbar(key);
        }}
      >
        Dismiss
      </Button>
    </Fragment>
  );
  useEffect(() => {
    if (conf?.msg) {
      const variant = conf.variant || "info";
      enqueueSnackbar(conf.msg, {
        variant,
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        action,
      });
    }
  }, [conf]);
  return [conf, setConf];
};

export default useNotification;
