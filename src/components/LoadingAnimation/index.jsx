// React
import React, { memo } from "react";

// MUI Components
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

function LoadingAnimation(props) {
  const { color, size, thickness } = props;

  return (
    <>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) => `${theme.palette.grey[200]} !important`,
        }}
        size={size || 60}
        thickness={thickness || 4}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: color || "#7E54F1",
          animationDuration: "750ms",
          position: "absolute",
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={size || 60}
        thickness={thickness || 4}
      />
    </>
  );
}

export default memo(LoadingAnimation);
