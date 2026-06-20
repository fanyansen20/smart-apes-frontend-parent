// React
import format from "date-fns/format";

// Helper
import { intToSGD } from "../../../../../../helper/currency";

// Styles
import classes from "./TransactionItem.module.scss";

const TransactionItem = ({ transaction, ...rest }) => {
  return (
    <div key={transaction?.id} className={classes.transactionItem} {...rest}>
      <div>
        <p className={classes.transaction}>{transaction?.trans_type}</p>
        <p className={classes.transaction}>
          {intToSGD(transaction?.show_amount)}
        </p>
      </div>
      <div>
        <p className={classes.date}>
          {format(new Date(transaction?.trans_date), "d MMM yyyy")}
        </p>
        <p
          className={`${classes.status} ${
            classes[`status__${transaction?.status}`]
          }`}
        >
          {transaction?.status}
        </p>
      </div>
      <hr />
    </div>
  );
};

export default TransactionItem;
