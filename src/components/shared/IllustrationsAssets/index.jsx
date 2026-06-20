import { Stack, Typography } from "@mui/material";
import React from "react";

/**
 *
 * @param {{
 * title : string
 * subTitle : string
 * imageIllustration : string
 * }} props
 * @returns
 */

const IllustrationAssets = ({
  title = "Write title Illustration",
  subTitle = "Write sub-title Illustration",
  imageIllustration,
}) => {
  return (
    <Stack
      sx={{
        width: "100%",
        padding: "4vh",
        alignItems: "center",
        "& h5": {
          fontWeight: "bold",
        },
      }}
      justifyContent="center"
      rowGap={3}
    >
      <img src={imageIllustration} alt="Image Illustration" />
      <Stack rowGap={0.2}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="subtitle1">{subTitle}</Typography>
      </Stack>
    </Stack>
  );
};

export default IllustrationAssets;
