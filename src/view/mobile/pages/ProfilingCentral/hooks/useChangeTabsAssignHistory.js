// router
import { useLocation, useNavigate } from "react-router-dom";

// hooks
import usePageUrlQuery from "../../../../../hooks/usePageUrlQuery";

const useChangeTabsAssignHistory = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const inTab = usePageUrlQuery().get("tab") ?? false;

  /**
   * @param {'pending' | 'complete'} tab
   */
  const changeTab = (tab) => {
    return navigate(`${pathname}?tab=${tab}`);
  };

  return { inTab, changeTab };
};

export default useChangeTabsAssignHistory;
