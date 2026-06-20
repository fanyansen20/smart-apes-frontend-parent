// React
import React from "react";

// MUI Components
import { Grid, Paper, Stack, Typography } from "@mui/material";

// Icons
import { ReactComponent as AlertIcon } from "../../../../../assets/icons/alert.svg";

// Components
import SubOrder from "../SubOrder";

// Styles
import classes from "../_OrderList.module.scss";

// Constants
import { useNavigate } from "react-router-dom";
import { STATUS } from "../constants";

function SplittedOrder({ orderData, category, openOrderDetail }) {
  const {
    id,
    status,
    order_type,
    processing,
    sub_orders,
    price_summary,
    items,
  } = orderData;

  const getCurrentStatus =
    (status === "PROCESSING" ? processing?.processing_status : category) ||
    status;
  const { renderColoredLabel } = STATUS.find((item) =>
    item.status.includes(getCurrentStatus)
  );

  const navigate = useNavigate();

  const orderTypeRoute = order_type === "CHECKOUT" ? "checkout" : "order";

  return (
    <Stack
      direction="column"
      spacing={1.5}
      className={classes.splitedOrderContainer}
      onClick={() => {
        navigate(`/order-detail/${orderTypeRoute}/${id}`);
      }}
    >
      {/* Note for this order */}
      <Paper
        variant="outlined"
        className={classes.noteInfo}
        component={Grid}
        md={6.5}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <AlertIcon />
          <Typography className={classes.noteMsg}>
            This order has been split into {sub_orders?.length} package because
            using
            <span className={classes.ninjaVanText}> NinjaVan. </span>
          </Typography>
        </Stack>
      </Paper>

      {sub_orders?.map((order, idx) => (
        <SubOrder
          key={idx}
          orderType={order_type}
          orderItems={items}
          subOrderData={order}
          openOrderDetail={() => openOrderDetail(idx)}
          renderColoredLabel={renderColoredLabel}
        />
      ))}

      <Grid item md={2.2} className={classes.grandTotalSection}>
        <Typography className={classes.titleContent}>Grand Total</Typography>
        <Typography className={classes.contentGrandTotal}>
          {price_summary?.total_amount_string}
        </Typography>
      </Grid>
    </Stack>
  );
}

export default SplittedOrder;
