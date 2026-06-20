// Components
import BottomModal from "../../../../components/BottomModal";
import TransactionItem from "../TransactionItem/TransactionItem";

// Helper
import { intToSGD } from "../../../../../../helper/currency";

// Styles
import classes from "./DrawerTransactionDetails.module.scss";

const DrawerTransactionDetails = ({ open, handleClose, transaction }) => {
  return (
    <BottomModal
      open={open}
      closeModal={handleClose}
      title="Transaction Detail"
    >
      <div className={classes.container}>
        <TransactionItem transaction={transaction} />
        <div className={classes.infoItem}>
          <p className={classes.infoTitle}>Order Number</p>
          <p className={classes.infoText}>{transaction?.source_code}</p>
        </div>
        <div className={classes.infoItem}>
          <p className={classes.infoTitle}>Total Price (x item)</p>
          <p className={classes.infoText}>{intToSGD(transaction?.amount)}</p>
        </div>
        <hr />
        <div className={classes.infoItem}>
          <p className={classes.infoText}>Total Price</p>
          <p className={classes.infoText}>{intToSGD(transaction?.amount)}</p>
        </div>
      </div>
    </BottomModal>
  );
};

export default DrawerTransactionDetails;
