import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { differenceInDays, parseISO } from "date-fns";
import ColoredLabel from "../../../../components/ColoredLabel";
import LinkText from "../../../../components/link";
import classes from "./_OrderList.module.scss";
import { LabelBox, OrderActionMenu } from "./lib";

export const CANCELLED_SUB_STATUS = [
  {
    cancelledBy: "USER",
    desc: "Cancelled by You",
  },
  {
    cancelledBy: "SELLER",
    desc: "Cancelled by Seller",
  },
  {
    cancelledBy: "NINJAVAN",
    desc: "Cancelled by Ninjavan",
  },
];

export const INSTANT_CANCEL_ORDER_CATEGORY = [
  "PENDING",
  "PENDING_CONFIRMATION",
];

export const CANCELLED_ORDER_STATUS = [
  "PROCESSING",
  "CANCELLED",
  "EXPIRED",
  "ORDER_CANCEL",
];

const printInvoiceBtn = ({ orderId }) => ({
  label: "Print Invoice",
  onClick: () => {
    const linkInvoice = document.createElement("a");
    linkInvoice.target = "_blank";
    linkInvoice.href = `invoice/${orderId}`;
    linkInvoice.click();
  },
});

export const STATUS = [
  {
    status: "PENDING",
    statusLabel: ({ order_type }) =>
      order_type === "ORDER" ? "Waiting For Confirmation" : "Pending Payment",
    transactionStatus: ({ order_type }) =>
      order_type === "ORDER" ? "Waiting" : "Pending Payment",
    splittedOrderActionMenuList: ({
      order_type,
      isMultipleBundle,
      onClickCancelFormOpen,
      handleCloseActionMenu,
    }) =>
      (order_type === "ORDER" || isMultipleBundle) && [
        {
          label: "Cancel Order",
          onClick: () => {
            onClickCancelFormOpen();
            handleCloseActionMenu();
          },
        },
      ],
    renderColoredLabel: ({ order_type, coloredLabelProps }) => (
      <ColoredLabel
        uppercase
        backgroundColor={order_type === "ORDER" ? "#53B1FD" : "#BC3CE9"}
        text={
          order_type === "ORDER"
            ? "Waiting For Confirmation"
            : "Pending Payment"
        }
        {...coloredLabelProps}
      />
    ),
    renderOrderDetailButton: ({
      onClickCancelFormOpen,

      hitpay_payment_url,
      isExpired,
      order_type,
    }) => {
      return (
        <Grid className={classes.orderButtonContainer}>
          {order_type === "CHECKOUT" && (
            <Button
              sx={
                isExpired && {
                  backgroundColor: "#D3D3D3 !important",
                }
              }
              href={hitpay_payment_url}
              target="_blank"
              className={classes.buttonPrimary}
              disabled={isExpired}
            >
              <Typography>Pay Now</Typography>
            </Button>
          )}

          <Button
            fullWidth
            className={classes.buttonPrimaryOutlined}
            onClick={() => onClickCancelFormOpen()}
          >
            <Typography>Cancel Order</Typography>
          </Button>
        </Grid>
      );
    },
    renderFooter: ({ hitpay_payment_url, isExpired, order_type }) => {
      return (
        <Grid className={classes.footerCard}>
          {/* <OrderActionMenu {...orderActionProps} /> */}

          {order_type === "CHECKOUT" && (
            <Button
              sx={
                isExpired && {
                  backgroundColor: "#D3D3D3 !important",
                }
              }
              href={hitpay_payment_url}
              target="_blank"
              className={classes.buttonPayNow}
              disabled={isExpired}
            >
              <Typography>Pay Now</Typography>
            </Button>
          )}
        </Grid>
      );
    },
  },
  {
    status: "PENDING_CONFIRMATION",
    statusLabel: () => "Waiting For Confirmation",
    transactionStatus: () => "Waiting",
    splittedOrderActionMenuList: ({
      onClickCancelFormOpen,
      handleCloseActionMenu,
    }) => [
      {
        label: "Cancel Order",
        onClick: () => {
          onClickCancelFormOpen();
          handleCloseActionMenu();
        },
      },
    ],
    renderColoredLabel: ({ coloredLabelProps }) => (
      <ColoredLabel
        uppercase
        backgroundColor="#53B1FD"
        text="Waiting For Confirmation"
        {...coloredLabelProps}
      />
    ),
    renderFooter: (props) => {
      const menuList = [
        {
          label: "See Order Details",
          onClick: () => {
            props.openOrderDetails();
            props.handleCloseActionMenu();
          },
        },
        {
          label: "Cancel Order",
          onClick: () => {
            props.onClickCancelFormOpen();
            props.handleCloseActionMenu();
          },
        },
      ];
      return (
        <Grid className={classes.footerCard}>
          <OrderActionMenu {...props} menuList={menuList} />
        </Grid>
      );
    },
  },
  {
    status: "PROCESSING",
    statusLabel: () => "Processing",
    transactionStatus: () => "On Process",
    splittedOrderActionMenuList: ({
      orderId,
      onClickCancelFormOpen,
      handleCloseActionMenu,
    }) => [
      printInvoiceBtn({ orderId }),
      {
        label: "Cancel Order",
        onClick: () => {
          onClickCancelFormOpen();
          handleCloseActionMenu();
        },
      },
    ],
    renderColoredLabel: ({ coloredLabelProps }) => (
      <ColoredLabel
        uppercase
        backgroundColor="#85DFF3"
        text="Processing"
        {...coloredLabelProps}
      />
    ),
    renderOrderDetailButton: ({ onClickCancelFormOpen }) => {
      return (
        <Grid className={classes.orderButtonContainer}>
          <Button
            fullWidth
            className={classes.buttonPrimaryOutlined}
            onClick={() => onClickCancelFormOpen()}
          >
            <Typography>Cancel Order</Typography>
          </Button>
        </Grid>
      );
    },
    renderFooter: ({
      orderId,
      openActionMenu,
      handleClickActionMenu,
      handleCloseActionMenu,
      openOrderDetails,
      onClickCancelFormOpen,
      hasCancelStatus,
    }) => {
      const menuList = [
        {
          label: "See Order Details",
          onClick: () => {
            openOrderDetails();
            handleCloseActionMenu();
          },
        },
        printInvoiceBtn({ orderId }),
        {
          label: "Cancel Order",
          onClick: () => {
            onClickCancelFormOpen();
            handleCloseActionMenu();
          },
        },
      ];
      const orderActionProps = {
        orderId,
        menuList,
        openActionMenu,
        handleClickActionMenu,
        handleCloseActionMenu,
        openOrderDetails,
        onClickCancelFormOpen,
      };

      return (
        <Grid className={classes.footerCard} gap={hasCancelStatus && 2}>
          {!hasCancelStatus && <OrderActionMenu {...orderActionProps} />}
          {hasCancelStatus && (
            <LinkText underline="none" onClick={openOrderDetails}>
              See Order Details
            </LinkText>
          )}
        </Grid>
      );
    },
  },
  {
    status: "PACKING",
    statusLabel: () => "Packing",
    transactionStatus: () => "Packing",
    splittedOrderActionMenuList: ({
      orderId,
      onClickCancelFormOpen,
      handleCloseActionMenu,
    }) => [
      printInvoiceBtn({ orderId }),
      {
        label: "Cancel Order",
        onClick: () => {
          onClickCancelFormOpen();
          handleCloseActionMenu();
        },
      },
    ],
    renderColoredLabel: ({ coloredLabelProps }) => (
      <ColoredLabel
        uppercase
        backgroundColor="#85DFF3"
        text="Packing"
        {...coloredLabelProps}
      />
    ),
    renderOrderDetailButton: ({ onClickCancelFormOpen }) => {
      return (
        <Grid className={classes.orderButtonContainer}>
          <Button
            fullWidth
            className={classes.buttonPrimaryOutlined}
            onClick={() => onClickCancelFormOpen()}
          >
            <Typography>Cancel Order</Typography>
          </Button>
        </Grid>
      );
    },
    renderFooter: ({
      openOrderDetails,

      hasCancelStatus,
    }) => {
      return (
        <Grid className={classes.footerCard} gap={hasCancelStatus && 2}>
          {/* {!hasCancelStatus && <OrderActionMenu {...orderActionProps} />} */}
          {hasCancelStatus && (
            <LinkText underline="none" onClick={openOrderDetails}>
              See Order Details
            </LinkText>
          )}
        </Grid>
      );
    },
  },
  {
    status: "READY_TO_DELIVER",
    statusLabel: () => "Ready to Deliver",
    transactionStatus: () => "Ready to Deliver",
    splittedOrderActionMenuList: ({
      orderId,
      onClickCancelFormOpen,
      handleCloseActionMenu,
    }) => [
      printInvoiceBtn({ orderId }),
      {
        label: "Cancel Order",
        onClick: () => {
          onClickCancelFormOpen();
          handleCloseActionMenu();
        },
      },
    ],
    renderColoredLabel: ({ coloredLabelProps }) => (
      <ColoredLabel
        uppercase
        backgroundColor="#85DFF3"
        text="Ready to Deliver"
        {...coloredLabelProps}
      />
    ),
    renderFooter: ({ openOrderDetails, hasCancelStatus }) => {
      return (
        <Grid className={classes.footerCard} gap={hasCancelStatus && 2}>
          {/* {!hasCancelStatus && <OrderActionMenu {...orderActionProps} />} */}
          {hasCancelStatus && (
            <LinkText underline="none" onClick={openOrderDetails}>
              See Order Details
            </LinkText>
          )}
        </Grid>
      );
    },
  },
  {
    status: "WAITING_FOR_PICKUP",
    statusLabel: () => "Waiting to be Pickup",
    transactionStatus: () => "Waiting to be Pickup",
    splittedOrderActionMenuList: ({ orderId }) => [
      printInvoiceBtn({ orderId }),
    ],
    renderColoredLabel: ({ coloredLabelProps }) => (
      <ColoredLabel
        uppercase
        backgroundColor="#85DFF3"
        text="Waiting To Be Pickup"
        {...coloredLabelProps}
      />
    ),
    renderFooter: ({ hasCancelStatus }) => {
      return (
        <Grid className={classes.footerCard} gap={hasCancelStatus && 2}>
          {/* {!hasCancelStatus && <OrderActionMenu {...orderActionProps} />}
          {hasCancelStatus && (
            <LinkText underline="none" onClick={openOrderDetails}>
              See Order Details
            </LinkText>
          )} */}
        </Grid>
      );
    },
  },
  {
    status: "WAITING_TO_DROP_OFF",
    statusLabel: () => "Waiting to be Drop Off",
    transactionStatus: () => "Waiting to be Drop Off",
    splittedOrderActionMenuList: ({ orderId }) => [
      printInvoiceBtn({ orderId }),
    ],
    renderColoredLabel: ({ coloredLabelProps }) => (
      <ColoredLabel
        uppercase
        backgroundColor="#85DFF3"
        text="Waiting to Drop Off"
        {...coloredLabelProps}
      />
    ),
    renderFooter: ({
      orderId,
      openActionMenu,
      handleClickActionMenu,
      handleCloseActionMenu,
      openOrderDetails,
      onClickCancelFormOpen,
      hasCancelStatus,
    }) => {
      const menuList = [
        {
          label: "See Order Details",
          onClick: () => {
            openOrderDetails();
            handleCloseActionMenu();
          },
        },
        printInvoiceBtn({ orderId }),
      ];
      const orderActionProps = {
        orderId,
        menuList,
        openActionMenu,
        handleClickActionMenu,
        handleCloseActionMenu,
        openOrderDetails,
        onClickCancelFormOpen,
      };

      return (
        <Grid className={classes.footerCard} gap={hasCancelStatus && 2}>
          {!hasCancelStatus && <OrderActionMenu {...orderActionProps} />}
          {hasCancelStatus && (
            <LinkText underline="none" onClick={openOrderDetails}>
              See Order Details
            </LinkText>
          )}
        </Grid>
      );
    },
  },
  {
    status: "DELIVERING",
    statusLabel: () => "Delivering",
    transactionStatus: () => "On Delivery",
    splittedOrderActionMenuList: ({
      orderId,
      status_history,
      openModalComplainOrder,
      handleCloseActionMenu,
    }) => {
      const deliveryOrderHistory = status_history?.filter(
        (history) => history.status === "DELIVERING"
      );
      const deliveredOrderDate =
        deliveryOrderHistory &&
        deliveryOrderHistory[deliveryOrderHistory?.length - 1]?.created_at;

      return [
        printInvoiceBtn({ orderId }),
        {
          label: "Complain Order",
          hidden:
            differenceInDays(new Date(), parseISO(deliveredOrderDate)) < 8,
          onClick: () => {
            openModalComplainOrder();
            handleCloseActionMenu();
          },
        },
      ];
    },
    renderColoredLabel: ({ coloredLabelProps }) => (
      <ColoredLabel
        uppercase
        backgroundColor="#AB7AFF"
        text="Delivering"
        {...coloredLabelProps}
      />
    ),
    renderOrderDetailButton: ({ onClickCancelFormOpen }) => {
      return (
        <Grid className={classes.orderButtonContainer + classes.disabled}>
          <Button
            fullWidth
            disabled={true}
            className={classes.buttonPrimaryOutlined}
            onClick={() => onClickCancelFormOpen()}
          >
            <Typography>Cancel Order</Typography>
          </Button>
        </Grid>
      );
    },
    renderFooter: () => {
      return (
        <Grid className={classes.footerCard}>
          {/* <OrderActionMenu {...orderActionProps} menuList={menuList} /> */}
        </Grid>
      );
    },
  },
  {
    status: "DELIVERED",
    statusLabel: () => "Delivered",
    transactionStatus: () => "Delivered",
    splittedOrderActionMenuList: ({
      orderId,
      handleCloseActionMenu,
      openModalComplainOrder,
    }) => [
      printInvoiceBtn({ orderId }),

      {
        label: "Complain Order",
        onClick: () => {
          openModalComplainOrder();
          handleCloseActionMenu();
        },
      },
    ],
    renderColoredLabel: ({ coloredLabelProps }) => (
      <ColoredLabel
        uppercase
        backgroundColor="#7E54F1"
        text="Delivered"
        {...coloredLabelProps}
      />
    ),
    renderOrderDetailButton: ({
      postCompleteOrderAction,
      openModalComplainOrder,
      isLoading,
    }) => {
      return (
        <Grid className={classes.orderButtonContainer}>
          <LoadingButton
            sx={{
              "& .MuiLoadingButton-loadingIndicator": {
                position: "relative",
                left: 0,
              },
            }}
            loading={isLoading}
            loadingPosition="start"
            className={classes.buttonPrimary}
            onClick={postCompleteOrderAction}
          >
            <Typography>Acknowledge Order</Typography>
          </LoadingButton>

          <Button
            fullWidth
            className={classes.buttonPrimaryOutlined}
            onClick={() => openModalComplainOrder()}
          >
            <Typography>Complain Order</Typography>
          </Button>
        </Grid>
      );
    },
    renderFooter: ({ postCompleteOrderAction, isLoading }) => {
      return (
        <Grid className={classes.footerCard}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {/* <OrderActionMenu {...orderActionProps} orderStatus="delivered" /> */}

            <LoadingButton
              sx={{
                "& .MuiLoadingButton-loadingIndicator": {
                  position: "relative",
                  left: 0,
                },
              }}
              loading={isLoading}
              loadingPosition="start"
              className={classes.buttonPayNow}
              onClick={postCompleteOrderAction}
            >
              <Typography>Acknowledge Order</Typography>
            </LoadingButton>
          </Stack>
        </Grid>
      );
    },
  },
  {
    status: "ORDER_COMPLETE",
    statusLabel: () => "Completed Order",
    transactionStatus: () => "Completed Order",
    splittedOrderActionMenuList: ({ orderId }) => [
      printInvoiceBtn({ orderId }),
    ],
    renderColoredLabel: ({ coloredLabelProps }) => (
      <ColoredLabel
        uppercase
        backgroundColor="#32D583"
        text="Completed Order"
        {...coloredLabelProps}
      />
    ),
    renderOrderDetailButton: ({
      giveRatingAction,
      isReviewed,
      shopId,
      shopName,
      productSlug,
      productId,
    }) => {
      const orderAgainProps = {
        href: `${process.env.REACT_APP_MARKETPLACE_URL}/${shopName}/${productSlug}?id=${productId}&shop_id=${shopId}`,
        target: "_blank",
      };

      return (
        <Stack direction="column" spacing={2}>
          <Grid className={classes.orderButtonContainer}>
            {!isReviewed && (
              <Button
                fullWidth
                className={classes.buttonPrimaryOutlined}
                onClick={() => giveRatingAction()}
                {...isReviewed}
              >
                <Typography>Give Ratings</Typography>
              </Button>
            )}

            <Button
              fullWidth
              className={classes.buttonPrimary}
              {...orderAgainProps}
            >
              <Typography>Order Again</Typography>
            </Button>
          </Grid>
        </Stack>
      );
    },
    renderFooter: ({
      handleCloseActionMenu,
      openOrderDetails,
      giveRatingAction,

      isReviewed,
      shopId,
      shopName,
      productId,
      productSlug,
      productType,
    }) => {
      const orderAgainProps = {
        href: `${process.env.REACT_APP_MARKETPLACE_URL}/${shopName}/${productSlug}?id=${productId}&shop_id=${shopId}`,
        target: "_blank",
      };

      const orderDetailOpen = () => {
        openOrderDetails();
        handleCloseActionMenu();
      };

      if (productType === "access_code") {
        return (
          <Stack direction="column" spacing={2}>
            <Grid className={classes.footerCard}>
              <Button
                className={classes.buttonChatBuyer}
                onClick={orderDetailOpen}
                fullWidth
              >
                <Typography>See Order Details</Typography>
              </Button>
            </Grid>
          </Stack>
        );
      }

      return (
        <Stack direction="column" spacing={2}>
          <Grid className={classes.footerCard}>
            {/* <OrderActionMenu {...orderActionProps} menuList={menuList} /> */}

            <Button
              className={classes.buttonPayNow}
              onClick={!isReviewed && giveRatingAction}
              {...(isReviewed ? orderAgainProps : {})}
            >
              <Typography>
                {isReviewed ? "Order Again" : "Give Ratings"}
              </Typography>
            </Button>
          </Grid>

          {!isReviewed && (
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
      );
    },
  },
  {
    status: CANCELLED_ORDER_STATUS,
    statusLabel: () => "Cancelled",
    transactionStatus: () => "Cancelled",
    splittedOrderActionMenuList: ({ orderId }) => [
      printInvoiceBtn({ orderId }),
    ],
    renderColoredLabel: ({ status, coloredLabelProps }) => (
      <ColoredLabel
        uppercase
        backgroundColor={status === "EXPIRED" ? "#F97066" : "#C5C5C5"}
        text={status === "EXPIRED" ? "Order Expired" : "Cancelled"}
        {...coloredLabelProps}
      />
    ),
    renderFooter: (props) => {
      const menuList = [
        {
          label: "See Order Details",
          onClick: () => {
            props.openOrderDetails();
            props.handleCloseActionMenu();
          },
        },
        printInvoiceBtn({ orderId: props?.orderId }),
      ];
      return (
        <Grid className={classes.footerCard}>
          <OrderActionMenu {...props} menuList={menuList} />
        </Grid>
      );
    },
  },
];

export const PRODUCT_TYPES = [
  {
    type: "physical",
    renderLabel: () => <LabelBox bgColor="#8964EE">Physical Products</LabelBox>,
  },
  {
    type: "digital",
    renderLabel: () => <LabelBox bgColor="#FFB84C">Digital Products</LabelBox>,
  },
];

export const REASON_CANCELATION = () => [
  {
    value: "CHANGE_ORDER",
    label: "I need to change the order",
  },
  {
    value: "CHANGE_DELIVERY",
    label: "I need to change the delivery",
  },
  {
    value: "OTHERS",
    label: "I change my mind",
  },
  {
    value: "OTHERS",
    label: "Others",
  },
];

export const COMPLAIN_TYPE = [
  {
    value: "WHOLE_ORDER",
    label: "The whole order",
  },
  {
    value: "ONLY_SPECIFIC_PRODUCT",
    label: "Only specific product",
  },
];

export const ORDERS_CATEGORIES = [
  { label: "All Orders" },
  { label: "Pending Payment", type: "PENDING" },
  { label: "Waiting For Confirmation", type: "PENDING_CONFIRMATION" },
  { label: "Processing", type: "PROCESSING" },
  { label: "Delivering", type: "DELIVERING" },
  { label: "Delivered", type: "DELIVERED" },
  { label: "Completed Order", type: "ORDER_COMPLETE" },
  { label: "Cancelled", type: "CANCELLED" },
];

export const DISPUTED_CATEGORIES = [
  { label: "All", param: "" },
  { label: "Refund Initiated", param: "REFUND_INITIATED" },
  { label: "Return in Progress", param: "RETURN_IN_PROGRESS" },
  { label: "Dispute in Progress", param: "DISPUTE_IN_PROGRESS" },
  { label: "Refund Issued", param: "REFUND_ISSUED" },
  { label: "Rejected", param: "REJECTED" },
  { label: "Closed", param: "CLOSED" },
];

export const DISPUTED_ORDER_STATUS = {
  REFUND_ISSUED: { textLabel: "REFUNDED", color: "#32D583" },
  REFUND_INITIATED: { textLabel: "REFUND INITIATED", color: "#B91C1C" },
  REFUND_REJECTED: { textLabel: "REFUND REJECTED", color: "#B91C1C" },
  RETURN_REJECTED: { textLabel: "RETURN REJECTED", color: "#B91C1C" },
  RETURN_INITIATED: { textLabel: "RETURN INITIATED", color: "#BC3CE9" },
  RETURN_DELIVERING: { textLabel: "RETURN DELIVERING", color: "#BC3CE9" },
  RETURN_DELIVERED: { textLabel: "RETURN DELIVERED", color: "#BC3CE9" },
  DISPUTE_IN_PROGRESS: { textLabel: "DISPUTE IN PROGRESS", color: "#BC3CE9" },
  REPLACEMENT_IN_PROGRESS: {
    textLabel: "REPLACEMENT IN PROGRESS",
    color: "#BC3CE9",
  },
  CLOSED: { textLabel: "CLOSED", color: "#32D583" },
};

export const getDeliveryServiceInfo = ({
  is_using_shop_fleet,
  seller_fleet_name,
  delivery_service_name,
}) =>
  is_using_shop_fleet ? (
    <>
      Seller&apos;s Fleet
      <br />({seller_fleet_name})
    </>
  ) : (
    delivery_service_name || "-"
  );
