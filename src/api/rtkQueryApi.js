import { createApi } from "@reduxjs/toolkit/query/react";
import { API } from "../config/api";

const getAxiosResponseData = (res) => ({
  data: res?.data,
});

const getAxiosError = (err) => ({
  error: {
    status: err?.response?.status,
    data: err?.response?.data || err.message,
  },
});

export const rtkQueryApi = createApi({
  reducerPath: "rtkQueryApi",
  endpoints: (builder) => ({
    getWalletBalance: builder.query({
      queryFn: async (userId) => {
        try {
          const res = await API.get(`/users/${userId}/wallets`);
          return getAxiosResponseData(res);
        } catch (err) {
          return getAxiosError(err);
        }
      },
    }),
    getWalletHistory: builder.query({
      queryFn: async ({ userId, page }) => {
        try {
          const url = `/users/${userId}/wallets/histories`;

          let params = new URLSearchParams();
          params.append("sort_by", "trans_date:desc");
          params.append("limit", 6);
          params.append("page", page);

          const res = await API.get(`${url}?${params}`);
          return {
            data: {
              history: res.data.results,
              isLastPage: res.data.page === res.data.total_pages,
              page: res.data.page,
            },
          };
        } catch (err) {
          return getAxiosError(err);
        }
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        const reqPage = newItems.page;
        const lastPage = currentCache.page;

        // If page incremented then concat result with cache
        if (reqPage === lastPage + 1) {
          currentCache.history.push(...newItems.history);
        } else {
          currentCache.history = newItems.history;
        }

        currentCache.isLastPage = newItems.isLastPage;
        currentCache.page = newItems.page;
      },
      forceRefetch({ currentArg, previousArg }) {
        return JSON.stringify(currentArg) !== JSON.stringify(previousArg);
      },
    }),
  }),
});

export const { useGetWalletBalanceQuery, useGetWalletHistoryQuery } =
  rtkQueryApi;
