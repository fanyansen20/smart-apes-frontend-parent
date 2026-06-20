// assets
import chooseThePackage from "../../../../../../../src/assets/images/StepperRedeemAccessCode/choose-the-package-mobile.svg";
import createNewChildProfile from "../../../../../../../src/assets/images/StepperRedeemAccessCode/create-new-child-profile-mobile.svg";
import navigateToChildren from "../../../../../../../src/assets/images/StepperRedeemAccessCode/navigate-to-children-mobile.svg";
import redeemAccessCode from "../../../../../../../src/assets/images/StepperRedeemAccessCode/redeem-access-code-mobile.svg";
import takeTest from "../../../../../../../src/assets/images/StepperRedeemAccessCode/take-test-mobile.svg";

export const stepperModal = [
  {
    imageUrl: createNewChildProfile,
    title: "Create new children profile",
    content:
      "You need to create a new children profile and fill the information based on their data.",
  },
  {
    imageUrl: navigateToChildren,
    title: "Navigate to children dashboard ",
    content:
      "Tap the Children Dashboard on your children profile, and tap Go to Profile Central page to proceed.",
  },
  {
    imageUrl: redeemAccessCode,
    title: "Assign to Children",
    content:
      "Once you in the Profile Central page, tap Assign Now button beside the children profile",
  },
  {
    imageUrl: chooseThePackage,
    title: "Choose the Package",
    content:
      "GRIP Learning Package page will show up, then choose suitable package for your children. Then tap Submit",
  },
  {
    imageUrl: takeTest,
    title: "Start GRIP Learning Profiling Test",
    content:
      "You will see a new added test with pending status in Assign History tab. You can tap the card for take the test",
  },
];

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
