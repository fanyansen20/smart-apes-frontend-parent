import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import React, { memo } from "react";
import "./style.scss";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "white",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    padding: 12,
    borderRadius: 8,
    boxShadow:
      "rgba(16, 24, 40, 0.08) 0px 0px 12px 0px, rgba(16, 24, 40, 0.03) 0px 5px 10px 0px",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "white",
  },
}));

function Label(props) {
  const {
    value,
    optional,
    children,
    tooltip,
    tooltipText,
    className,
    ...allProps
  } = props;

  const optionalElement =
    (optional && <span className="optional-text">&nbsp;{optional}</span>) || "";

  return (
    <InputLabel className={`${className} label-input`} {...allProps}>
      <Stack direction="row" alignItems="center" spacing={2}>
        {value || children}
        {optionalElement}
        {tooltip && tooltipText && (
          <HtmlTooltip arrow placement="right" title={tooltipText}>
            <IconButton
              sx={{
                padding: 0,
                paddingLeft: "8px",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
              disableRipple
            >
              <ErrorOutlineOutlinedIcon
                sx={{ color: "#C5C5C5" }}
                fontSize="small"
              />
            </IconButton>
          </HtmlTooltip>
        )}
      </Stack>
    </InputLabel>
  );
}

export default memo(Label);
