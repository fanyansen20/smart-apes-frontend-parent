// React
import React, { useState } from "react";

// React Redux
import { useSelector } from "react-redux";

// MUI Components
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Menu,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

// MUI Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Icons
import { ReactComponent as AlertIcon } from "../../../assets/icons/alert.svg";

// Libs
import { paramCase } from "change-case";
import { OrderActionMenu } from "../lib";

// Components
import LinkText from "../../../components/link";
import SubOrder from "../SubOrder";

// Styles
import classes from "../OrderList.module.scss";

// Constants
import { intToSGD } from "../../../helper/currency";
import { STATUS, getDeliveryServiceInfo } from "../constants";

function SplittedOrder({
  orderData,
  category,
  openOrderDetail,
  giveRatingAction,
  onClickCancelFormOpen,
  postCompleteOrderAction,
  openModalComplainOrder,
}) {
  const {
    id,
    shop,
    status,
    status_history,
    delivery_info,
    delivery,
    price_summary,
    order_type,
    processing,
    sub_orders,
    items,
    has_review,
  } = orderData;
  const postCompleteOrderState = useSelector(
    (state) => state.postCompleteOrder
  );
  const [openActionMenu, setActionMenu] = useState(null);
  const [openTotalSummary, setOpenTotalSummary] = useState(null);
  const getCurrentStatus =
    (status === "PROCESSING" ? processing?.processing_status : category) ||
    status;
  const { renderColoredLabel, transactionStatus, splittedOrderActionMenuList } =
    STATUS.find((item) => item.status.includes(getCurrentStatus));
  const handleClickActionMenu = (event) => {
    setActionMenu(event.currentTarget);
  };
  const handleCloseActionMenu = () => {
    setActionMenu(null);
  };
  const handleClickTotalSummary = (event) => {
    setOpenTotalSummary(event.currentTarget);
  };
  const handleCloseTotalSummary = () => {
    setOpenTotalSummary(null);
  };
  const orderAgainProps = {
    href: `${process.env.REACT_APP_MARKETPLACE_URL}/${paramCase(
      shop?.name || ""
    )}/${items[0]?.product?.slug}?id=${items[0]?.product?.id}&shop_id=${
      shop?.shop_id || items[0]?.product?.shop_id
    }`,
    target: "_blank",
  };
  const receiverAddress =
    delivery_info?.destination.address ||
    `${delivery?.receiver?.address_detail}, ${delivery?.receiver?.country_name}, ${delivery?.receiver?.postal_code}`;
  return (
    <Stack direction="column" spacing={1.5}>
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
            {/* <LinkText underline="none">Learn More</LinkText> */}
          </Typography>
        </Stack>
      </Paper>

      {/* Delivery and Total Information */}
      <Card className={classes.cardBody} variant="outlined">
        <CardContent component={Grid} container spacing={3}>
          <Grid item md={4.3}>
            <Stack direction="column">
              <Typography className={classes.titleContent}>
                Delivery Address
              </Typography>
              <Typography className={classes.bodyContent}>
                {receiverAddress}
              </Typography>
            </Stack>
          </Grid>
          <Grid item md={3.6}>
            <Stack direction="column">
              <Typography className={classes.titleContent}>
                Delivery Services
              </Typography>
              <Typography className={classes.bodyContent}>
                {getDeliveryServiceInfo({
                  is_using_shop_fleet:
                    delivery_info?.is_using_shop_fleet ||
                    delivery?.senders?.[0].is_using_shop_fleet,
                  seller_fleet_name:
                    delivery_info?.shop_fleet?.mode ||
                    delivery?.senders?.[0]?.shop_fleet?.mode,
                  delivery_service_name:
                    sub_orders[0]?.delivery_order?.delivery_type
                      ?.delivery_service?.code ||
                    delivery?.senders?.[0]?.delivery_service?.code,
                })}
                <br />
                {`Delivery Fee 
                    ${
                      delivery_info?.total_delivery_fee_string ||
                      intToSGD(delivery?.senders?.[0]?.total_delivery_fee)
                    }`}
              </Typography>
            </Stack>
          </Grid>
          <Grid item md={2} className={classes.grandTotalSection}>
            <Typography className={classes.titleContent}>
              Grand Total
            </Typography>
            <Typography className={classes.contentGrandTotal}>
              {price_summary?.total_amount_string}
              <IconButton
                size="small"
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClickTotalSummary}
              >
                <ExpandMoreIcon fontSize="small" />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={openTotalSummary}
                open={Boolean(openTotalSummary)}
                onClose={handleCloseTotalSummary}
                PaperProps={{
                  style: {
                    width: "26ch",
                    "& ul": {
                      padding: 0,
                    },
                  },
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 500,
                    bgcolor: "background.paper",
                    padding: 0,
                  }}
                >
                  <ListItem>
                    <Typography
                      className={classes.totalPriceHeader}
                      variant="h6"
                    >
                      Total Details
                    </Typography>
                  </ListItem>
                  <ListItem className={classes.totalPriceItem}>
                    <Typography
                      className={classes.totalPriceLabel}
                      variant="body1"
                    >
                      Product Total
                    </Typography>
                    <Typography
                      className={classes.totalPriceValue}
                      variant="body1"
                    >
                      {price_summary?.total_item_price_string}
                    </Typography>
                  </ListItem>
                  <Divider component="li" />
                  <ListItem className={classes.totalPriceItem}>
                    <Typography
                      className={classes.totalPriceLabel}
                      variant="body1"
                    >
                      Shipping Cost
                    </Typography>
                    <Typography
                      className={classes.totalPriceValue}
                      variant="body1"
                    >
                      {delivery_info?.total_delivery_fee_string ||
                        intToSGD(delivery?.senders?.[0]?.total_delivery_fee)}
                    </Typography>
                  </ListItem>
                </List>
              </Menu>
            </Typography>
          </Grid>
        </CardContent>
        <CardContent>
          <Stack direction="column" spacing={2}>
            <Stack className={classes.footerCard} direction="row" spacing={0.5}>
              <OrderActionMenu
                orderId={id}
                orderStatus={transactionStatus({ order_type })?.toLowerCase()}
                openActionMenu={openActionMenu}
                handleClickActionMenu={handleClickActionMenu}
                handleCloseActionMenu={handleCloseActionMenu}
                onClickCancelFormOpen={onClickCancelFormOpen}
                menuList={splittedOrderActionMenuList({
                  orderId: id,
                  order_type,
                  status_history,
                  onClickCancelFormOpen,
                  openModalComplainOrder,
                  handleCloseActionMenu,
                })}
              />
              {status === "ORDER_COMPLETE" && (
                <Button
                  sx={{
                    width: "8vw !important",
                  }}
                  className={classes.buttonPayNow}
                  onClick={!has_review && giveRatingAction}
                  {...(has_review ? orderAgainProps : {})}
                >
                  <Typography>
                    {has_review ? "Order Again" : "Give Ratings"}
                  </Typography>
                </Button>
              )}
              {status === "DELIVERED" && (
                <LoadingButton
                  sx={{
                    width: "11vw !important",
                    gap: "10px",
                    "& .MuiLoadingButton-loadingIndicator": {
                      position: "relative",
                      left: 0,
                    },
                  }}
                  loading={
                    postCompleteOrderState.status === "loading" &&
                    postCompleteOrderState.currentId === id
                  }
                  loadingPosition="start"
                  className={classes.buttonPayNow}
                  onClick={postCompleteOrderAction}
                >
                  <Typography>Acknowledge Order</Typography>
                </LoadingButton>
              )}
            </Stack>
            {status === "ORDER_COMPLETE" && !has_review && (
              <LinkText
                {...orderAgainProps}
                right="1.75vw"
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
              >
                Order Again
              </LinkText>
            )}
          </Stack>
        </CardContent>
      </Card>

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
    </Stack>
  );
}

export default SplittedOrder;
