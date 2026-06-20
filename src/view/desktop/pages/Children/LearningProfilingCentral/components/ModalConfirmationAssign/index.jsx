import React from "react";

// components
import { Stack } from "@mui/material";
import SmartapesDialog from "../../../../../../../components/Dialog";
import PrimaryButton from "../../../../../../../components/PrimaryButton";
import SecondaryButton from "../../../../../../../components/button/SecondaryButton";

// assets
import classes from "./_ModalConfirmationAssign.module.scss";

/**
 * @param {{
 * open : boolean
 * onClose : () => void
 * handleSelectPackage : () => void
 * assignOnTest : () => void
 * confirmTitle?: string;
 * }} props
 * @returns
 */

const ModalConfirmationAssign = ({
  open,
  onClose,
  handleSelectPackage,
  assignOnTest,
  confirmTitle,
}) => {
  const handlerCloseModal = () => {
    onClose();
    handleSelectPackage();
  };

  const confirmHandle = () => {
    assignOnTest();
    handlerCloseModal();
  };

  return (
    <SmartapesDialog
      open={open}
      disableDivider
      isIconClose={false}
      title="Assigning Confirmation"
    >
      <Stack direction="column" gap={2}>
        <p className={classes.textModal}>
          Your <b>pending basic test</b> will be replaced. Are you sure want to
          assign this ?
        </p>
        <Stack direction="row" gap={1} justifyContent="end">
          <SecondaryButton onClick={handlerCloseModal}>Cancel</SecondaryButton>
          <PrimaryButton onClick={confirmHandle}>
            {confirmTitle ?? "Confirm"}
          </PrimaryButton>
        </Stack>
      </Stack>
    </SmartapesDialog>
  );
};

export default ModalConfirmationAssign;
