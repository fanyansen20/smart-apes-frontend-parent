// React
import { useCallback, useEffect, useRef, useState } from "react";

//MUI
import AddIcon from "@mui/icons-material/Add";
import { Button, CircularProgress, Grid } from "@mui/material";

//Components
import ModalAddAddress from "../../modal/ModalAddAddress/ModalAddAddress";
import AddressCard from "./AddressCard/AddressCard";

// Assets
import notAddresses from "../../../assets/images/not-address.png";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getUserAddress } from "../../../store/user/userAddressSlice";

// Helper
import { API } from "../../../config/api";
import useNotification from "../../../hooks/useNotification";

const ParentAddress = () => {
  const dispatch = useDispatch();
  const observer = useRef();
  const { isLoading } = useSelector((store) => store.userAddress);

  const { id: userId } = useSelector((store) => store.user.userData);
  const [_msg, sendNotification] = useNotification();

  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(3);
  const [userAddress, setUserAddress] = useState([]);

  const [isPrimaryAddress, setIsPrimaryAddress] = useState(false);
  const [openModalAddress, setOpenModalAddress] = useState(false);
  const [openModalEditAddress, setOpenModalEditAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({});

  const [isLoadData, setIsLoadData] = useState(false);

  // Modal add address
  const handlerOpenModalAddress = () => setOpenModalAddress(true);
  const handlerCloseModalAddress = () => setOpenModalAddress(false);

  // Modal edit address
  const handlerOpenModalEditAddress = (item) => {
    setSelectedAddress(item);
    setOpenModalEditAddress(!openModalEditAddress);
  };
  const handlerCloseModalEditAddress = () => {
    setOpenModalEditAddress(false);
  };

  const getDataUserAddress = async () => {
    try {
      const res = await dispatch(
        getUserAddress({ page: 1, limit: pageNumber })
      );
      const { results: dataAddress, total_results } = await res.payload;

      setUserAddress(dataAddress);
      setHasMore(pageNumber < total_results);
    } catch (error) {
      return error.message;
    }
    setIsPrimaryAddress(false);
  };

  useEffect(() => {
    getDataUserAddress();
  }, [pageNumber]);

  const handlerLoadIsBottomWindow = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 3);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  const handlerSetIdPrimaryAddress = (dataAddressUser) => {
    const idAddress = dataAddressUser.id;
    const isPrimary = dataAddressUser.is_default;

    if (isPrimary) return;
    if (idAddress === isPrimaryAddress) {
      setIsPrimaryAddress(false);
    } else {
      setIsPrimaryAddress(idAddress);
    }
  };

  const handlerUpdatePrimaryAddress = async (addressId) => {
    try {
      const payload = {
        is_default: true,
      };
      await API.patch(`/users/${userId}/addresses/${addressId}`, payload);

      sendNotification({
        msg: "Success update primary address",
        variant: "success",
      });
    } catch (error) {
      sendNotification({
        msg: "Unable to update primary address",
        variant: "error",
      });
    }
    getDataUserAddress();
  };

  const handlerDeleteAddress = async (dataAddress) => {
    const isPrimary = dataAddress.is_default;
    const addressId = dataAddress.id;

    if (isPrimary) {
      sendNotification({
        msg: "Primary Address cannot be deleted, please set primary address to another address first",
        variant: "error",
      });
    } else {
      try {
        await API.delete(`users/${userId}/addresses/${addressId}`);
        sendNotification({
          msg: "Your address has been successfully deleted",
          variant: "success",
        });

        getDataUserAddress();
      } catch (error) {
        sendNotification({
          msg: "Unable to update delete address",
          variant: "error",
        });
      }
    }
  };

  return (
    <>
      <div className="container-profile-content" style={{ minHeight: "0" }}>
        {isLoadData ? (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              height: "70vh",
            }}
          >
            <CircularProgress color="secondary" />
          </Grid>
        ) : userAddress.length === 0 ? (
          <Grid container alignItems="center" direction="column">
            <img src={notAddresses} alt="not-addresses" />
            <div className="content-not-address">
              <p className="title">You don’t have any address yet</p>
              <p className="subTitle">
                You haven’t set your address. Please add your address for your
                better experience
              </p>
            </div>
            <div className="btn-group-address-header">
              <Button onClick={handlerOpenModalAddress} startIcon={<AddIcon />}>
                Add New Address
              </Button>
            </div>
          </Grid>
        ) : (
          <>
            <header style={{ display: "flex", marginBottom: "1.5em" }}>
              <div>
                <p className="title">Your Address</p>
                <p className="subTitle">
                  Set your Delivery Address to deliver the items. Please make
                  sure your Address is correct.
                </p>
              </div>
              <div className="btn-group-address-header">
                {isPrimaryAddress && (
                  <Button
                    onClick={() =>
                      handlerUpdatePrimaryAddress(isPrimaryAddress)
                    }
                    className="btn-set-primary"
                  >
                    Set as Primary Address
                  </Button>
                )}
                <Button
                  onClick={handlerOpenModalAddress}
                  startIcon={<AddIcon />}
                >
                  Add New Address
                </Button>
              </div>
            </header>

            <Grid container spacing={2}>
              {userAddress?.map((item, index) => (
                <Grid
                  ref={
                    userAddress.length === index + 1
                      ? handlerLoadIsBottomWindow
                      : null
                  }
                  key={index}
                  item
                  md={12}
                  onClick={() => handlerSetIdPrimaryAddress(item)}
                >
                  <AddressCard
                    data={item}
                    isPrimary={isPrimaryAddress === item.id}
                    openModalAddress={handlerOpenModalAddress}
                    handlerDeleteAddress={() => handlerDeleteAddress(item)}
                    handlerOpenModalAddress={() =>
                      handlerOpenModalEditAddress(item)
                    }
                  />
                </Grid>
              ))}
            </Grid>

            {isLoading && (
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{
                  height: "10vh",
                }}
              >
                <CircularProgress color="secondary" />
              </Grid>
            )}
          </>
        )}
      </div>

      <ModalAddAddress
        open={openModalAddress || openModalEditAddress}
        title={openModalAddress ? "Add New Address" : "Edit Address"}
        handlerCloseModalAddress={
          openModalAddress
            ? handlerCloseModalAddress
            : handlerCloseModalEditAddress
        }
        getDataUserAddress={getDataUserAddress}
        isLoadData={setIsLoadData}
        dataAddress={selectedAddress}
      />
    </>
  );
};

export default ParentAddress;
