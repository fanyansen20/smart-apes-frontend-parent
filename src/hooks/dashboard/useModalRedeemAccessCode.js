// react
import { useState } from "react";

// routes
import { useLocation, useNavigate } from "react-router-dom";

// hooks
import { redeemAccessCode } from "../../api/children/profiling-test/redeemAccessCode";
import useNotification from "../useNotification";
import usePageUrlQuery from "../usePageUrlQuery";

// redux
import { useDispatch } from "react-redux";
import { getTestTracker } from "../../store/profilingTest/getTestTracker";

const useOpenModalRedeemAccessCode = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [_msg, sendNotification] = useNotification();

  const isOpenModalAccessCode =
    usePageUrlQuery().get("open-modal-redeem-access-code") === "true";

  /**
   * @param {string} params
   */

  const openModalAccessCode = () => {
    return navigate(`${pathname}?open-modal-redeem-access-code=true`);
  };

  /**
   * @param {string} destinationPathname
   */
  const closeModalAccessCode = (destinationPathname) => {
    setError("");
    if (destinationPathname) {
      setTimeout(() => {
        return navigate(destinationPathname);
      }, 50);
    }
    return navigate(pathname);
  };

  /**
   * @param {string} accessCode
   * @param {string} destinationPathname
   */
  const redeemCode = async (accessCode, destinationPathname) => {
    if (!isSubmitting) {
      setIsSubmitting(true);

      const res = await redeemAccessCode(accessCode.trim(), "Grip Learning");

      setIsSubmitting(false);

      if (res?.code !== 200) {
        return setError(res);
      }

      dispatch(getTestTracker({ providerName: "Grip Learning" }));
      closeModalAccessCode(destinationPathname);
      sendNotification({
        msg: "Code Redeemed Successfully",
        variant: "success",
      });
    }
  };

  return {
    openModalAccessCode,
    closeModalAccessCode,
    isOpenModalAccessCode,
    redeemCode,
    error,
  };
};

export default useOpenModalRedeemAccessCode;
