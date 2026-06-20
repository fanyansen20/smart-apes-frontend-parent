import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI
import { Container, Grid, Typography } from "@mui/material";

// Components
import PrimaryButton from "../../../../components/PrimaryButton";
import InputTextField from "../../../../components/form/InputTextField/InputTextField";
import HeaderNavigation from "../../components/HeaderNavigation";

// Hooks
import useOpenModalRedeemAccessCode from "../../../../hooks/dashboard/useModalRedeemAccessCode";

// Styles
import classes from "./_RedeemCode.module.scss";

const RedeemCode = () => {
  const navigate = useNavigate();

  // #region hooks
  const { redeemCode, error } = useOpenModalRedeemAccessCode();
  // #endregion

  // #region useState
  const [codeValue, setCodeValue] = useState("");
  // #endregion

  // #region function
  const handleSubmit = async () => {
    redeemCode(codeValue, "/");
  };

  const goBack = () => {
    navigate("/");
  };
  // #endregion

  return (
    <Fragment>
      <HeaderNavigation title="Parent Dashboard" goBack={goBack} />
      <Container className={classes.container}>
        <Grid xs={12}>
          <Grid xs={12}>
            <Typography className={classes.title}>
              Redeem Access Code
            </Typography>
            <Typography className={classes.subtitle}>
              Make sure you redeem all the test before expired
            </Typography>
          </Grid>
          <Grid xs={12} className={classes.inputContainer}>
            <Typography className={classes.inputTitle}>
              Please insert the code here
            </Typography>
            <InputTextField
              value={codeValue}
              handleChange={(e) => setCodeValue(e.target.value)}
              placeholder="Insert code here"
              fullWidth
            />
          </Grid>
          <Grid className={classes.errorContainer}>
            <Typography>{error?.message}</Typography>
          </Grid>
        </Grid>
        <div className={classes.buttonContainer}>
          <PrimaryButton
            disabled={!codeValue}
            fullWidth
            className={classes.submitButton}
            onClick={handleSubmit}
          >
            Redeem
          </PrimaryButton>
        </div>
      </Container>
    </Fragment>
  );
};

export default RedeemCode;
