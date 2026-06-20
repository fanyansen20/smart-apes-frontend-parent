// routes
import { useLocation, useNavigate } from "react-router-dom";

// hooks
import usePageUrlQuery from "../../../hooks/usePageUrlQuery";

const useOpenModalChildren = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isOpenModalChild = usePageUrlQuery().get("open-modal-child") === "true";

  /**
   * @param {string} params
   */

  const openModalChildren = (params) => {
    if (params) {
      return navigate(`${pathname}?open-modal-child=true&${params}`);
    }

    return navigate(`${pathname}?open-modal-child=true`);
  };

  /**
   * @param {string} params
   */
  const closeModalChildren = (params) => {
    if (params) {
      return navigate(`${pathname}?${params}`);
    }

    return navigate(pathname);
  };

  return { openModalChildren, closeModalChildren, isOpenModalChild };
};

export default useOpenModalChildren;
