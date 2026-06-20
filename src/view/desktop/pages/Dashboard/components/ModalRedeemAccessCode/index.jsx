import { useState } from "react";

// mui material
import { Stack } from "@mui/material";

// component
import SmartapesDialog from "../../../../../../components/Dialog";
import PrimaryButton from "../../../../../../components/PrimaryButton";
import SecondaryButton from "../../../../../../components/button/SecondaryButton";
import InputTextField from "../../../../../../components/form/InputTextField/InputTextField";

// styles
import classes from "./_ModalRedeemAccessCode.module.scss";

/**
 * @param {{
 * open : boolean
 * errorMessage : string
 * closeModal : () => {}
 * redeemCode : () => {}
 * }} props
 * @returns
 */

const ModalRedeemAccessCode = ({
  errorMessage,
  open,
  closeModal,
  redeemCode,
}) => {
  const [accessCode, setAccessCode] = useState("");

  const onCloseModal = () => {
    setAccessCode("");
    closeModal();
  };

  const redeemAccessCode = (accessCode) => {
    setAccessCode("");
    redeemCode(accessCode);
  };

  return (
    <SmartapesDialog
      fullWidth
      open={open}
      disableDivider
      title="Redeem Access Code"
      subTitle="Make sure you redeem all the test before expired"
      onClose={onCloseModal}
      isIconClose={false}
    >
      <Stack direction="column" gap={2}>
        <div className={classes.containerInsert}>
          <p>Please insert the code here</p>
          <InputTextField
            onChange={(e) => setAccessCode(e.target.value)}
            placeholder="Insert code here"
            value={accessCode}
          />
        </div>

        {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}

        <Stack direction="row" gap={1} justifyContent="end">
          <SecondaryButton onClick={onCloseModal}>Cancel</SecondaryButton>
          <PrimaryButton
            disabled={!accessCode}
            onClick={() => redeemAccessCode(accessCode)}
          >
            Redeem Code
          </PrimaryButton>
        </Stack>
      </Stack>
    </SmartapesDialog>
  );
};

export default ModalRedeemAccessCode;
