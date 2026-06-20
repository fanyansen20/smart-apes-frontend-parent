import React, { Fragment, useState } from "react";

// Mui
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";

// Material
import { Box, Stack, Typography, styled } from "@mui/material";

// Components
import SmartapesDialog from "../../../../../components/Dialog";
import LinkText from "../../../../../components/link";

// Libs
import { format, parseISO } from "date-fns";

// Style
import classes from "./_DeliveryStatusDetail.module.scss";

const DeliveryHistoryTimelineDot = styled(TimelineDot)(() => ({
  // margin: 0,
}));

const DeliveryStatusDetail = ({ orderData }) => {
  const [openProof, setOpenProof] = useState(false);

  const proofPhoto = {
    src: orderData?.sub_orders?.[orderData?.selectedSubOrderIdx]?.delivery_order
      ?.delivered_image,
    alt: `${orderData?.ref_code}-proof`,
  };

  const deliveredProofDesc =
    orderData?.sub_orders?.[orderData?.selectedSubOrderIdx]?.delivery_order
      ?.delivered_description;

  return (
    <>
      <Box className={classes.deliveryTimelineContainer}>
        <Timeline>
          {orderData?.status_history?.map((history, index) => (
            <TimelineItem key={`${history.id + index}`}>
              <TimelineOppositeContent className={classes.dateTimeText}>
                {history?.created_at &&
                  format(parseISO(history?.created_at), "dd MMMM yyyy. HH:mm")}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <DeliveryHistoryTimelineDot />
                {index < orderData?.status_history?.length - 1 && (
                  <TimelineConnector />
                )}
              </TimelineSeparator>
              <TimelineContent className={classes.messageText}>
                {history.message || "-"}

                {history?.status === "DELIVERED" &&
                  orderData?.sub_orders?.[orderData?.selectedSubOrderIdx]
                    ?.delivery_order?.delivered_image && (
                    <LinkText
                      sx={classes.seeProofText}
                      underline="none"
                      onClick={() => setOpenProof(!openProof)}
                    >
                      See Proof
                    </LinkText>
                  )}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>

      <SmartapesDialog
        title="See Proof"
        open={openProof}
        onClose={() => setOpenProof(false)}
      >
        <Stack spacing={2} direction="column">
          <img className="proof-img" {...proofPhoto} />
          <Typography variant="body1">{deliveredProofDesc}</Typography>
        </Stack>
      </SmartapesDialog>
    </>
  );
};

export default DeliveryStatusDetail;
