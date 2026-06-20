import React, { Fragment, memo, useMemo, useState } from "react";

// MUI
import { Grid, Stack, Typography } from "@mui/material";

// Components
import PrimaryButton from "../../../../../../components/PrimaryButton";
import SecondaryButton from "../../../../../../components/button/SecondaryButton";
import BottomModal from "../../../../components/BottomModal";

// Helper
import { dateFormatter } from "../../../../../../helper/dateFormat";

// Styles
import classes from "./_AssignHistoryItem.module.scss";

/**
 * @typedef {{
 * referenceId: string;
 * name: string;
 * providerName: string;
 * url: string;
 * status: string;
 * createdAt: string;
 * }} AssignHistory
 */

/**
 * @param {{
 * item: AssignHistory;
 * variant?: "modal" | "button";
 * redirectToTakeTest: (url: string) => void;
 * redirectToDownloadReport: (url: string) => void;
 * redirectToSeeSummary: ({referenceId: string}) => void;
 * }} param0
 */

const AssignHistoryItem = ({
  item,
  variant,
  redirectToTakeTest,
  redirectToDownloadReport,
  redirectToSeeSummary,
}) => {
  const isDownloadReport = item.name !== "Profiling Test Basic";

  // #region useState
  const [openModal, setOpenModal] = useState(false);
  // #endregion

  const handleItemOnClick = () => {
    if (variant === "modal" && item.status === "Complete") {
      return setOpenModal(!openModal);
    }
    if (item.status === "Pending") {
      redirectToTakeTest(item.url);
    }
  };

  const Item = useMemo(() => {
    return (
      <Fragment>
        <Grid container gap={1} className={classes.historyContainer}>
          <Grid item xs={12} onClick={handleItemOnClick}>
            <Typography
              className={classes.testTitle}
            >{`${item?.providerName} ${item?.name}`}</Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography className={classes.title}>Status</Typography>
              <Typography className={classes[`status__${item?.status}`]}>
                {item?.status}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography className={classes.title}>Redeem On</Typography>
              <Typography className={classes.value}>
                {dateFormatter({
                  date: item?.createdAt,
                  formatting: "dd MMMM yyyy",
                })}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography className={classes.title}>Test Taken</Typography>
              <Typography className={classes.value}>
                {item?.completedAt
                  ? dateFormatter({
                      date: item?.completedAt,
                      formatting: "dd MMMM yyyy",
                    })
                  : "-"}
              </Typography>
            </Stack>
          </Grid>
          {variant === "button" && item.status === "Complete" && (
            <RenderButton
              isDownloadReport={isDownloadReport}
              seeSummary={() =>
                redirectToSeeSummary({ referenceId: item.referenceId })
              }
            />
          )}
        </Grid>
        {variant === "modal" && (
          <BottomModal
            title={`${item?.providerName} ${item?.name}`}
            open={openModal}
            closeModal={() => setOpenModal(false)}
          >
            <RenderButton
              isDownloadReport={isDownloadReport}
              reportUrl={item.url}
              downloadReport={() => redirectToDownloadReport(item.url)}
              seeSummary={() =>
                redirectToSeeSummary({ referenceId: item.referenceId })
              }
            />
          </BottomModal>
        )}
      </Fragment>
    );
  }, [item, openModal]);

  return Item;
};

/**
 *
 * @param {{
 * downloadReport: () => void;
 * seeSummary: () => void
 * isDownloadReport : boolean
 * }} param0
 * @returns
 */

const RenderButton = ({
  isDownloadReport = true,
  downloadReport,
  seeSummary,
}) => {
  return (
    <Grid container mt={1} gap={1}>
      <SecondaryButton fullWidth onClick={seeSummary}>
        <Typography>See Summary</Typography>
      </SecondaryButton>
      {isDownloadReport && (
        <PrimaryButton fullWidth onClick={downloadReport}>
          <Typography>Download Report</Typography>
        </PrimaryButton>
      )}
    </Grid>
  );
};

export default memo(AssignHistoryItem);
