import React, { memo } from "react";

// component
import SmartapesDialog from "../../../../../../../components/Dialog";
import PrimaryButton from "../../../../../../../components/PrimaryButton";
import SecondaryButton from "../../../../../../../components/button/SecondaryButton";

// MUI material
import {
  Checkbox,
  Stack,
  Tooltip,
  styled,
  tooltipClasses,
} from "@mui/material";

// styles
import classes from "./_ModalAssignProfilingTest.module.scss";

// assets
import { ReactComponent as AlertIcon } from "../../../../../../../assets/icons/alert.svg";

// redux
import { useSelector } from "react-redux";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#fff",
    color: "#344054",
    boxShadow: "0px 12px 16px -4px #10182814",
    fontSize: 12,
    padding: 10,
    fontWeight: 600,
    borderRadius: 8,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#fff",
  },
}));

/**
 * @typedef {{
 * name : string
 * providerName : string
 * package : string
 * qty : number
 * }} AssignData
 */

/**
 * @typedef {{
 * name : string
 * providerName : 'Grip Learning'
 * qty : number
 * package : 'Profiling Test Premium' | 'Profiling Test Premium Plus'
 * }} CheckedData
 */

/**
 * @param {{
 * isOpen : boolean
 * onClose : () => void
 * openModalConfirmationAssign : () => void
 * assignAbleData : AssignData
 * assignOnTest : () => void
 * checkedData : CheckedData
 * handleSelectPackage : () => void
 * }} param0
 * @returns
 */

const ModalAssignProfilingTest = ({
  isOpen,
  onClose,
  assignAbleData,
  openModalConfirmationAssign,
  assignOnTest,
  checkedData,
  handleSelectPackage,
}) => {
  const { dataCountProfilingTests } = useSelector(
    (store) => store.resCountProfilingTest
  );

  const handlerAssign = () => {
    if (dataCountProfilingTests > 0) {
      onClose();
      return openModalConfirmationAssign();
    }

    closeModal();
    assignOnTest();
  };

  const closeModal = () => {
    handleSelectPackage();
    onClose();
  };

  return (
    <SmartapesDialog
      open={isOpen}
      disableDivider
      title="Assign Profiling Test"
      subTitle="Make sure you redeem all the test before expired"
      subTitleProps={{
        className: classes.subTitle,
      }}
      onClose={closeModal}
      isIconClose={false}
    >
      <Stack direction="column" gap={2}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Package</th>
              <th>
                Quantity
                <LightTooltip
                  title="This only applies 1 quantity at the time"
                  arrow
                  placement="right"
                >
                  <AlertIcon />
                </LightTooltip>
              </th>
            </tr>
          </thead>
          <tbody>
            {assignAbleData?.map(
              (item, key) =>
                item.qty > 0 && (
                  <tr
                    key={key}
                    className={
                      checkedData &&
                      checkedData?.name !== item?.name &&
                      classes.disabledTable
                    }
                  >
                    <td>
                      <Checkbox
                        disabled={
                          checkedData && checkedData?.name !== item?.name
                        }
                        checked={checkedData?.name === item?.name}
                        onChange={() => handleSelectPackage(item)}
                        className={classes.checkbox}
                      />
                    </td>
                    <td>{item.package}</td>
                    <td>{item.qty}</td>
                  </tr>
                )
            )}
          </tbody>
        </table>
        <Stack direction="row" gap={1} justifyContent="end">
          <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
          <PrimaryButton
            disabled={!checkedData}
            onClick={() => handlerAssign()}
          >
            Assign On
          </PrimaryButton>
        </Stack>
      </Stack>
    </SmartapesDialog>
  );
};

export default memo(ModalAssignProfilingTest);
