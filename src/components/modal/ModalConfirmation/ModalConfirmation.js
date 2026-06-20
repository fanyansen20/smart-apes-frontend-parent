// MUI $ styles
import { Box, Button, Fade, Grid, Modal } from "@mui/material";
import classes from "./ModalConfirmation.module.scss";

const ModalConfirmation = (props) => {
  const {
    open,
    title,
    subTitle,
    handlerClose,
    handlerConfirm,
    isMobileView = false,
  } = props;

  const confirmModal = () => {
    handlerClose();
    handlerConfirm();
  };

  const fadeClassName = isMobileView
    ? classes.ModalConfirmationMobile
    : classes.ModalConfirmation;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handlerClose}
      closeAfterTransition
    >
      <Fade className={fadeClassName} in={open}>
        <Box>
          <Grid container gap={1}>
            <Grid item xs={12} md={12}>
              <p className={classes.modalTitle}>{title}</p>
            </Grid>
            <Grid item xs={12} md={12}>
              <p className={classes.subModalTitle}>{subTitle}</p>
            </Grid>
            <Grid container justifyContent="flex-end" alignItems="center">
              <Button onClick={handlerClose} className={classes.btnCancel}>
                Cancel
              </Button>
              <Button onClick={confirmModal} className={classes.btnConfirm}>
                Confirm
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalConfirmation;
