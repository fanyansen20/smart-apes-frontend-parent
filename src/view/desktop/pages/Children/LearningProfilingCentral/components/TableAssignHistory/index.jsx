// react
import { memo } from "react";
import { useParams } from "react-router-dom";

// styles
import classes from "./_TableAssignHistory.module.scss";

// mui material
import { Pagination } from "@mui/material";

// helper
import { dateFormatter } from "../../../../../../../helper/dateFormat";

// hooks
import useActionTableAssignHistory from "../../../../../../../hooks/learningProfilingCentral/useActionTableAssignHistory";
import ActionButton from "../ActionButton";

/**
 * @typedef {{
 *  referenceId : string
 *  name : string
 *  providerName : string
 *  url : string
 *  status : 'Pending' | 'Complete'
 *  completedAt : Date
 *  createdAt : Date
 * }} AssignData
 */

/**
 * @param {{
 * assignData :  Array<AssignData>
 * totalPages : number
 * changePage : () => {}
 * page : number
 * }} props
 * @returns
 */

const TableAssignHistory = ({ assignData, totalPages, changePage, page }) => {
  const { childrenId } = useParams();

  const { redirectToTakeTest, handleSeeSummary, redirectToDownloadReport } =
    useActionTableAssignHistory();

  const showItems = page * 10;
  const currentItem = showItems - 9;

  return (
    <div className={classes.container}>
      <table>
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Package</th>
            <th style={{ width: "20%" }}>Status</th>
            <th style={{ width: "20%" }}>Assign On</th>
            <th>Finish On</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {assignData?.map((value) => (
            <tr key={value?.referenceId}>
              <td>
                {value?.name}&nbsp;
                {value?.providerName}
              </td>
              <td className={classes[`status__${value?.status}`]}>
                {value?.status}
              </td>
              <td>
                {dateFormatter({
                  date: value?.createdAt,
                  formatting: "dd MMMM yyyy",
                })}
              </td>
              <td>
                <div>
                  {value?.completedAt
                    ? dateFormatter({
                        date: value?.completedAt,
                        formatting: "dd MMMM yyyy",
                      })
                    : "-"}
                </div>
              </td>
              <td style={{ width: "10%" }}>
                <ActionButton
                  handlerTakeTest={() => redirectToTakeTest(value.url)}
                  handlerSeeSummary={() =>
                    handleSeeSummary({
                      childrenId,
                      referenceId: value.referenceId,
                    })
                  }
                  handlerDownloadReport={() =>
                    redirectToDownloadReport(value.url)
                  }
                  isDownloadReport={value.name !== "Profiling Test Basic"}
                  status={value.status}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={classes.containerPagination}>
        <p>
          Showing {currentItem} to {showItems} of {totalPages} entries
        </p>
        <Pagination page={page} count={totalPages} onChange={changePage} />
      </div>
    </div>
  );
};

export default memo(TableAssignHistory);
