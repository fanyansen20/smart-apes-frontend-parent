// react
import { memo, useEffect, useState } from "react";

// hooks
import { Grid, Pagination, Stack, Typography } from "@mui/material";
import usePageUrlQuery from "../../hooks/usePageUrlQuery";

// Component
import LoadingAnimation from "../../components/LoadingAnimation";
import IllustrationAssets from "../../components/shared/IllustrationsAssets";
import DisputedOrderCard from "./components/DisputedOrderCard";
import ModalOrderHistory from "./components/ModalOrderHistory";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  getDisputedOrders,
  handleChangePage,
} from "../../store/orders/disputedOrder/getDisputedOrderSlice";

// Assets
import NoOrders from "../../assets/images/no-orders.svg";

// constant
import {
  DISPUTED_ORDER_STATUS,
  PARAMS_STATUS_DISPUTED_ORDER,
} from "../OrderList/constants";
import ModalPreviewProof from "./components/ModalPreviewProof";

const DisputedOrder = () => {
  const dispatch = useDispatch();
  const param = usePageUrlQuery().get("status");

  const statusParam = PARAMS_STATUS_DISPUTED_ORDER[param];

  const [historiesDisputedOrder, setHistoriesDisputedOrder] = useState({
    isOpen: false,
    dataHistories: "",
  });
  const [previewProof, setPreviewProof] = useState({
    isOpen: false,
    filePreview: "",
  });

  const {
    dataDisputedOrders,
    page,
    totalPages,
    totalResults,
    isLoading,
    errorMessage,
  } = useSelector((store) => store.disputedOrder) || {};

  useEffect(() => {
    dispatch(getDisputedOrders({ page: 1, status: statusParam, limit: 5 }));
  }, [param]);

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(getDisputedOrders({ page, status: statusParam, limit: 5 }));
  }, [page]);

  const showItems = page * 5;
  const currentItem = showItems - 4;

  const changePage = (_, value) => {
    dispatch(handleChangePage({ page: value }));
  };

  const handlerSeeOrderHistories = (history) => {
    setHistoriesDisputedOrder({
      isOpen: !historiesDisputedOrder.isOpen,
      dataHistories: !historiesDisputedOrder.isOpen && history,
    });
  };

  const handlerPreviewProof = (fileProof) => {
    setHistoriesDisputedOrder((prev) => ({ ...prev, isOpen: !prev["isOpen"] }));
    setPreviewProof({
      isOpen: !previewProof.isOpen,
      filePreview: !previewProof.filePreview && fileProof,
    });
  };

  return (
    <Grid container gap={2} sx={{ marginTop: 2 }}>
      {isLoading ? (
        <Grid item md={12}>
          <Stack
            sx={{ height: "40vh" }}
            alignItems="center"
            justifyContent="center"
          >
            <LoadingAnimation size={60} thickness={4} />
          </Stack>
        </Grid>
      ) : (
        <>
          {(totalResults < 1 || errorMessage) && (
            <IllustrationAssets
              title="No Disputed Order"
              subTitle="No Order for Current Status."
              imageIllustration={NoOrders}
            />
          )}

          {!errorMessage && (
            <>
              {dataDisputedOrders.map((disputedOrder) => (
                <>
                  <DisputedOrderCard
                    key={disputedOrder.id}
                    itemsProduct={disputedOrder.items}
                    ref_code={disputedOrder.orderReferenceCode}
                    shopName={disputedOrder.shopName}
                    param={param}
                    statusLabel={
                      DISPUTED_ORDER_STATUS[disputedOrder?.status]?.textLabel
                    }
                    labelColor={
                      DISPUTED_ORDER_STATUS[disputedOrder?.status]?.color
                    }
                    isLoading={isLoading}
                    refundAmount={disputedOrder.refundAmount}
                    complaintReason={disputedOrder.complaintReason}
                    refundDate={disputedOrder?.refundDate}
                    openModal={() =>
                      handlerSeeOrderHistories(disputedOrder?.histories)
                    }
                  />
                </>
              ))}

              {totalResults > 5 && (
                <Grid
                  item
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>
                    Showing {currentItem} to {showItems} of {totalResults}{" "}
                    entries
                  </Typography>

                  <Pagination
                    page={Number(page)}
                    count={totalPages}
                    onChange={changePage}
                  />
                </Grid>
              )}
            </>
          )}
        </>
      )}

      <ModalOrderHistory
        open={historiesDisputedOrder?.isOpen}
        onClose={handlerSeeOrderHistories}
        histories={historiesDisputedOrder?.dataHistories}
        handlerPreviewProof={handlerPreviewProof}
      />

      <ModalPreviewProof
        open={previewProof?.isOpen}
        closeModal={handlerPreviewProof}
        filePreview={previewProof?.filePreview}
      />
    </Grid>
  );
};

export default memo(DisputedOrder);
