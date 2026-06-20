import React from "react";

// Mui material
import { IconButton, Stack, Tooltip } from "@mui/material";

// assets
import { ReactComponent as Download } from "../../../../../../../assets/icons/download.svg";
import { ReactComponent as Send } from "../../../../../../../assets/icons/send.svg";
import { ReactComponent as Show } from "../../../../../../../assets/icons/show.svg";

// style
import classes from "./_ActionButton.module.scss";

/**
 * @param {{
 * status : 'Pending' | 'Complete'
 * handlerTakeTest : () => void
 * handlerSeeSummary : () => void
 * handlerDownloadReport : () => void
 * isDownloadReport : boolean
 * }} props
 * @returns
 */
const ActionButton = ({
  status,
  handlerTakeTest,
  handlerSeeSummary,
  handlerDownloadReport,
  isDownloadReport = true,
}) => {
  return (
    <div>
      {status === "Pending" && (
        <Tooltip title="Take Test" arrow placement="top">
          <IconButton onClick={handlerTakeTest} className={classes.btnTakeTest}>
            <Send />
          </IconButton>
        </Tooltip>
      )}

      {status === "Complete" && (
        <Stack direction="row" gap={1}>
          {handlerSeeSummary && (
            <Tooltip title="See Summary" arrow placement="top">
              <IconButton
                onClick={handlerSeeSummary}
                className={classes.btnBordered}
              >
                <Show />
              </IconButton>
            </Tooltip>
          )}

          {isDownloadReport && (
            <Tooltip title="Download Report" arrow placement="top">
              <IconButton
                onClick={handlerDownloadReport}
                className={classes.btnBordered}
              >
                <Download />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      )}
    </div>
  );
};

export default ActionButton;
