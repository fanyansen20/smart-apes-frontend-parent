import React, { useEffect, useState } from "react";
// Style
import classes from "./_OrderDetail.module.scss";

// React Router
import { useLocation, useNavigate, useParams } from "react-router-dom";

// Material
import {
  Backdrop,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

// Icon
import { ReactComponent as StoreIcon } from "../../../../assets/icons/store.svg";

// Components
import LinkText from "../../../../components/link";
import CancelationForm from "../../../../pages/OrderList/CancelationForm";
import ModalComplainOrder from "../../../../pages/OrderList/ModalComplainOrder";
import SingleProductRating from "../../../../pages/OrderList/SingleProductRating";
import HeaderNavigation from "../../components/HeaderNavigation";
import ProductCard from "./ProductCard";

// Libs
import { format, isAfter, parseISO } from "date-fns";

// Redux & Helper
import { useDispatch, useSelector } from "react-redux";
import { intToSGD } from "../../../../helper/currency";
import { getCheckoutById } from "../../../../store/getCheckoutById/getCheckoutByIdSlice";
import { getOrderById } from "../../../../store/getOrderById/getOrderByIdSlice";
import { postCompleteOrder } from "../../../../store/postCompleteOrder/postCompleteOrderSlice";

// Constants

import { STATUS } from "../OrderList/constants";

const FooterButton = ({
  has_review,
  verification,
  user_payment,
  order_type,
  shopId,
  shopName,
  productSlug,
  productId,
  status,
  setOpenRatingForm,
  onClickCancelFormOpen,
  openModalComplainOrder,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();

  const { loading } = useSelector((store) => store.postCompleteOrder);

  const isExpired =
    (verification?.deadline_date &&
      isAfter(new Date(), parseISO(verification?.deadline_date))) ||
    (user_payment?.deadline_date &&
      isAfter(new Date(), parseISO(user_payment?.deadline_date)));

  const postCompleteOrderAction = () => {
    dispatch(postCompleteOrder({ order_id: orderId })).then(() =>
      navigate("/order-list")
    );
  };

  const orderDetailFooterButton = STATUS.find((item) =>
    item.status.includes(status)
  );

  if (orderDetailFooterButton?.renderOrderDetailButton) {
    return orderDetailFooterButton?.renderOrderDetailButton({
      giveRatingAction: () => setOpenRatingForm(true),
      postCompleteOrderAction,
      onClickCancelFormOpen,
      openModalComplainOrder,
      isReviewed: has_review,
      shopId,
      shopName,
      productSlug,
      productId,
      isLoading: loading,
      hitpay_payment_url:
        user_payment?.hitpay?.hitpay_payment_url ||
        user_payment?.paypal?.payment_url,
      isExpired,
      order_type,
    });
  }
};

const OrderDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { orderType, orderId } = useParams();

  const [openRatingForm, setOpenRatingForm] = useState(false);
  const [openCancelationForm, setOpenCancelationForm] = useState(false);
  const [openComplainOrderForm, setOpenModalComplainOrderForm] =
    useState(false);

  const { data: orderData, status: getOrderDataStatus } = useSelector(
    (state) => state.orderById
  );
  const { data: checkoutData, status: getCheckoutDataStatus } = useSelector(
    (state) => state.checkoutById
  );

  const isCheckout = orderType === "checkout";

  const fetchData = () => {
    if (isCheckout) dispatch(getCheckoutById({ orderId }));
    else dispatch(getOrderById({ orderId }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const detailData = isCheckout ? checkoutData : orderData;
  const orderTypeParam = isCheckout ? "CHECKOUT" : "ORDER";

  const isProductDiscount =
    detailData?.price_summary?.total_product_discount_price > 0;

  const valueIfHasDiscount = (isDiscountValue, notDiscountValue) =>
    isProductDiscount ? isDiscountValue : notDiscountValue;

  // #region Membership Discount Data
  const firstMembershipDiscountItem = detailData?.items
    ? detailData?.items[0]?.membership_discount
    : undefined;

  const hasMembershipDiscount =
    detailData?.price_summary?.item_membership_discount_prices &&
    firstMembershipDiscountItem;

  const memberShipDiscountType = hasMembershipDiscount
    ? firstMembershipDiscountItem?.tier
    : "Free";
  // #endregion

  const isSplitedOrder = detailData?.sub_orders?.length > 1;
  const subOrderId = detailData?.sub_orders?.[0]?.sub_order_id;

  const onClickCancelFormOpen = () =>
    setOpenCancelationForm(!openCancelationForm);

  const openModalComplainOrder = () =>
    setOpenModalComplainOrderForm(!openComplainOrderForm);

  const isDigitalProduct =
    Object.keys(detailData).length > 0 &&
    (orderType === "order"
      ? detailData?.type === "access_code"
      : detailData?.types[0]?.shops[0]?.type === "access_code");

  const isMultipleShopCheckout =
    isCheckout && detailData?.types?.[0]?.shops?.length > 1;

  // Shop and Product Details
  const shopName = isCheckout
    ? detailData?.types?.[0]?.shops?.[0]?.items?.[0]?.title
    : detailData?.shop?.name;

  const deliveryAddressText = isCheckout
    ? `${detailData?.delivery?.receiver?.address_detail}, ${detailData?.delivery?.receiver?.country_name}, ${detailData?.delivery?.receiver?.postal_code}`
    : detailData?.delivery_info?.destination?.address;

  if (getOrderDataStatus === "loading" || getCheckoutDataStatus === "loading") {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={getOrderDataStatus === "loading"}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <>
      <HeaderNavigation title="Order Detail" goBack={() => navigate(-1)} />

      <Container>
        <Grid sx={12}>
          <Stack
            direction="column"
            columnGap={8}
            className={classes.orderDetailHeader}
          >
            <div className={classes.orderDetailTextContainer}>
              <Typography className={classes.orderDetailText}>
                Status
              </Typography>
              <Typography className={classes.orderDetailStatus}>
                {STATUS.find((item) =>
                  item.status?.includes(detailData?.status)
                )?.transactionStatus({
                  order_type: orderTypeParam,
                })}
              </Typography>
            </div>

            <div className={classes.orderDetailTextContainer}>
              <Typography className={classes.orderDetailText}>
                Order Number
              </Typography>
              <Typography className={classes.orderDetailTextBold}>
                {detailData?.ref_code}
              </Typography>
            </div>

            <div className={classes.orderDetailTextContainer}>
              <Typography className={classes.orderDetailText}>
                Order Time
              </Typography>
              <Typography className={classes.orderDetailTextBold}>
                {detailData?.order_date
                  ? format(
                      parseISO(orderData?.order_date),
                      "d MMMM yyyy, HH:mm"
                    )
                  : "-"}
              </Typography>
            </div>
          </Stack>
        </Grid>

        <div className={classes.orderDetailDivider} />

        {/* Product Title */}
        <div className={classes.productCardTitle}>Product Detail</div>
        {!isCheckout && (
          <Stack direction="row" alignItems="center" spacing={1.2}>
            <Typography className={classes.orderDetailShopName}>
              <StoreIcon />
              <span className={classes.shopName}>{shopName}</span>
            </Typography>
          </Stack>
        )}
        <ProductCard
          detailData={detailData}
          orderType={orderTypeParam}
          isSplitedOrder={isSplitedOrder}
          isDigitalProduct={isDigitalProduct}
        />

        <div className={classes.orderDetailDivider} />
        {/* Delivery Details */}
        {!isDigitalProduct && (
          <>
            <div className={classes.productCardTitle}>
              Delivery Details
              {!isCheckout && !isSplitedOrder && (
                <LinkText
                  sx={classes.seeProofText}
                  underline="none"
                  onClick={() =>
                    navigate(
                      `${pathname}/sub-order/${subOrderId}/delivery-status`
                    )
                  }
                >
                  See Status
                </LinkText>
              )}
            </div>
            <Grid sx={12}>
              <Stack
                direction="column"
                columnGap={8}
                className={classes.deliveryDetailContainer}
              >
                {!isMultipleShopCheckout && (
                  <div className={classes.deliveryDetailContainer}>
                    <Typography className={classes.deliveryDetailText}>
                      Delivery Services
                    </Typography>
                    <Typography className={classes.deliveryDetailText}>
                      {detailData?.delivery_info?.delivery_service_name}
                    </Typography>
                  </div>
                )}

                <div className={classes.deliveryDetailContainer}>
                  <Typography className={classes.deliveryDetailText}>
                    Delivery Address
                  </Typography>
                  <Typography className={classes.deliveryDetailText}>
                    {deliveryAddressText}
                  </Typography>
                </div>

                {!isCheckout && !isSplitedOrder && (
                  <div className={classes.deliveryDetailContainer}>
                    <Typography className={classes.deliveryDetailText}>
                      Tracking Code
                    </Typography>
                    <Typography className={classes.deliveryDetailText}>
                      {
                        detailData?.sub_orders?.[0]?.delivery_order
                          ?.tracking_number
                      }
                    </Typography>
                  </div>
                )}
              </Stack>
            </Grid>
          </>
        )}

        {/* <div className={classes.orderDetailDivider} />
        <div className={classes.productCardTitle}>Delivery Status</div>
        <DeliveryStatus orderData={orderData} /> */}

        <div className={classes.orderDetailDivider} />
        <div className={classes.productCardTitle}>Payment Details</div>

        <Stack
          direction="column"
          columnGap={8}
          className={classes.orderDetailHeader}
        >
          <div className={classes.orderDetailTextContainer}>
            <Typography className={classes.orderDetailText}>Price</Typography>
            <Typography className={classes.orderDetailTextBold}>
              {intToSGD(detailData?.price_summary?.total_item_base_price)}
            </Typography>
          </div>

          <div className={classes.orderDetailTextContainer}>
            <Typography className={classes.orderDetailText}>
              Delivery Cost
            </Typography>
            <Typography className={classes.orderDetailTextBold}>
              {detailData?.delivery_info?.total_delivery_fee_string ||
                detailData?.price_summary?.total_delivery_price_string ||
                "S$0.00"}
            </Typography>
          </div>

          <Divider sx={{ borderStyle: "dashed" }} variant="middle" />

          <div className={classes.orderDetailTextContainer}>
            <Typography className={classes.orderDetailText}>
              Sub Total
            </Typography>
            <Typography className={classes.orderDetailTextBold}>
              {intToSGD(
                detailData?.price_summary?.total_item_base_price +
                  (detailData?.price_summary?.delivery_fee ||
                    detailData?.price_summary?.total_delivery_price)
              )}
            </Typography>
          </div>

          <div className={classes.orderDetailTextContainer}>
            <Typography className={classes.orderDetailText}>
              Product Discount
            </Typography>
            <Typography className={classes.orderDetailTextBold}>
              {`-${intToSGD(
                detailData?.price_summary?.total_product_discount_price
              )}`}
            </Typography>
          </div>

          {!isDigitalProduct && (
            <div className={classes.orderDetailTextContainer}>
              <Typography className={classes.orderDetailText}>
                {`Membership Discount (${memberShipDiscountType})`}
              </Typography>
              <Typography className={classes.orderDetailTextBold}>
                {`-${intToSGD(
                  detailData?.price_summary?.total_membership_discount_price
                )}`}
              </Typography>
            </div>
          )}

          <Divider sx={{ borderStyle: "dashed" }} variant="middle" />

          <div className={classes.orderDetailTextContainer}>
            <Typography className={classes.orderDetailText}>
              Grand Total
            </Typography>
            <Typography className={classes.orderDetailTextBold}>
              {detailData?.price_summary?.total_amount_string}
            </Typography>
          </div>
        </Stack>

        <Grid className={classes.footerButton}>
          <FooterButton
            {...detailData}
            order_type={orderTypeParam}
            setOpenRatingForm={setOpenRatingForm}
            onClickCancelFormOpen={onClickCancelFormOpen}
            openModalComplainOrder={openModalComplainOrder}
          />
        </Grid>
      </Container>

      <CancelationForm
        orderId={orderId}
        orderType={orderTypeParam}
        orderStatus={detailData?.status}
        openCancelationForm={openCancelationForm}
        setOpenCancelationForm={setOpenCancelationForm}
      />

      <ModalComplainOrder
        selectedOrder={detailData}
        openModal={openComplainOrderForm}
        closeModal={openModalComplainOrder}
        fetchOrders={() => fetchData()}
      />

      <SingleProductRating
        selectedOrder={detailData}
        openRatingForm={openRatingForm}
        setOpenRatingForm={setOpenRatingForm}
        fetchOrders={() => fetchData()}
      />
    </>
  );
};

export default OrderDetail;
