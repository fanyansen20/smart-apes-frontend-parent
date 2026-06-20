import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getUserAddress } from "../../../../../store/user/userAddressSlice";

// MUI
import { CircularProgress, Container, Grid, Typography } from "@mui/material";

// Components
import PrimaryButton from "../../../../../components/PrimaryButton";
import HeaderNavigation from "../../../components/HeaderNavigation";
import AddressItem from "./components/AddressItem";

// Assets
import noAddress from "../../../../../assets/images/not-address.png";

// Styles
import classes from "./_Addresses.module.scss";

const Addresses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // #region useState
  const [userAddress, setUserAddress] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // #endregion

  // #region redux state
  const { isLoading } = useSelector((store) => store.userAddress);
  // #endregion

  // #region function
  const handleScroll = useCallback((e) => {
    // check for scrolled to bottom
    const isBottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    if (pageNumber < totalPages && isBottom) {
      setPageNumber(pageNumber + 1);
    }
  });

  const goBack = () => {
    navigate(-1);
  };

  /**
   *
   * @param {string} id
   */
  const navigateToEditAddress = (id) => {
    navigate(id);
  };

  const navigateToAddressForm = () => {
    navigate("add");
  };
  // #endregion

  // #region fetch
  const getDataUserAddress = async () => {
    try {
      const res = await dispatch(
        getUserAddress({ page: pageNumber, limit: 10 })
      );
      const { results: dataAddress, total_pages } = await res.payload;

      const addressList =
        pageNumber > 1 ? userAddress.concat(dataAddress) : dataAddress;

      setUserAddress(addressList);
      setTotalPages(total_pages);
    } catch (error) {
      return error.message;
    }
  };
  // #endregion

  // #region useEffect
  useEffect(() => {
    getDataUserAddress();
  }, [pageNumber]);
  // #endregion

  return (
    <Fragment>
      <HeaderNavigation title="Your Address" goBack={goBack} />
      <Container className={classes.container}>
        {isLoading ? (
          <Grid className={classes.loadingContainer}>
            <CircularProgress color="secondary" className={classes.indicator} />
          </Grid>
        ) : userAddress.length === 0 ? (
          <>
            <Grid container className={classes.emptyContainer}>
              <img src={noAddress} alt="not-addresses" />
              <Typography className={classes.title}>Whoops!</Typography>
              <Typography className={classes.subtitle}>
                you haven’t set your address
              </Typography>
            </Grid>
            <PrimaryButton fullWidth className={classes.button}>
              <Typography>Add New Address</Typography>
            </PrimaryButton>
          </>
        ) : (
          <Grid
            container
            gap={2}
            className={classes.listContainer}
            onScroll={handleScroll}
          >
            {userAddress?.map((item) => (
              <Grid xs={12} item key={item.id}>
                <AddressItem data={item} navigate={navigateToEditAddress} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      <div className={classes.buttonContainer}>
        <PrimaryButton
          className={classes.button}
          fullWidth
          onClick={navigateToAddressForm}
        >
          Add New Address
        </PrimaryButton>
      </div>
    </Fragment>
  );
};

export default Addresses;
