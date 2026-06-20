import React from "react";

// mui materials
import { Grid } from "@mui/material";

// Constants
import { ChildrenAnalyticDetails } from "../../../../../../../../../constants/childrenAnalytics";

// assets
import classes from "./_AnalyticDetailsModal.module.scss";

// component
import SmartapesDialog from "../../../../../../../../../components/Dialog";
import SecondaryButton from "../../../../../../../../../components/button/SecondaryButton";

/**
 * @param {{
 * open: boolean;
 * type: "typology" | "keyLearningDimension" | "sensory" | "multipleIntelligence" | "careerInterest";
 * closeModal: () => void;
 * }} param0
 * @returns
 */

const AnalyticDetailsModal = ({ open, type, closeModal }) => {
  const Illustration = ChildrenAnalyticDetails[type]?.desktopIllustration;

  return (
    <SmartapesDialog fullWidth maxWidth="md" open={open} disableDivider>
      <Grid
        container
        gap={2}
        direction="row"
        flexWrap="nowrap"
        className={classes.containerExplainModal}
      >
        <Grid item>{Illustration && <Illustration />}</Grid>
        <Grid item container direction="column" justifyContent="space-between">
          <Grid container direction="column" gap={1} mt={2}>
            <h6>{ChildrenAnalyticDetails[type]?.title}</h6>
            <p>{ChildrenAnalyticDetails[type]?.description}</p>
          </Grid>
          <Grid item alignSelf="end">
            <SecondaryButton onClick={closeModal}>Close</SecondaryButton>
          </Grid>
        </Grid>
      </Grid>
    </SmartapesDialog>
  );
};

export default AnalyticDetailsModal;
