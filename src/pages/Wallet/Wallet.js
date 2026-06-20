// React
import format from "date-fns/format";
import numeral from "numeral";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWalletBalance } from "../../store/wallet/walletBalanceSlice";
import {
  changePageWalletHistory,
  changePerPageWalletHistory,
  getWalletHistory,
} from "../../store/wallet/walletHistorySlice";

// MUI
import {
  Container,
  Grid,
  Skeleton,
  TablePagination,
  Typography,
} from "@mui/material";

// Assets
import { ReactComponent as TransactionIllustration } from "../../assets/images/transaction-detail-illustration.svg";

const Wallet = () => {
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const walletBalance = useSelector((store) => store.walletBalance);
  const walletHistory = useSelector((store) => store.walletHistory);
  //   console.log(walletHistory);

  const handleViewTable = () => {
    tableRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleChangePage = (e, newPage) => {
    dispatch(changePageWalletHistory(newPage));
    dispatch(getWalletHistory());
    handleViewTable();
  };

  const handleChangeRowsPerPage = (e) => {
    dispatch(changePerPageWalletHistory(e.target.value));
    dispatch(changePageWalletHistory(0));
    dispatch(getWalletHistory());
    handleViewTable();
  };

  useEffect(() => {
    dispatch(getWalletHistory());
    dispatch(getWalletBalance());
  }, []);

  if (walletBalance?.isLoading || walletHistory?.isLoading) {
    return (
      <Container maxWidth="lg">
        <Grid container className="content" spacing={1}>
          <Grid item className="title" md={12}>
            <div className="dashboardEventTitle">
              <Typography>Wallet</Typography>
            </div>
          </Grid>
          <Grid item md={5.5} xs={12}>
            <Skeleton animation="wave" variant="rounded" height={90} />
          </Grid>
          <Grid item md={12} xs={12}>
            <Skeleton animation="wave" variant="rounded" height={350} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Grid container className="content" spacing={1}>
        <Grid item className="title" md={12}>
          <div ref={tableRef} className="dashboardEventTitle">
            <Typography>Wallet</Typography>
          </div>
        </Grid>
        <Grid item md={5.5} xs={12}>
          <section className="wallet-header">
            <h3>S${numeral(walletBalance?.balance).format("0,0.00")}</h3>
          </section>
        </Grid>
        <Grid item md={12} xs={12}>
          <section className="wallet-transaction">
            <div className="wallet-transaction-header">
              <div>
                <h5>Transaction History</h5>
                <h6>See all of your transaction history</h6>
              </div>
              {/* <div className="wallet-filter">
                <Button startIcon={<FilterIcon />}>Filter</Button>
                <Button startIcon={<SortIcon />}>Sort</Button>
                <InputTextField
                  placeholder="Search"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div> */}
            </div>
            {walletHistory?.results?.length > 0 ? (
              <div className="wallet-transaction-table">
                <table id="wallet-table">
                  <thead>
                    <tr>
                      <th>Transaction Date</th>
                      <th>Order Number</th>
                      <th>Transaction Type</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {walletHistory?.results?.map((history, index) => (
                      <tr key={index}>
                        <td>
                          {format(new Date(history?.trans_date), "d MMM yyyy")}
                        </td>
                        <td>
                          <span className="ref-number">
                            {history?.source_code}
                          </span>
                        </td>
                        <td>{history?.trans_type}</td>
                        <td>S${history?.show_amount}</td>
                        <td>
                          <span className={`status__${history?.status}`}>
                            &#8226; {history?.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div id="wallet-table-pagination">
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={walletHistory?.totalResults || 0}
                    rowsPerPage={walletHistory?.limit || 10}
                    page={walletHistory?.page || 0}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                      color: "#7a7a7a",
                      fontFamily: '"Poppins"',
                      fontSize: 14,
                      border: "1px solid #f3f3f3",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="no-wallet-history">
                <TransactionIllustration />
                <h3>There are no transaction history at the moment</h3>
              </div>
            )}
          </section>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Wallet;
