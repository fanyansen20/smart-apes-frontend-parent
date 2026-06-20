// React
import { useState } from "react";

// Components
import SecondaryButton from "../../../../../../components/button/SecondaryButton";
import BottomModal from "../../../../components/BottomModal";

// Styles
import classes from "./DrawerTransactionFilter.module.scss";

// Constant
import { transactionStatus, transactionType } from "../../constant";

const DrawerTransactionFilter = ({ open, handleClose }) => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  return (
    <BottomModal open={open} closeModal={handleClose} title="Filter">
      <div className={classes.container}>
        <p className={classes.filterTitle}>Transaction Type</p>
        <div className={classes.btnContainer}>
          {transactionType.map((type) => (
            <SecondaryButton
              onClick={() => setSelectedType(type.query)}
              key={type.query}
              className={
                type.query === selectedType
                  ? classes.btnFilter__active
                  : classes.btnFilter
              }
            >
              {type.label}
            </SecondaryButton>
          ))}
        </div>
        <p className={classes.filterTitle}>Status</p>
        <div className={classes.btnContainer}>
          {transactionStatus.map((status) => (
            <SecondaryButton
              onClick={() => setSelectedStatus(status.query)}
              key={status.query}
              className={
                status.query === selectedStatus
                  ? classes.btnFilter__active
                  : classes.btnFilter
              }
            >
              {status.label}
            </SecondaryButton>
          ))}
        </div>
        <div className={classes.btnSubmit}>
          <SecondaryButton fullWidth>Apply Filter</SecondaryButton>
        </div>
      </div>
    </BottomModal>
  );
};

export default DrawerTransactionFilter;
