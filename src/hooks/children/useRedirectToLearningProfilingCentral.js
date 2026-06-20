// redux
import { useDispatch } from "react-redux";

// lib
import { useNavigate } from "react-router-dom";
import { getChildProfilingTestAnalytic } from "../../store/profilingTest/getChildProfilingTestAnalytic";

/**
 * @param {string} childrenId
 */
const useRedirectToLearningProfilingCentral = (childrenId) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRedirectToLearningProfileCentral = () => {
    dispatch(getChildProfilingTestAnalytic({ childrenId })).then((data) => {
      const goToTab = data.payload.code === 200 ? "analytic" : "history";

      navigate(
        `/children/${childrenId}/learning-profiling-central?tab=${goToTab}`
      );
    });
  };

  return { handleRedirectToLearningProfileCentral };
};

export default useRedirectToLearningProfilingCentral;
