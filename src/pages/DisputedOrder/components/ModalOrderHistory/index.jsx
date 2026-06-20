import React from "react";

// Mui material
import { Grid } from "@mui/material";

// component
import SmartapesDialog from "../../../../components/Dialog";

// styles
import ExpendText from "../../../../components/ExpendText";
import classes from "./_OrderHistory.module.scss";

// assets

// helper

const ModalOrderHistory = ({
  open,
  histories,
  onClose,
  handlerPreviewProof,
}) => {
  const getHistoryText = (text) => {
    const strongWord = text.substring(
      text.indexOf("{") + 1,
      text.lastIndexOf("}")
    );

    const baseText = text.replace(/{.*}/, "");

    return (
      <p>
        {baseText}{" "}
        {strongWord && <span className={classes.strongWord}>{strongWord}</span>}
      </p>
    );
  };

  return (
    <SmartapesDialog
      fullWidth
      disableDivider
      open={open}
      title="Disputed History"
      onClose={onClose}
      titleProps={{
        sx: {
          fontSize: "24px",
          fontWeight: "700",
        },
      }}
    >
      <Grid className={classes.containerDetailHistory}>
        <table>
          <tbody>
            {histories?.length > 0 ? (
              histories?.map((history, index) => (
                <tr key={index}>
                  <td className={classes.timelineTitle}>
                    {history?.createdAt}
                  </td>
                  <td className={classes.lineDot}>
                    <p></p>
                  </td>
                  <td className={classes.timelineContent}>
                    <Grid container gap={0.6} direction="column">
                      {getHistoryText(history?.text)}
                      {history?.reason && (
                        <p className={classes.timelineReason}>
                          Reason :{" "}
                          <span className={classes.timelineReasonContent}>
                            {history?.reason}
                          </span>
                        </p>
                      )}
                      {history?.description && (
                        <ExpendText
                          additionalText="Description : "
                          text={history?.description}
                          limitText={57}
                          className={classes.timelineReasonContent}
                        />
                      )}
                      <div className={classes.containerProofOrder}>
                        {history?.attachments?.map((attachment, key) => {
                          if (attachment?.type === "image") {
                            return (
                              <img
                                key={key}
                                src={attachment?.url}
                                onClick={() => handlerPreviewProof(attachment)}
                              />
                            );
                          }
                          if (attachment?.type === "video") {
                            return (
                              <video
                                key={key}
                                src={attachment?.url}
                                onClick={() => handlerPreviewProof(attachment)}
                                preload="metadata"
                              />
                            );
                          }
                        })}
                      </div>
                    </Grid>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No order history</td>
              </tr>
            )}
          </tbody>
        </table>
      </Grid>
    </SmartapesDialog>
  );
};

export default ModalOrderHistory;
