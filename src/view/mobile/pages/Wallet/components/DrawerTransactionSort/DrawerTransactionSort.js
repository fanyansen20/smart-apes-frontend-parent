// React
import { useState } from "react";

// MUI
import { RadioGroup } from "@mui/material";

// Components
import SecondaryButton from "../../../../../../components/button/SecondaryButton";
import RadioButton from "../../../../../../components/form/RadioButton/RadioButton";
import BottomModal from "../../../../components/BottomModal";

// Styles
import classes from "./DrawerTransactionSort.module.scss";

// Constant
import { transactionFilter } from "../../constant";

const DrawerTransactionSort = ({ open, handleClose }) => {
  const [selectedSort, setSelectedSort] = useState("");

  const handleChangeSort = (e) => setSelectedSort(e.target.value);

  return (
    <BottomModal open={open} closeModal={handleClose} title="Sort">
      <div className={classes.container}>
        <div>
          <RadioGroup value={selectedSort} onChange={handleChangeSort}>
            {transactionFilter.map((filter) => (
              <SecondaryButton
                onClick={() => setSelectedSort(filter.query)}
                key={filter.query}
                fullWidth
                className={
                  filter.query === selectedSort
                    ? classes.btnFilter__active
                    : classes.btnFilter
                }
              >
                <RadioButton label={filter.label} value={filter.query} />
              </SecondaryButton>
            ))}
          </RadioGroup>
        </div>
        <div className={classes.btnSubmit}>
          <SecondaryButton fullWidth>Apply Filter</SecondaryButton>
        </div>
      </div>
    </BottomModal>
  );
};

export default DrawerTransactionSort;
