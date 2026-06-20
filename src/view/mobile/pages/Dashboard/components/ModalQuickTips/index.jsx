import { Fragment, memo } from "react";

// mui material
import { Box, Fade, Modal, Typography } from "@mui/material";

// styles
import classes from "./_ModalQuickTips.module.scss";

// carousel
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// components
import PrimaryButton from "../../../../../../components/PrimaryButton";
import SecondaryButton from "../../../../../../components/button/SecondaryButton";

// constant
import { responsive, stepperModal } from "./quickTipsConstant";

/**
 * @param {{
 * openModal : boolean
 * closeModal : () =>{}
 * }} props
 * @returns
 */

const CustomDot = ({ onClick, active }) => {
  return (
    <div
      className={active ? classes.activeDot : classes.inactiveDot}
      onClick={() => onClick()}
    />
  );
};

const ButtonGroup = ({ next, previous, ...rest }) => {
  const {
    carouselState: { currentSlide },
    closeModal,
  } = rest;

  return (
    <div className={classes["carousel-button-group"]}>
      {currentSlide > 0 && (
        <Fragment>
          <SecondaryButton
            fullWidth
            onClick={() => (currentSlide === 0 ? closeModal() : previous())}
            className={classes["secondary-button"]}
          >
            Previous Step
          </SecondaryButton>
          <div className={classes.spaceBlock} />
        </Fragment>
      )}
      <PrimaryButton
        fullWidth
        onClick={() => (currentSlide === 4 ? closeModal() : next())}
      >
        {currentSlide === 4 ? "Finish" : "Next Step"}
      </PrimaryButton>
    </div>
  );
};

const ModalQuickTips = ({ openModal, closeModal }) => {
  return (
    <Modal open={openModal}>
      <Fade className={classes.modalQuickTips} in={openModal}>
        <Box>
          <div className={classes.skipButtonContainer}>
            <Typography onClick={closeModal}>Skip</Typography>
          </div>
          <Carousel
            arrows={false}
            showDots
            customDot={<CustomDot />}
            customButtonGroup={<ButtonGroup closeModal={closeModal} />}
            renderButtonGroupOutside
            responsive={responsive}
            containerClass={classes.carouselContainer}
          >
            {stepperModal.map((value, key) => (
              <div className={classes.containerStepperModal} key={key}>
                <div className={classes.imageContent}>
                  <img src={value.imageUrl} alt={value.title} />
                </div>
                <h6>{value.title}</h6>
                <p>{value.content}</p>
              </div>
            ))}
          </Carousel>
        </Box>
      </Fade>
    </Modal>
  );
};

export default memo(ModalQuickTips);
