// React
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Helper
import {
  useGetWalletBalanceQuery,
  useGetWalletHistoryQuery,
} from "../../../../api/rtkQueryApi";
import { intToSGD } from "../../../../helper/currency";
import useModal from "../../../../hooks/useModal";

// MUI
// import SearchIcon from "@mui/icons-material/Search";
import { Container, Skeleton } from "@mui/material";

// Assets
// import { ReactComponent as FilterIcon } from "../../../../assets/icons/filter.svg";
// import { ReactComponent as SortIcon } from "../../../../assets/icons/sort.svg";
import { ReactComponent as TransactionIllustration } from "../../../../assets/images/transaction-detail-illustration.svg";

// Components
import SecondaryButton from "../../../../components/button/SecondaryButton";
// import InputTextField from "../../../../components/form/InputTextField/InputTextField";
import HeaderNavigation from "../../components/HeaderNavigation";
import DrawerTransactionDetails from "./components/DrawerTransactionDetails/DrawerTransactionDetails";
import DrawerTransactionFilter from "./components/DrawerTransactionFilter/DrawerTransactionFilter";
import DrawerTransactionSort from "./components/DrawerTransactionSort/DrawerTransactionSort";
import TransactionItem from "./components/TransactionItem/TransactionItem";

// Styles
import classes from "./WalletMobile.module.scss";

const WalletMobile = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const user = useSelector((store) => store.user);
  const { data: walletBalance } = useGetWalletBalanceQuery(user?.userData?.id);
  const { data: walletHistory, isFetching: isLoadingHistory } =
    useGetWalletHistoryQuery({
      userId: user?.userData?.id,
      page,
    });
  const [openDetails, handleOpenDetails, handleCloseDetails] = useModal();
  const [transactionItem, setTransactionItem] = useState();
  const [openFilter, _handleOpenFilter, handleCloseFilter] = useModal();
  const [openSort, _handleOpenSort, handleCloseSort] = useModal();

  // #region function
  const handleViewMore = () => setPage((current) => current + 1);

  const handleOpenTransactionDetails = (transaction) => {
    setTransactionItem(transaction);
    handleOpenDetails();
  };

  const goBack = () => {
    navigate(-1);
  };
  // #endregion

  return (
    <div className={classes.containerWalletMobile}>
      <HeaderNavigation title="Your Wallet" goBack={goBack} />
      <Container>
        <section className={classes.balance}>
          <h3>{intToSGD(walletBalance?.balance)}</h3>
        </section>
        <section className={classes.transactionHistoryHeader}>
          <h4>Transaction history</h4>
          <h5>See all your transaction history</h5>
        </section>
        {!walletHistory?.history?.length && !isLoadingHistory ? (
          <div className={classes.noTransaction}>
            <TransactionIllustration />
            <p>There are no transaction history at the moment</p>
          </div>
        ) : (
          <>
            {/* <section className={classes.transactionHistoryHeader}>
              <InputTextField
                autoComplete="off"
                placeholder="Search transaction history"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <div className={classes.filterBtn}>
                <SecondaryButton
                  onClick={handleOpenFilter}
                  startIcon={<FilterIcon />}
                >
                  Transaction Type
                </SecondaryButton>
                <SecondaryButton
                  onClick={handleOpenSort}
                  startIcon={<SortIcon />}
                >
                  Sort
                </SecondaryButton>
              </div>
            </section> */}
            <section>
              {walletHistory?.history?.map((transaction) => (
                <TransactionItem
                  key={transaction?.id}
                  transaction={transaction}
                  onClick={() => handleOpenTransactionDetails(transaction)}
                />
              ))}
              {isLoadingHistory && (
                <div className={classes.skeleton}>
                  {[...Array(5)].map((_, idx) => (
                    <Skeleton key={idx} variant="rounded" height={70} />
                  ))}
                </div>
              )}
              {!walletHistory?.isLastPage && !isLoadingHistory && (
                <SecondaryButton onClick={handleViewMore} fullWidth>
                  View More
                </SecondaryButton>
              )}
            </section>
          </>
        )}
      </Container>
      <DrawerTransactionDetails
        open={openDetails}
        handleClose={handleCloseDetails}
        transaction={transactionItem}
      />
      <DrawerTransactionFilter
        open={openFilter}
        handleClose={handleCloseFilter}
      />
      <DrawerTransactionSort open={openSort} handleClose={handleCloseSort} />
    </div>
  );
};

export default WalletMobile;
