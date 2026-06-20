// React
import React, { useEffect } from "react";

// React Router Dom
import { useNavigate, useParams } from "react-router-dom";

// Style
import classes from "./_DeliveryStatus.module.scss";

// Mui
import {
  Backdrop,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

// Components
import HeaderNavigation from "../../../components/HeaderNavigation";
import DeliveryStatusDetail from "../DeliveryStatusDetail";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getDeliveryHistoryById } from "../../../../../store/getDeliveryHistoryById/getDeliveryHistoryById";

const DeliveryStatus = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderId, subOrderId } = useParams();

  const { data: deliveryHistoryData, status: getDeliveryHistoryStatus } =
    useSelector((state) => state.deliveryHistoryById);

  useEffect(() => {
    dispatch(getDeliveryHistoryById({ orderId, subOrderId }));
  }, []);

  if (getDeliveryHistoryStatus === "loading") {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={getDeliveryHistoryStatus === "loading"}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <>
      <HeaderNavigation title="Delivery Status" goBack={() => navigate(-1)} />

      <Container maxWidth="lg">
        <Grid sx={12}>
          <Stack
            direction="column"
            columnGap={8}
            className={classes.orderDetailHeader}
          >
            <div className={classes.orderDetailTextContainer}>
              <Typography className={classes.orderDetailText}>
                Delivery Services
              </Typography>
              <Typography className={classes.orderDetailTextBold}>
                {deliveryHistoryData?.delivery_service}
              </Typography>
            </div>

            <div className={classes.orderDetailTextContainer}>
              <Typography className={classes.orderDetailText}>
                Tracking Code
              </Typography>
              <Typography className={classes.orderDetailTextBold}>
                {deliveryHistoryData?.tracking_number}
              </Typography>
            </div>

            <DeliveryStatusDetail orderData={deliveryHistoryData} />
          </Stack>
        </Grid>
      </Container>
    </>
  );
};

export default DeliveryStatus;
