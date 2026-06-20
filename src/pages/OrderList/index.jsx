// React
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// React Redux
import { useDispatch, useSelector } from "react-redux";
import { getCheckoutOrders } from "../../store/checkoutOrders/checkoutOrdersSlice";
import { getProductsReviewsByOrder } from "../../store/getProductsReviewsByOrder/getProductsReviewsByOrderSlice";
import { getOrders } from "../../store/orders/orderSlice";
import { getPendingPaymentOrder } from "../../store/pendingPaymentOrders/pendingPaymentOrdersSlice";

// Material UI
import {
  Container,
  Grid,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useSnackbar } from "notistack";

// Icon
import SearchIcon from "@mui/icons-material/Search";
import { ReactComponent as NoOrders } from "../../assets/images/no-orders.svg";

// CSS
import classes from "./OrderList.module.scss";

// Constants
import { DISPUTED_CATEGORIES, ORDERS_CATEGORIES } from "./constants";

// Components
import LoadingAnimation from "../../components/LoadingAnimation";
import BundleDetails from "./BundleDetails";
import CancelationForm from "./CancelationForm";
import ModalComplainOrder from "./ModalComplainOrder";
import OrderCard from "./OrderCard";
import SingleProductRating from "./SingleProductRating";
import TransactionDetails from "./TransactionDetails";

const InputTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "5px",
    backgroundColor: "#fff",
    "& fieldset": {
      borderColor: "#D7D7D7",
      fontFamily: "Poppins",
    },
    "&:hover fieldset": {
      borderColor: "#D7D7D7",
      fontFamily: "Poppins",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#D7D7D7",
      fontFamily: "Poppins",
    },
  },
});

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

  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);
  const [active, setActive] = useState(0);
  const [search, setSearch] = useState(null);
  const [category, setCategory] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedBundle, setSelectedBundle] = useState({});
  const [openRatingForm, setOpenRatingForm] = useState(false);
  const [openTransaction, setOpenTransaction] = useState(false);
  const [openBundleDetails, setOpenBundleDetails] = useState(false);
  const [openCancelationForm, setOpenCancelationForm] = useState(false);
  const [isModalComplainOrder, setIsModalComplainOrder] = useState(false);

  const handlerOpenModalComplainOrder = (order) => {
    setSelectedOrder(order);
    setIsModalComplainOrder(!isModalComplainOrder);
  };

  const onClickTransactionDetails = (order) => {
    setOpenTransaction(true);
    setSelectedOrder(order);
  };

  const onClickBundleDetails = (bundle) => {
    setSelectedBundle(bundle);
    setOpenBundleDetails(true);
  };

  const giveRatingAction = (order) => {
    if (order?.items?.length > 1) {
      dispatch(getProductsReviewsByOrder({ order_id: order?.id }));
      navigate("/give-ratings");
      setSelectedOrder(null);
    } else {
      setOpenRatingForm(true);
      setSelectedOrder(order);
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
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const fetchOrders = useCallback(async () => {
    if (category === "PENDING") {
      dispatch(
        getPendingPaymentOrder({
          page,
          limit: 5,
          search,
          status: category,
        })
      );
    } else if (category === "PENDING_CONFIRMATION") {
      dispatch(
        getOrders({
          page,
          limit: 5,
          search,
          status: "PENDING",
        })
      );
    } else if (!category) {
      dispatch(
        getCheckoutOrders({
          page,
          limit: 5,
          search,
          type: "all",
        })
      );
    } else if (category === "CANCELLED") {
      dispatch(
        getCheckoutOrders({
          page,
          limit: 5,
          search,
          type: "cancelled",
        })
      );
    } else {
      dispatch(
        getOrders({
          page,
          limit: 5,
          status: category,
          search,
        })
      );
    }
  }, [dispatch, page, category, search]);

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
    if (errorGetPendingPaymentOrdersData) {
      enqueueSnackbar(errorGetPendingPaymentOrdersData, {
        autoHideDuration: 3000,
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  }, [errorGetPendingPaymentOrdersData, enqueueSnackbar]);

  useEffect(() => {
    if (errorGetCheckoutOrdersData) {
      enqueueSnackbar(errorGetCheckoutOrdersData, {
        autoHideDuration: 3000,
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  }, [errorGetCheckoutOrdersData, enqueueSnackbar]);

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
    () => ({ page, limit: 5, status: category, search }),
    [page, category, search]
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
  const onClickCancelFormOpen = (order) => {
    setOpenCancelationForm(!openCancelationForm);
    setSelectedOrder(order);
  };

  const countCurrentTotalPages = currentTotalPages();
  const preventedOrdersStatus = ["loading", "failed"];

  return (
    <>
      <Container maxWidth="lg">
        <Grid container className={classes.content}>
          <Grid item md={8} className={classes.title}>
            <Typography>
              {type === "order" && "Orders"}
              {type === "disputed" && "Disputed Order"}
            </Typography>
          </Grid>
          <Grid item md={4} className={classes.filterProducts}>
            <InputTextField
              label="Search Transaction ID"
              variant="outlined"
              size="small"
              value={search}
              onChange={handleChangeSearch}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                fontSize: "1.9em",
                "& .MuiFormLabel-root": {
                  color: "#CFCFCF",
                  fontFamily: '"Poppins"',
                  fontSize: 14,
                },
                "& .MuiInputBase-input": {
                  fontFamily: '"Poppins"',
                  color: "#CFCFCF",
                },
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "#CFCFCF",
                  fontFamily: '"Poppins"',
                },
                "& .MuiSvgIcon-root": {
                  color: "#CFCFCF",
                },
              }}
            />

            {/* <Button
              variant="outlined"
              className={classes.filterButton}
              startIcon={<TuneIcon />}
            >
              Filter
            </Button> */}
          </Grid>
        </Grid>
        <Grid container className={classes.container}>
          <Stack direction="row" columnGap={5} className={classes.categoryTab}>
            {getCategories().map((category, index) => (
              <Typography
                key={`${category.label}${index}`}
                Button
                sx={{ color: active === index && "#333333 !important" }}
                onClick={() => handleChangeCategory(index, category.type)}
              >
                {category.label}
              </Typography>
            ))}
          </Stack>
          {(statusGetOrders === "loading" ||
            statusGetPendingPaymentOrdersData === "loading" ||
            statusGetCheckoutOrdersData === "loading") && (
            <Grid item md="12">
              <Stack
                sx={{ padding: "12vh", alignItems: "center" }}
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
            !preventedOrdersStatus.includes(statusGetCheckoutOrdersData) && (
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
      </Container>

      <TransactionDetails
        openTransactionDetails={openTransaction}
        setOpenTransactionDetails={setOpenTransaction}
        selectedOrderData={selectedOrder || ordersData[0]}
        selectedCategory={category}
      />

      <CancelationForm
        orderId={selectedOrder?.id}
        orderType={selectedOrder?.order_type}
        orderStatus={selectedOrder?.status}
        openCancelationForm={openCancelationForm}
        setOpenCancelationForm={setOpenCancelationForm}
      />

      <SingleProductRating
        selectedOrder={selectedOrder}
        openRatingForm={openRatingForm}
        setOpenRatingForm={setOpenRatingForm}
        fetchOrders={fetchOrders}
      />

      <ModalComplainOrder
        openModal={isModalComplainOrder}
        closeModal={handlerOpenModalComplainOrder}
        selectedOrder={selectedOrder}
        fetchOrders={fetchOrders}
      />

      <BundleDetails
        openBundleDetails={openBundleDetails}
        setOpenBundleDetails={setOpenBundleDetails}
        selectedBundle={selectedBundle}
      />
    </>
  );
};

export default OrderList;
