import React, { memo, useEffect } from "react";

// hooks
import useChangeTabsProfilingCentral from "../../../../../hooks/learningProfilingCentral/useChangeTabsProfilingCentral";

// components
import AssignHistorySection from "./components/AssignHistorySection";
import ChildrenAnalyticsSection from "./components/ChildrenAnalyticsSection";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getTestProduct } from "../../../../../store/profilingTest/getTestProduct";

const LearningProfileCentral = () => {
  const { status } = useSelector((store) => store.productProfilingTest);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(getTestProduct());
    }
  }, []);

  const { inTab } = useChangeTabsProfilingCentral();

  const tabs = {
    analytic: <ChildrenAnalyticsSection />,
    history: <AssignHistorySection />,
  };

  return tabs[inTab];
};

export default memo(LearningProfileCentral);
