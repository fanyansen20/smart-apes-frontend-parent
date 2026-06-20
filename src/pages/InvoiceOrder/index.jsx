// React
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

// MUI
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Stack,
} from "@mui/material";

// Helper
import { intToSGD } from "../../helper/currency";

// Utils
import { format, parseISO } from "date-fns";

// Styles
import classes from "./InvoiceOrder.module.scss";

// Assets
import { ReactComponent as PrintIcon } from "../../assets/icons/print.svg";
import { ReactComponent as Logo } from "../../assets/images/brand-black.svg";
import { ReactComponent as ErrorImg } from "../../assets/images/ErrorIllustration.svg";
import PaidStamp from "../../assets/images/paid-stamp.svg";
import { getOrderById } from "../../store/getOrderById/getOrderByIdSlice";

const InvoiceOrder = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { data: orderData, status: getOrderDataStatus } = useSelector(
    (state) => state.orderById
  );

  useEffect(() => {
    dispatch(getOrderById({ orderId }));
  }, []);

  if (getOrderDataStatus === "loading") {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={getOrderDataStatus === "loading"}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (getOrderDataStatus === "failed") {
    return (
      <Stack flexDirection="column" justifyContent="center" alignItems="center">
        <ErrorImg />
        <p>Invoice Not Found</p>
        <Link to="/orders">
          <Button className={classes.btnDefault}>Back to Order</Button>
        </Link>
      </Stack>
    );
  }

  return (
    <div className={classes.container}>
      <section className={classes.appBar}>
        <Container maxWidth="lg">
          <Button onClick={() => window.print()} startIcon={<PrintIcon />}>
            Print
          </Button>
        </Container>
      </section>
      <Container maxWidth="lg">
        <section className={classes.content}>
          <div className={classes.wrapper}>
            <div className={classes.header}>
              <Logo />
              <div>
                <h1>ORDER No.</h1>
                <p className={classes.invoiceText}>{orderData?.ref_code}</p>
              </div>
            </div>
            <div className={classes.orderSummary}>
              <table>
                <tbody>
                  <tr>
                    <td className={classes.title} style={{ width: "35%" }}>
                      Recipient Address
                    </td>
                    <td className={classes.title} style={{ width: "30%" }}>
                      Buyer&apos;s Name
                    </td>
                    <td className={classes.title} style={{ width: "35%" }}>
                      Transaction Date
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan="3" className={classes.label}>
                      {orderData?.delivery_info?.destination?.address}
                      <br />
                      {orderData?.buyer?.phone_number}
                    </td>
                    <td className={classes.label}>{orderData?.buyer?.name}</td>
                    <td className={classes.label}>
                      {orderData?.order_date &&
                        format(
                          parseISO(orderData?.order_date),
                          "d MMMM yyyy HH:mm"
                        )}
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.title}>Seller&apos;s Name</td>
                    <td className={classes.title}>Payment Method</td>
                  </tr>
                  <tr>
                    <td className={classes.label}>{orderData?.shop?.name}</td>
                    <td className={classes.label}>
                      {orderData?.payment_method}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr />
            <div className={classes.orderItem}>
              <table>
                <thead>
                  <tr className={classes.tableHeader}>
                    <th style={{ textAlign: "left", width: "45%" }}>
                      Item Name
                    </th>
                    <th style={{ width: "15%" }}>Qty.</th>
                    <th style={{ width: "20%" }}>Price</th>
                    <th style={{ width: "20%" }}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData?.items?.map((item, index) => (
                    <tr key={index} className={classes.tableContent}>
                      <td>{item?.title}</td>
                      <td style={{ textAlign: "center" }}>{item?.qty}</td>
                      <td style={{ textAlign: "center" }}>
                        {intToSGD(item?.item_base_price)}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {intToSGD(item?.item_base_price * item?.qty)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <hr />
            <div className={classes.deliveryService}>
              <table>
                <thead>
                  <tr className={classes.tableHeader}>
                    <th style={{ textAlign: "left", width: "45%" }}>
                      Delivery Services
                    </th>
                    <th style={{ width: "15%" }}>Item Weight</th>
                    <th style={{ width: "20%", padding: "0px" }}></th>
                    <th style={{ width: "20%" }}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={classes.tableContent}>
                    <td>
                      {orderData?.delivery_info?.is_using_shop_fleet
                        ? "Seller's Fleet"
                        : `${orderData?.sub_orders?.[0]?.delivery_order?.delivery_type?.delivery_service?.company_name?.toUpperCase()} (${
                            orderData?.sub_orders?.[0]?.delivery_order
                              ?.delivery_type?.delivery_service?.code
                          })`}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {orderData?.delivery_info?.total_weight?.value}
                      {orderData?.delivery_info?.total_weight?.unit}
                    </td>
                    <td></td>
                    <td style={{ textAlign: "center" }}>
                      {orderData?.delivery_info?.total_delivery_fee_string}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr />
            <div className={classes.totalPrice}>
              <p className={classes.discountText}>Discount</p>
              <p className={classes.discountText}>
                {`- ${intToSGD(
                  orderData?.price_summary?.total_product_discount_price
                )}`}
              </p>
            </div>
            <div className={classes.totalPrice}>
              <p className={classes.discountText}>Member Discount</p>
              <p className={classes.discountText}>
                {`- ${intToSGD(
                  orderData?.price_summary?.total_membership_discount_price
                )}`}
              </p>
            </div>
            <div className={classes.totalPrice}>
              <p className={classes.label}>Grand Total</p>
              <p className={classes.data}>
                {orderData?.price_summary?.total_amount_string}
              </p>
            </div>
          </div>
        </section>
      </Container>
      <img className={classes.stamp} src={PaidStamp} alt="paid" />
    </div>
  );
};

export default InvoiceOrder;
