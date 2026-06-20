import React from "react";

// MUI
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Modal, Slide, Stack, Typography } from "@mui/material";

// Styles
import classes from "./_BottomModal.module.scss";

/**
 *
 * @param {{
 * title: string;
 * open: boolean;
 * children: React.ReactNode;
 * closeModal: () => void;
 * }} param0
 */

const BottomModal = ({ title, open, children, closeModal, ...otherProps }) => {
  return (
    <Modal
      open={open}
      onClose={closeModal}
      disableAutoFocus
      disableEscapeKeyDown
      {...otherProps}
    >
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Box className={classes.modalContainer}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography id="modal-modal-title">{title}</Typography>
            <ClearIcon onClick={closeModal} />
          </Stack>
          {children}
        </Box>
      </Slide>
    </Modal>
  );
};

export default BottomModal;
