// react
import { useNavigate } from "react-router-dom";

/**
 * @param {{
 * handleClose : () => {}
 * }}
 * @returns
 */

const useActionTableAssignHistory = () => {
  const navigate = useNavigate();

  const redirectToTakeTest = (url) => {
    window.open(url, "_self");
  };

  const redirectToDownloadReport = (url) => {
    window.open(url, "_blank");
  };

  /**
   * @param {{
   * childrenId : string
   * referenceId : string
   * url :string
   * }} referenceId
   */
  const handleSeeSummary = ({ url, childrenId, referenceId }) => {
    navigate(url || `/children/${childrenId}/summary-test/${referenceId}`);
  };

  return { handleSeeSummary, redirectToTakeTest, redirectToDownloadReport };
};

export default useActionTableAssignHistory;
