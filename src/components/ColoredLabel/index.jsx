import React, { memo } from "react";
import Alert from "@mui/material/Alert";
import { coloredLabelStyles, textLabelStyles } from "./style";
import { Typography } from "@mui/material";

function ColoredLabel({ backgroundColor, typographyStyles, text, uppercase }) {
  const uppercaseStyle = uppercase ? { textTransform: "uppercase" } : {};

  return (
    <Alert sx={{ ...coloredLabelStyles, backgroundColor }} icon={false}>
      <Typography
        sx={{ ...textLabelStyles, ...typographyStyles, ...uppercaseStyle }}
      >
        {text}
      </Typography>
    </Alert>
  );
}

export default memo(ColoredLabel);
