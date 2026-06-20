// router
import { useLocation, useNavigate } from "react-router-dom";

// hooks
import usePageUrlQuery from "../usePageUrlQuery";

const useChangeTabsProfilingCentral = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const inTab = usePageUrlQuery().get("tab") ?? false;

  /**
   * @param {'analytic' |'history'} tab
   */
  const changeTab = (tab) => {
    return navigate(`${pathname}?tab=${tab}`);
  };

  return { inTab, changeTab };
};

export default useChangeTabsProfilingCentral;
