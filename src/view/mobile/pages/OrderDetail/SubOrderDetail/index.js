import React, { useEffect, useState } from "react";
// Mui
import {
  Backdrop,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

// Componentts
import HeaderNavigation from "../../../components/HeaderNavigation";
import DeliveryStatus from "../DeliveryStatusDetail/index";

// Icon
// import { ReactComponent as StoreIcon } from "../../../../../assets/icons/store.svg";

// React Router Dom
import { useNavigate, useParams } from "react-router-dom";

// Style
import classes from "./SubOrderDetail.module.scss";

// Const
import { STATUS } from "../../OrderList/constants";

// Redux & libs
import { format, isAfter, parseISO } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import CancelationForm from "../../../../../pages/OrderList/CancelationForm";
import ModalComplainOrder from "../../../../../pages/OrderList/ModalComplainOrder";
import SingleProductRating from "../../../../../pages/OrderList/SingleProductRating";
import { getSubOrderById } from "../../../../../store/getSubOrderById/getSubOrderByIdSlice";
import { postCompleteOrder } from "../../../../../store/postCompleteOrder/postCompleteOrderSlice";
import ProductCard from "../ProductCard";

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

const SubOrderDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderType, orderId, subOrderId } = useParams();

  const [openRatingForm, setOpenRatingForm] = useState(false);
  const [openCancelationForm, setOpenCancelationForm] = useState(false);
  const [openComplainOrderForm, setOpenModalComplainOrderForm] =
    useState(false);

  const isCheckout = orderType === "checkout";
  const orderTypeParam = isCheckout ? "CHECKOUT" : "ORDER";

  const { data: subOrderData, status: getSubOrderDataStatus } = useSelector(
    (state) => state.subOrderById
  );

  const onClickCancelFormOpen = () =>
    setOpenCancelationForm(!openCancelationForm);

  const openModalComplainOrder = () =>
    setOpenModalComplainOrderForm(!openComplainOrderForm);

  const fetchData = () => dispatch(getSubOrderById({ orderId, subOrderId }));

  useEffect(() => {
    fetchData();
  }, []);

  if (getSubOrderDataStatus === "loading") {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={getSubOrderDataStatus === "loading"}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <>
      <HeaderNavigation title="Sub Order Detail" goBack={() => navigate(-1)} />

      <Container>
        <Stack
          direction="column"
          columnGap={8}
          className={classes.orderDetailHeader}
        >
          <div className={classes.orderDetailTextContainer}>
            <Typography className={classes.orderDetailText}>Status</Typography>
            <Typography className={classes.orderDetailStatus}>
              {STATUS.find((item) =>
                item.status?.includes(subOrderData?.status)
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
              {subOrderData?.ref_code}
            </Typography>
          </div>

          <div className={classes.orderDetailTextContainer}>
            <Typography className={classes.orderDetailText}>
              Order Time
            </Typography>
            <Typography className={classes.orderDetailTextBold}>
              {subOrderData?.order_date
                ? format(
                    parseISO(subOrderData?.order_date),
                    "d MMMM yyyy, HH:mm"
                  )
                : "-"}
            </Typography>
          </div>

          <div className={classes.orderDetailTextContainer}>
            <Typography className={classes.orderDetailText}>
              Tracking Code
            </Typography>
            <Typography className={classes.orderDetailTextBold}>
              {subOrderData?.delivery_order?.tracking_number}
            </Typography>
          </div>
        </Stack>

        {/* Divider */}
        <div className={classes.orderDetailDivider} />

        {/* Product Title */}
        <div className={classes.productCardTitle}>Product Detail</div>
        <ProductCard
          detailData={subOrderData?.delivery_order?.items}
          orderType={orderTypeParam}
          isSplitedOrder={false}
          isDigitalProduct={false}
          isSubOrder
        />

        {/* Divider */}
        <div className={classes.orderDetailDivider} />

        {/* Delivery Status */}
        <div className={classes.productCardTitle}>Delivery Status</div>
        <DeliveryStatus orderData={subOrderData} />

        {/* Footer Button */}
        <Grid className={classes.footerButton}>
          <FooterButton
            {...subOrderData}
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
        orderStatus={subOrderData?.status}
        openCancelationForm={openCancelationForm}
        setOpenCancelationForm={setOpenCancelationForm}
      />

      <ModalComplainOrder
        selectedOrder={subOrderData}
        openModal={openComplainOrderForm}
        closeModal={openModalComplainOrder}
        fetchOrders={() => fetchData()}
      />

      <SingleProductRating
        selectedOrder={subOrderData}
        openRatingForm={openRatingForm}
        setOpenRatingForm={setOpenRatingForm}
        fetchOrders={() => fetchData()}
      />
    </>
  );
};

export default SubOrderDetail;
