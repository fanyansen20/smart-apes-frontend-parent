// React
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// React Redux
import { useDispatch, useSelector } from "react-redux";
import { getCheckoutOrders } from "../../../../store/checkoutOrders/checkoutOrdersSlice";
import { getProductsReviewsByOrder } from "../../../../store/getProductsReviewsByOrder/getProductsReviewsByOrderSlice";
import { getOrders } from "../../../../store/orders/orderSlice";
import { getPendingPaymentOrder } from "../../../../store/pendingPaymentOrders/pendingPaymentOrdersSlice";

// Material UI
import {
  Box,
  Container,
  Grid,
  Pagination,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

// Icon
import { ReactComponent as NoOrders } from "../../../../assets/images/no-orders.svg";

// CSS
import classes from "./_OrderList.module.scss";

// Constants
import { DISPUTED_CATEGORIES, ORDERS_CATEGORIES } from "./constants";

// Components
import LoadingAnimation from "../../../../components/LoadingAnimation";
import SecondaryButton from "../../../../components/button/SecondaryButton";
import SearchNavbar from "../../components/SearchNavbar";
import OrderCard from "./OrderCard";

// Helper
import useNotification from "../../../../hooks/useNotification";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <grid
      role="tabpanel"
      className={classes.TabPanel}
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box py={2}>{children}</Box>}
    </grid>
  );
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const OrderList = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: ordersData,
    status: statusGetOrders,
    totalPages,
    totalResults,
    error: errorGetOrders,
  } = useSelector((state) => state.orders);

  const {
    data: pendingPaymentOrdersData,
    status: statusGetPendingPaymentOrdersData,
    totalPages: totalPagesPendingPaymentOrdersData,
    totalResults: totalResultsPendingPaymentOrdersData,
    error: errorGetPendingPaymentOrdersData,
  } = useSelector((state) => state.pendingPaymentOrders);

  const {
    data: checkoutOrdersData,
    status: statusGetCheckoutOrdersData,
    totalPages: totalPagesCheckoutOrdersData,
    totalResults: totalResultsCheckoutOrdersData,
    error: errorGetCheckoutOrdersData,
  } = useSelector((state) => state.checkoutOrders);

  const { status: statusCancelOrder } = useSelector(
    (state) => state.cancelOrder
  );

  const [_msg, sendNotification] = useNotification();
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(1);
  const [active, setActive] = useState(0);
  const [category, setCategory] = useState(null);
  const [openCancelationForm, setOpenCancelationForm] = useState(false);
  const [isModalComplainOrder, setIsModalComplainOrder] = useState(false);

  const handleChangeTab = (_, newValue) => {
    setTabValue(newValue);
  };

  const handlerOpenModalComplainOrder = () => {
    setIsModalComplainOrder(!isModalComplainOrder);
  };

  const onClickTransactionDetails = () => {
    // setOpenTransaction(true);
    // setSelectedOrder(order);
  };

  const onClickBundleDetails = () => {
    // setSelectedBundle(bundle);
    // setOpenBundleDetails(true);
  };

  const giveRatingAction = (order) => {
    if (order?.items?.length > 1) {
      dispatch(getProductsReviewsByOrder({ order_id: order?.id }));
      navigate("/give-ratings");
    }
  };
  const handleChangeCategory = (index, type) => {
    setActive(index);
    setCategory(type);
    setPage(1);
  };
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const fetchOrders = useCallback(async () => {
    if (category === "PENDING") {
      dispatch(
        getPendingPaymentOrder({
          page,
          limit: 5,
          // search,
          status: category,
        })
      );
    } else if (category === "PENDING_CONFIRMATION") {
      dispatch(
        getOrders({
          page,
          limit: 5,
          // search,
          status: "PENDING",
        })
      );
    } else if (!category) {
      dispatch(
        getCheckoutOrders({
          page,
          limit: 5,
          // search,
          type: "all",
        })
      );
    } else if (category === "CANCELLED") {
      dispatch(
        getCheckoutOrders({
          page,
          limit: 5,
          // search,
          type: "cancelled",
        })
      );
    } else {
      dispatch(
        getOrders({
          page,
          limit: 5,
          status: category,
          // search,
        })
      );
    }
    // }, [dispatch, page, category, search]);
  }, [dispatch, page, category]);

  const getCategories = () => {
    if (type === "disputed") {
      return DISPUTED_CATEGORIES;
    }

    return ORDERS_CATEGORIES;
  };

  useEffect(() => {
    setActive(0);
    setCategory(null);
    setPage(1);
  }, [type]);

  useEffect(() => {
    if (errorGetOrders)
      sendNotification({
        msg: errorGetOrders,
        variant: "error",
      });
  }, [errorGetOrders]);

  useEffect(() => {
    // If category order is Processing and Cancel is successfully
    if (category !== "PROCESSING" && statusCancelOrder === "succeeded") {
      const cancelledIndex = ORDERS_CATEGORIES.findIndex(
        (category) => category.type === "CANCELLED"
      );
      handleChangeCategory(cancelledIndex, "CANCELLED");
    }

    // If Category is Processing and Cancel is successfully
    if (category === "PROCESSING" && statusCancelOrder === "succeeded") {
      fetchOrders();
    }
  }, [statusCancelOrder]);

  useEffect(() => {
    if (errorGetPendingPaymentOrdersData)
      sendNotification({
        msg: errorGetPendingPaymentOrdersData,
        variant: "error",
      });
  }, [errorGetPendingPaymentOrdersData]);

  useEffect(() => {
    if (errorGetCheckoutOrdersData)
      sendNotification({
        msg: errorGetCheckoutOrdersData,
        variant: "error",
      });
  }, [errorGetCheckoutOrdersData]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Tab is active
        // Perform actions or update state as needed
        // console.log("tab Triggered");
        fetchOrders();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchOrders]);

  const currentTotalResults = () => {
    if (category === "PENDING") {
      return totalResultsPendingPaymentOrdersData;
    } else if (!category || category === "CANCELLED") {
      return totalResultsCheckoutOrdersData;
    } else {
      return totalResults;
    }
  };

  const currentTotalPages = () => {
    if (category === "PENDING") {
      return totalPagesPendingPaymentOrdersData;
    } else if (!category || category === "CANCELLED") {
      return totalPagesCheckoutOrdersData;
    } else {
      return totalPages;
    }
  };

  const showItems = page * 5;
  const currentItem = page > 1 ? showItems - 4 : page;
  const getOrderParams = useMemo(
    // () => ({ page, limit: 5, status: category, search }),
    () => ({ page, limit: 5, status: category }),
    // [page, category, search]
    [page, category]
  );

  const getOrdersData = () => {
    if (type === "disputed") {
      return [];
    } else if (category === "PENDING") {
      return [...pendingPaymentOrdersData];
    } else if (!category || category === "CANCELLED") {
      return [...checkoutOrdersData];
    } else {
      return [...ordersData];
    }
  };
  const onClickCancelFormOpen = () => {
    setOpenCancelationForm(!openCancelationForm);
    // setSelectedOrder(order);
  };

  const countCurrentTotalPages = currentTotalPages();
  const preventedOrdersStatus = ["loading", "failed"];

  return (
    <>
      <SearchNavbar />

      <Container maxWidth="lg">
        <Grid sx={12}>
          <Tabs
            value={tabValue}
            TabIndicatorProps={{
              style: {
                backgroundColor: "#bc3ce9",
              },
            }}
            sx={{
              ".Mui-selected": {
                color: `#bc3ce9`,
              },
            }}
            textColor="inherit"
            variant="fullWidth"
            onChange={handleChangeTab}
          >
            <Tab label="Order" {...a11yProps(0)} />
            <Tab label="Disputed Order" {...a11yProps(1)} />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Grid container className={classes.container}>
              <Stack
                direction="row"
                columnGap={5}
                className={classes.categoryTab}
              >
                {getCategories().map((category, index) => (
                  <SecondaryButton
                    key={category + index}
                    className={`${classes.categoryButton} ${
                      index === active && classes.activeCategory
                    }`}
                    onClick={() => handleChangeCategory(index, category.type)}
                  >
                    {category.label}
                  </SecondaryButton>
                ))}
              </Stack>

              {(statusGetOrders === "loading" ||
                statusGetPendingPaymentOrdersData === "loading" ||
                statusGetCheckoutOrdersData === "loading") && (
                <Grid item sx="12" md="12">
                  <Stack
                    sx={{ padding: "22vh", alignItems: "center" }}
                    justifyContent="center"
                  >
                    <LoadingAnimation size={60} thickness={4} />
                  </Stack>
                </Grid>
              )}

              {!preventedOrdersStatus.includes(statusGetOrders) &&
                !preventedOrdersStatus.includes(
                  statusGetPendingPaymentOrdersData
                ) &&
                !preventedOrdersStatus.includes(
                  statusGetCheckoutOrdersData
                ) && (
                  <>
                    {getOrdersData()?.map((orderData) => (
                      <OrderCard
                        splittedOrder={orderData?.sub_orders?.length > 1}
                        key={orderData?.id}
                        orderData={orderData}
                        handlerOpenModalComplainOrder={
                          handlerOpenModalComplainOrder
                        }
                        onClickBundleDetails={onClickBundleDetails}
                        onClickTransactionDetails={onClickTransactionDetails}
                        getOrderParams={getOrderParams}
                        category={category}
                        setCategory={(category) =>
                          handleChangeCategory(
                            ORDERS_CATEGORIES.indexOf(
                              ORDERS_CATEGORIES.find(
                                (item) => item.type === category
                              )
                            ),
                            category
                          )
                        }
                        giveRatingAction={giveRatingAction}
                        onClickCancelFormOpen={onClickCancelFormOpen}
                      />
                    ))}

                    {getOrdersData().length === 0 && (
                      <Grid item md="12">
                        <Stack
                          sx={{
                            padding: "4vh",
                            alignItems: "center",
                            "& svg": {
                              marginBottom: 8,
                            },
                            "& h5": {
                              fontWeight: "bold",
                            },
                          }}
                          justifyContent="center"
                          rowGap={1}
                        >
                          <NoOrders />
                          <Typography variant="h5">No Order</Typography>
                          <Typography variant="subtitle1">
                            No Order for Current Status.
                          </Typography>
                        </Stack>
                      </Grid>
                    )}

                    {getOrdersData().length > 0 && (
                      <Grid container className={classes.bottomCard}>
                        <Typography>
                          Showing {currentItem} to{" "}
                          {showItems > currentTotalResults()
                            ? currentTotalResults()
                            : showItems}{" "}
                          of {currentTotalResults()} entries
                        </Typography>
                        <Pagination
                          page={page}
                          count={countCurrentTotalPages}
                          onChange={handleChangePage}
                        />
                      </Grid>
                    )}
                  </>
                )}
            </Grid>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            second tab
          </TabPanel>
        </Grid>
      </Container>
    </>
  );
};

export default OrderList;
