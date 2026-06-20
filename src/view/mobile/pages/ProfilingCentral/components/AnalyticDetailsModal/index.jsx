import React, { memo } from "react";

// MUI
import { Grid, Typography } from "@mui/material";

// Components
import BottomModal from "../../../../components/BottomModal";

// Styles
import classes from "./_AnalyticDetailsModal.module.scss";

// Constants
import { ChildrenAnalyticDetails } from "../../../../../../constants/childrenAnalytics";

/**
 *
 * @param {{
 * open: boolean;
 * type: "typology" | "keyLearningDimension" | "sensory" | "multipleIntelligence" | "careerInterest";
 * closeModal: () => void;
 * }} param0
 * @returns
 */

const AnalyticDetailsModal = ({ open, type, closeModal }) => {
  const Illustration = ChildrenAnalyticDetails[type]?.mobileIllustration;
  return (
    <BottomModal
      open={open}
      title={ChildrenAnalyticDetails[type]?.title}
      closeModal={closeModal}
    >
      <Grid xs={12} gap={2} className={classes.container}>
        <Grid
          xs={12}
          style={{
            backgroundImage: `url(${Illustration})`,
            objectFit: "cover",
            backgroundPositionX: "center",
            height: 120,
          }}
        />
        <Typography className={classes.description}>
          {ChildrenAnalyticDetails[type]?.description}
        </Typography>
      </Grid>
    </BottomModal>
  );
};

export default memo(AnalyticDetailsModal);
