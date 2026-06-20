import { memo } from "react";

// mui material
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { IconButton, Modal } from "@mui/material";

// styles
import classes from "./_ModalQuickTips.module.scss";

// carousel
import Carousel from "react-multi-carousel";

// components
import PrimaryButton from "../../../../../../components/PrimaryButton";
import SecondaryButton from "../../../../../../components/button/SecondaryButton";

// constant
import { stepperModal } from "./quickTipsContant";

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
      <SecondaryButton
        fullWidth
        onClick={() => (currentSlide === 0 ? closeModal() : previous())}
      >
        {currentSlide === 0 ? "Close" : "Previous Step"}
      </SecondaryButton>
      <div className={classes.spaceBlock}></div>
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
      <div className={classes.containerModalQuickTips}>
        <IconButton onClick={closeModal} className={classes.btnClose}>
          <CancelRoundedIcon fontSize="large" color="inherit" />
        </IconButton>
        <Carousel
          arrows={false}
          showDots
          customDot={<CustomDot />}
          customButtonGroup={<ButtonGroup closeModal={closeModal} />}
          renderButtonGroupOutside
          responsive={{
            desktop: {
              breakpoint: { max: 3000, min: 0 },
              items: 1,
            },
          }}
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
      </div>
    </Modal>
  );
};

export default memo(ModalQuickTips);
