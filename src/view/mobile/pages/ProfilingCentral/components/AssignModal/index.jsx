import React, { memo, useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getAssignAbleTest } from "../../../../../../store/profilingTest/getAssignAbleTest";

// MUI
import { Grid, Typography } from "@mui/material";

// Components
import PrimaryButton from "../../../../../../components/PrimaryButton";
import BottomModal from "../../../../components/BottomModal";
import AssignTestItem from "../AssignTestItem";

// Styles
import classes from "./_AssignModal.module.scss";

/**
 *
 * @param {{
 * open: boolean;
 * checkedData: any;
 * closeModal: ({isChangeTab: boolean}) => void;
 * handleSelectPackage: (data: any) => void;
 * handleSubmit: () => void;
 * }} param0
 * @returns
 */

const AssignModal = ({
  open,
  checkedData,
  closeModal,
  handleSelectPackage,
  handleSubmit,
}) => {
  const dispatch = useDispatch();

  // #region redux state
  const { assignAbleData, status } = useSelector(
    (store) => store.resAssignAbleTest
  );
  // #endregion

  // #region useEffect
  useEffect(() => {
    if (status === "idle") {
      dispatch(getAssignAbleTest({ providerName: "Grip Learning" }));
    }
  }, []);
  // #endregion

  return (
    <BottomModal
      title="Assign Profiling Test"
      open={open}
      closeModal={closeModal}
    >
      <Grid container gap={1} mb={2} direction="column">
        <Typography className={classes.subtitle}>
          Make sure you redeem all the test before expired
        </Typography>
      </Grid>
      <Grid container xs={12} gap={1} mb={2}>
        {/* Profiling Test List */}
        {assignAbleData.map((item, index) => {
          const itemSelected = checkedData === item;
          if (item.qty > 0) {
            return (
              <AssignTestItem
                key={index}
                item={item}
                itemSelected={itemSelected}
                handleSelectPackage={handleSelectPackage}
              />
            );
          }
        })}
      </Grid>
      <PrimaryButton
        disabled={!checkedData}
        fullWidth
        className={classes.submitButton}
        onClick={handleSubmit}
      >
        Assign On
      </PrimaryButton>
    </BottomModal>
  );
};

export default memo(AssignModal);
