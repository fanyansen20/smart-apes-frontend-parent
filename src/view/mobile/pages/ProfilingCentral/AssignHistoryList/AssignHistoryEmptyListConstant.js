import { ReactComponent as NoCompleteTest } from "../../../../../assets/images/ChildrenDashboard/illustration-no-complete-test.svg";
import { ReactComponent as NoPendingTest } from "../../../../../assets/images/ChildrenDashboard/illustration-no-pending-test.svg";

export const AssignHistoryEmptyListConstant = {
  pending: {
    illustration: <NoPendingTest />,
    title: "No Pending Test",
    subtitle:
      "You need to assign your children a test at least 1 GRIP Learning Test",
  },
  complete: {
    illustration: <NoCompleteTest />,
    title: "No Complete Test",
    subtitle:
      "No Data. Please finish pending test or assign your GRIP Learning Test",
  },
};
