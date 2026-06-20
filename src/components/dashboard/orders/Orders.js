// React
import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getCheckoutOrders } from "../../../store/checkoutOrders/checkoutOrdersSlice";

// Components
import LoadingAnimation from "../../LoadingAnimation";

// MUI Components
import { Button, Grid, Stack } from "@mui/material";
import { useSnackbar } from "notistack";

// Helper
import { format, parseISO } from "date-fns";
import { intToSGD } from "../../../helper/currency";

// SVG Icons
import { ReactComponent as NoOrders } from "../../../assets/images/no-orders.svg";

// Constants
import { ninjavanTrackStatus } from "../../../constants/orders";
import { STATUS } from "../../../pages/OrderList/constants";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {
    data: ordersData,
    status: statusGetOrders,
    error: errorGetOrders,
  } = useSelector((state) => state.checkoutOrders);

  const [showTrackingOrders, setShowTrackingOrders] = useState([]);

  const handleToggleDetails = (idx) => {
    const currentShowTrackingOrders = [...showTrackingOrders];

    // currentShowTrackingOrders.splice(idx, 1, !currentShowTrackingOrders[idx]);
    currentShowTrackingOrders[idx] = !currentShowTrackingOrders[idx];
    setShowTrackingOrders(currentShowTrackingOrders);
  };

  useEffect(() => {
    dispatch(getCheckoutOrders({ page: 1, limit: 5, type: "all" }));
  }, [dispatch]);

  useEffect(() => {
    if (errorGetOrders) {
      enqueueSnackbar(errorGetOrders, {
        autoHideDuration: 3000,
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  }, [errorGetOrders, enqueueSnackbar]);

  if (ordersData.length === 0) {
    return (
      <div className="dashboardNoChild">
        <NoOrders />
        <h3>No Orders Yet</h3>
        <h5>
          Don’t worry. If you already order something, it will appear here
        </h5>
      </div>
    );
  }

  return (
    <div className="container_dashboard_orders">
      <table style={{ width: "100%" }} className="dashboard_order_table">
        <thead>
          <tr style={{ lineHeight: "30px" }}>
            <th style={{ width: "15%" }}>Purchase ID</th>
            <th style={{ width: "15%" }}>Store Name</th>
            <th style={{ width: "5%" }}></th>
            <th style={{ width: "15%" }}>Products</th>
            <th style={{ width: "15%" }}>Status</th>
            <th style={{ width: "10%" }}>Grand Total</th>
            <th style={{ width: "15%" }}></th>
          </tr>
        </thead>
      </table>
      <table style={{ width: "100%" }} className="dashboard_order_table_list">
        {statusGetOrders === "loading" && (
          <Grid item md="12">
            <Stack
              sx={{ padding: "12vh", alignItems: "center" }}
              justifyContent="center"
            >
              <LoadingAnimation size={60} thickness={4} />
            </Stack>
          </Grid>
        )}
        {statusGetOrders === "succeeded" &&
          ordersData?.map((orderData, index) => {
            const getItems = () => {
              const items = [];

              if (orderData?.order_type === "CHECKOUT") {
                orderData?.shops?.map((shop) =>
                  shop?.items.map((item) => items.push(item))
                );
              }

              if (orderData?.order_type === "ORDER") {
                orderData?.items?.map((item) => items.push(item));
              }

              return items;
            };
            const getCurrentStatus =
              orderData?.status !== "PROCESSING"
                ? orderData?.status
                : orderData?.processing?.processing_status;
            const preventShowPendingOrderTracking =
              orderData?.status !== "PENDING";
            const firstProductItemVariant = getItems()?.[0]
              ?.product?.active_variant_detail?.variant_combo?.map(
                (combo) => combo?.value
              )
              ?.join(" ,");
            const firstProductItemTitle = `${getItems()?.[0]?.title}${
              firstProductItemVariant ? ` - ${firstProductItemVariant}` : ""
            }`;

            const imageProduct =
              getItems()?.[0]?.product?.active_variant_detail?.image_url ||
              getItems()?.[0]?.product?.cover_image_url ||
              getItems()?.[0]?.access_code?.cover_image_url;

            return (
              <React.Fragment key={index}>
                <tbody
                  className="dashboard_order_row"
                  onClick={() => handleToggleDetails(index)}
                >
                  <tr>
                    <td
                      style={{
                        width: "15%",
                        color: "#7E54F1",
                        fontSize: "12px",
                      }}
                    >
                      {orderData.ref_code}
                    </td>
                    <td
                      style={{
                        width: "15%",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                    >
                      {orderData?.shop?.name || orderData?.shops?.[0].name}
                    </td>
                    <td style={{ width: "5%", textAlign: "right" }}>
                      <img
                        className="dashboard_order_picture"
                        src={imageProduct}
                        alt="items"
                      />
                    </td>
                    <td
                      style={{
                        width: "15%",
                        textAlign: "left",
                        paddingLeft: "1em",
                      }}
                    >
                      <div>
                        <p className="dashboard_order_item">
                          {firstProductItemTitle}
                        </p>
                        {!showTrackingOrders[index] &&
                        orderData?.items?.length > 1 ? (
                          <p className="dashboard_order_item_qty">
                            with +{orderData?.items?.length - 1} More products
                          </p>
                        ) : (
                          <p className="dashboard_order_item_price">
                            {`${getItems()?.[0]?.qty} x ${intToSGD(
                              getItems()?.[0]?.active_discount?.final_price ||
                                getItems()?.[0]?.base_price
                            )}`}
                          </p>
                        )}
                      </div>
                    </td>
                    <td style={{ width: "15%" }}>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {STATUS.find((item) =>
                          item?.status.includes(getCurrentStatus)
                        )?.renderColoredLabel({
                          order_type: orderData?.order_type,
                        })}
                      </div>
                    </td>
                    <td style={{ width: "10%" }}>
                      <p>
                        {showTrackingOrders[index] && getItems().length > 1
                          ? getItems()?.[0]?.total_price_string
                          : orderData?.price_summary?.total_amount_string}
                      </p>
                    </td>
                    <td style={{ width: "15%" }}>
                      <Button
                        className="dashboard_btn_detail_order"
                        onClick={() => navigate("/order-list")}
                      >
                        See Details
                      </Button>
                    </td>
                  </tr>
                  {showTrackingOrders[index] &&
                    getItems().length > 1 &&
                    getItems().map((item, index) => {
                      const productImage =
                        item?.product?.active_variant_detail?.image_url ||
                        item?.image_url ||
                        item?.product?.cover_image_url;
                      const variantTitle =
                        item?.product?.active_variant_detail?.variant_combo
                          ?.map((combo) => combo?.value)
                          ?.join(", ");
                      const productTitle = `${item?.title}${
                        variantTitle ? ` - ${variantTitle}` : ""
                      }`;
                      return (
                        index !== 0 && (
                          <tr key={index}>
                            <td
                              colSpan={3}
                              style={{ width: "5%", textAlign: "right" }}
                            >
                              <img
                                className="dashboard_order_picture"
                                src={productImage}
                                alt="items"
                              />
                            </td>
                            <td
                              style={{
                                width: "15%",
                                textAlign: "left",
                                paddingLeft: "1em",
                              }}
                            >
                              <div>
                                <p className="dashboard_order_item">
                                  {productTitle}
                                </p>
                                <p className="dashboard_order_item_price">
                                  {`${item?.qty} x ${intToSGD(
                                    item?.active_discount?.final_price ||
                                      item?.base_price
                                  )}`}
                                </p>
                              </div>
                            </td>
                            <td style={{ width: "15%" }}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                {STATUS.find((item) =>
                                  item?.status.includes(getCurrentStatus)
                                )?.renderColoredLabel({
                                  order_type: orderData?.order_type,
                                })}
                              </div>
                            </td>
                            <td style={{ width: "10%" }}>
                              <p>{item?.total_price_string}</p>
                            </td>
                            <td style={{ width: "15%" }}></td>
                          </tr>
                        )
                      );
                    })}
                </tbody>
                <tbody
                  style={
                    showTrackingOrders[index]
                      ? { visibility: "visible" }
                      : {
                          display: "none",
                        }
                  }
                >
                  {!ninjavanTrackStatus.includes(orderData?.status) &&
                    preventShowPendingOrderTracking &&
                    orderData.status_history?.map((value, idx) => (
                      <tr key={idx} className="dashboard_tracking_row">
                        <td colSpan={2} className="dashboard_tracking_time">
                          <p>
                            {format(
                              parseISO(value?.created_at),
                              "dd MMMM yyyy. HH:mm"
                            )}
                          </p>
                        </td>
                        <td
                          colSpan={4}
                          className={
                            idx === orderData.status_history.length - 1
                              ? "dashboard_tracking_status__last"
                              : "dashboard_tracking_status"
                          }
                        >
                          <p>{value?.message}</p>
                        </td>
                      </tr>
                    ))}
                  {ninjavanTrackStatus.includes(orderData?.status) &&
                    Array.isArray(orderData?.sub_orders) &&
                    orderData?.sub_orders?.[0]?.status_history?.map(
                      (trackValue, trackIdx) => (
                        <tr key={trackIdx} className="dashboard_tracking_row">
                          <td colSpan={2} className="dashboard_tracking_time">
                            <p>
                              {format(
                                parseISO(trackValue?.created_at),
                                "dd MMMM yyyy. HH:mm"
                              )}
                            </p>
                          </td>
                          <td
                            colSpan={4}
                            className={
                              trackIdx ===
                              orderData?.sub_orders?.[0]?.delivery_order
                                ?.tracking?.length -
                                1
                                ? "dashboard_tracking_status__last"
                                : "dashboard_tracking_status"
                            }
                          >
                            <p>{trackValue?.message || "-"}</p>
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
                <tbody>
                  <tr className="dashboard_order_gap"></tr>
                </tbody>
              </React.Fragment>
            );
          })}
      </table>
    </div>
  );
};

export default memo(Orders);
