// react
import { useState } from "react";
import { useParams } from "react-router-dom";

// hooks
import useNotification from "../../hooks/useNotification";

// helper
import { API } from "../../config/api";

// redux
import { useDispatch } from "react-redux";
import { getAssignAbleTest } from "../../store/profilingTest/getAssignAbleTest";
import { getAssignedProfilingTestHistory } from "../../store/profilingTest/getAssignedProfilingTestHistory";
import { getTestTracker } from "../../store/profilingTest/getTestTracker";

const useModalAssignProfilingTest = () => {
  const [_, sendNotification] = useNotification();

  const dispatch = useDispatch();
  const { childrenId } = useParams();

  const [checkedData, setCheckedData] = useState("");

  /**
   * @param {string} providerName
   * @param {boolean | undefined} isRadioButton
   */
  const handleSelectPackage = (providerName, isRadioButton) => {
    if (!checkedData || isRadioButton) {
      return setCheckedData(providerName);
    }
    setCheckedData("");
  };

  /**
   * @param {{
   * successCallback?: () => void;
   * }} param0
   */

  const assignOnTest = async ({ successCallback } = {}) => {
    const payload = {
      child_id: childrenId,
      test_name: checkedData?.name,
      test_provider: checkedData?.providerName,
    };

    try {
      const res = await API.post("parent/assign-profiling-test", payload);
      if (res.status === 200) {
        dispatch(getTestTracker({ providerName: "Grip Learning" }));
        dispatch(
          getAssignedProfilingTestHistory({ childId: childrenId, page: 1 })
        );
        dispatch(getAssignAbleTest({ providerName: "Grip Learning" }));

        if (successCallback) {
          successCallback();
        }

        sendNotification({
          variant: "success",
          msg: "Assign test successful",
        });
      }
    } catch (error) {
      sendNotification({
        variant: "error",
        msg: "Something wrong in our side",
      });
    }
  };

  return { assignOnTest, checkedData, handleSelectPackage };
};

export default useModalAssignProfilingTest;
