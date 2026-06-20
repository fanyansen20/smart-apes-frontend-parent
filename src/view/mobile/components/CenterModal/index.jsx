import React from "react";

// MUI
import { Box, Grid, Modal, Typography } from "@mui/material";

// Styles
import classes from "./_CenterModal.module.scss";

/**
 *
 * @param {{
 * title: string;
 * subtitle: string;
 * open: boolean;
 * children: React.ReactNode;
 * closeModal: () => void;
 * }} param0
 */

const CenterModal = ({
  title,
  open,
  children,
  subtitle,
  closeModal,
  ...otherProps
}) => {
  return (
    <Modal
      open={open}
      disableAutoFocus
      {...otherProps}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-subtitle"
      slotProps={{
        backdrop: {
          onClick: closeModal,
        },
      }}
    >
      <Box className={classes.modalContainer}>
        <Grid container gap={1.5}>
          <Typography id="modal-modal-title" className={classes.title}>
            {title}
          </Typography>
          <Typography id="modal-modal-subtitle" className={classes.subtitle}>
            {subtitle}
          </Typography>
          {children}
        </Grid>
      </Box>
    </Modal>
  );
};

export default CenterModal;
