import React, { memo, useEffect } from "react";

// classes
import classes from "./_AssignHistorySection.module.scss";

// components
import ProfilingProductCard from "../../../../../../../components/ProfilingProductCard";
import TableAssignHistory from "../TableAssignHistory";

// redux
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAssignedProfilingTestHistory,
  handleChangePage,
} from "../../../../../../../store/profilingTest/getAssignedProfilingTestHistory";

const AssignHistorySection = () => {
  const { childrenId: childId } = useParams();
  const dispatch = useDispatch();

  const { dataProduct: dataTestProduct } = useSelector(
    (store) => store.productProfilingTest
  );

  const { assignHistoryData, totalPages, page } = useSelector(
    (store) => store.resAssignHistory
  );

  useEffect(() => {
    dispatch(getAssignedProfilingTestHistory({ childId, page }));
  }, [page]);

  return (
    <div className={classes.containerAssignHistory}>
      <div className={classes.containerTableProfilingTest}>
        <h1>Profiling Test</h1>
        <TableAssignHistory
          assignData={assignHistoryData}
          totalPages={totalPages}
          changePage={(_, value) => {
            dispatch(handleChangePage({ page: value }));
          }}
          page={page}
        />
      </div>

      <div className={classes.containerTableProfilingTest}>
        <h1>Buy Another Package</h1>
        <div className={classes.containerProfilingProduct}>
          {dataTestProduct.map((item) => (
            <ProfilingProductCard
              key={item.id}
              idProduct={item.id}
              slug={item.slug}
              title={item?.title}
              benefitData={item?.desc}
              realPrice={item?.main_variant?.base_price_string}
              totalPrice={item?.main_variant?.price_string}
              discountPercentage={item?.main_variant?.discount?.percent}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(AssignHistorySection);
