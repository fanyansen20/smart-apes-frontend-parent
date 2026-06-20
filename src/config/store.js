import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import { rtkQueryApi } from "../api/rtkQueryApi.js";
import appConfigReducer from "../store/appConfig/appConfigSlice";
import cancelCheckoutReducer from "../store/cancelCheckout/cancelCheckoutSlice";
import cancelOrderReducer from "../store/cancelOrder/cancelOrderSlice";
import categoriesReducer from "../store/categories/categoriesSlice";
import checkEmailSlice from "../store/checkEmail/checkEmailSlice";
import checkoutOrdersReducer from "../store/checkoutOrders/checkoutOrdersSlice";
import getAllChildrenSlice from "../store/children/getAllChildren";
import getCheckoutByIdSlice from "../store/getCheckoutById/getCheckoutByIdSlice.js";
import deliveryHistoryByIdSlice from "../store/getDeliveryHistoryById/getDeliveryHistoryById.js";
import getOrderByIdSlice from "../store/getOrderById/getOrderByIdSlice";
import getProductsReviewsByOrderReducer from "../store/getProductsReviewsByOrder/getProductsReviewsByOrderSlice";
import getSubOrderByIdSlice from "../store/getSubOrderById/getSubOrderByIdSlice.js";
import locationReducer from "../store/location/locationSlice";
import membershipReducer from "../store/membership/membershipSlice";
import disputedOrderSlice from "../store/orders/disputedOrder/getDisputedOrderSlice.js";
import complainReasonsSlice from "../store/orders/getComplainReasons";
import orderReducer from "../store/orders/orderSlice";
import pendingPaymentOrdersReducer from "../store/pendingPaymentOrders/pendingPaymentOrdersSlice";
import postCompleteOrderReducer from "../store/postCompleteOrder/postCompleteOrderSlice";
import getAssignAbleTestSlice from "../store/profilingTest/getAssignAbleTest";
import getAssignedProfilingTestHistorySlice from "../store/profilingTest/getAssignedProfilingTestHistory";
import getChildProfilingTestAnalyticSlice from "../store/profilingTest/getChildProfilingTestAnalytic";
import getChildrenSummaryTestSlice from "../store/profilingTest/getChildrenSummaryTest";
import getCountProfilingTestSlice from "../store/profilingTest/getCountProfilingTest";
import getTestProductSlice from "../store/profilingTest/getTestProduct";
import getTestTrackerSlice from "../store/profilingTest/getTestTracker";
import reviewRatingsReducer from "../store/reviewRatings/reviewRatingsSlice";
import childReducer from "../store/user/childSlice";
import userAddressReducer from "../store/user/userAddressSlice";
import userReducer from "../store/user/userSlice";
import walletBalanceReducer from "../store/wallet/walletBalanceSlice";
import walletHistoryReducer from "../store/wallet/walletHistorySlice";

const reducers = combineReducers({
  user: userReducer,
  userAddress: userAddressReducer,
  child: childReducer,
  categories: categoriesReducer,
  complainReasons: complainReasonsSlice,
  orders: orderReducer,
  checkoutOrders: checkoutOrdersReducer,
  getAllChildren: getAllChildrenSlice,
  postCompleteOrder: postCompleteOrderReducer,
  resAssignAbleTest: getAssignAbleTestSlice,
  resAssignHistory: getAssignedProfilingTestHistorySlice,
  resChildrenAnalytics: getChildProfilingTestAnalyticSlice,
  resChildrenSummaryTest: getChildrenSummaryTestSlice,
  resCountProfilingTest: getCountProfilingTestSlice,
  productProfilingTest: getTestProductSlice,
  resTestTrackerSlice: getTestTrackerSlice,
  pendingPaymentOrders: pendingPaymentOrdersReducer,
  location: locationReducer,
  cancelOrder: cancelOrderReducer,
  cancelCheckout: cancelCheckoutReducer,
  membership: membershipReducer,
  appConfig: appConfigReducer,
  reviewRatings: reviewRatingsReducer,
  getProductsReviewsByOrder: getProductsReviewsByOrderReducer,
  walletHistory: walletHistoryReducer,
  walletBalance: walletBalanceReducer,
  checkEmail: checkEmailSlice,
  orderById: getOrderByIdSlice,
  subOrderById: getSubOrderByIdSlice,
  deliveryHistoryById: deliveryHistoryByIdSlice,
  checkoutById: getCheckoutByIdSlice,
  disputedOrder: disputedOrderSlice,
  [rtkQueryApi.reducerPath]: rtkQueryApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "userAddress"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

// Proxy reducer
const reducerProxy = (state, action) => {
  if (action.type === "logout/LOGOUT") {
    return persistedReducer(undefined, action);
  }
  return persistedReducer(state, action);
};

export const store = configureStore({
  reducer: reducerProxy,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk].concat(rtkQueryApi.middleware),
});

export const persistor = persistStore(store);
