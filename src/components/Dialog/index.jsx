// React
import React, { memo } from "react";

// MUI Components
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";

// Icons
import CloseIcon from "@mui/icons-material/Close";
import dialogClasses from "./Dialog.module.scss";

const CustomDialog = styled(Dialog)(() => ({
  borderRadius: "10px",
}));

const CONTENT_STYLES = {
  padding: "16px 24px",
  "::-webkit-scrollbar": {
    width: 8,
  },
  "::-webkit-scrollbar-thumb": {
    background: "rgb(218, 218, 218)",
    borderRadius: "4px",
  },
  "::-webkit-scrollbar-track": {
    background: "#FFFFFF",
  },
};

function SmartapesDialog({
  title,
  titleProps,
  subTitle,
  subTitleProps,
  children,
  disableDivider,
  imgTopLeftPosition,
  imgTopLeftPositionProps,
  classes,
  isIconClose = true,
  ...dialogProps
}) {
  return (
    <CustomDialog
      {...dialogProps}
      classes={{
        ...(classes || {}),
        paper: `${dialogClasses.dialogPaper} ${classes?.paper}`,
      }}
      aria-labelledby="customized-dialog-title"
    >
      <DialogTitle id="customized-dialog-title">
        {imgTopLeftPosition && (
          <img {...(imgTopLeftPositionProps || {})} src={imgTopLeftPosition} />
        )}
        <Stack direction="column">
          <Typography
            {...(titleProps || {})}
            className={`${dialogClasses.dialogTitle} ${titleProps?.className}`}
          >
            {title}
          </Typography>
          {subTitle && (
            <Typography
              {...(subTitleProps || {})}
              className={`${dialogClasses.dialogSubTitle} ${subTitleProps?.className}`}
            >
              {subTitle}
            </Typography>
          )}
        </Stack>
        {dialogProps.onClose && isIconClose ? (
          <IconButton
            aria-label="close"
            onClick={dialogProps.onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      {!disableDivider && <Divider variant="middle" />}
      <DialogContent sx={CONTENT_STYLES}>{children}</DialogContent>
    </CustomDialog>
  );
}

export default memo(SmartapesDialog);
