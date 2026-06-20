import { stepLabelClasses } from "@mui/material/StepLabel";
export const defaultFontStyles = {
  fontFamily: "Poppins",
  fontStyle: "normal",
};

const dialogSubTitle = {
  ...defaultFontStyles,
  fontWeight: "bold",
  lineHeight: "18px",
};

const dialogLabelText = {
  ...defaultFontStyles,
  color: "#C5C5C5",
};

const dialogValueText = {
  ...defaultFontStyles,
  fontWeight: "600",
  color: "#7E54F1",
};

const dialogProductNameText = {
  ...defaultFontStyles,
  fontWeight: "bold",
  color: "#868686",
};

const dialogSmallButton = {
  ...defaultFontStyles,
  marginLeft: "10px",
  backgroundColor: "#7E54F1",
  borderRadius: 10,
  "&:hover": {
    backgroundColor: "#7E54F1",
  },
};

const dialogProductImg = {
  ...defaultFontStyles,
  border: "1px solid #F3F3F3",
  borderRadius: "5px",
  width: "70px",
  height: "70px",
};

const dialogProductBox = {
  ...defaultFontStyles,
  border: "1px solid #F3F3F3",
  borderRadius: "5px",
  "& > img": {
    ...dialogProductImg,
  },
  padding: "15px",
};

const dialogStatusLabel = {
  ...defaultFontStyles,
  padding: 0,
};

const dialogStatusLeftLabel = {
  ...dialogStatusLabel,
  textAlign: "right",
  [`& .${stepLabelClasses.label}`]: {
    fontWeight: "500",
    color: "#DBDBDB",
  },
};

const dialogStatusBox = {
  ...dialogProductBox,
  marginLeft: 0,
  padding: 0,
  borderStyle: "dashed",
};

const dialogStatusDateLabel = {
  ...defaultFontStyles,
  color: "#DBDBDB",
};

const dialogStepperContent = {
  ...dialogProductBox,
  marginLeft: 0,
  padding: "5px",
  paddingBottom: "33px",
  border: "1px solid #D7D7D7",
  borderStyle: "dashed",
};

const dialogProductsExpandText = {
  ...defaultFontStyles,
  fontSize: "16px",
  marginBottom: "25px !important",
  marginLeft: "10px !important",
  display: "flex",
  alignItems: "center",
};

const expandProductsText = {
  ...defaultFontStyles,
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "18px",
  display: "flex",
  alignItems: "center",
  marginLeft: "7vw !important",
};

const seeProofText = {
  ...defaultFontStyles,
  fontSize: "12px",
  display: "flex",
  alignItems: "center",
};

const totalPriceHeader = {
  ...defaultFontStyles,
  fontWeight: "bold",
};

const totalPriceLabel = {
  ...defaultFontStyles,
  fontWeight: "600",
  color: "#7A7A7A",
};

const totalPriceValue = {
  ...defaultFontStyles,
  fontWeight: "600",
  color: "#A9A9A9",
};

const totalPriceItem = {
  justifyContent: "space-between",
};

const menuAction = {
  "& .MuiPaper-root": {
    border: "1px solid #cfcfcf",
    borderRadius: "5px",
    boxShadow:
      "0px 1px 0px -3px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 8px 1px rgba(0,0,0,0.12)",
  },
  "& ul": {
    width: "187px",
    paddingTop: "0 !important",
    paddingBottom: "0 !important",
    "& li": {
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "28px",
      color: "#475467",
      padding: "6px 24px",
    },
  },
};

const cancelFormBtn = {
  fontWeight: "700",
};

export const styles = {
  dialogSubTitle,
  dialogLabelText,
  dialogStatusLabel,
  dialogValueText,
  dialogProductNameText,
  dialogSmallButton,
  dialogProductBox,
  dialogProductImg,
  dialogStatusLeftLabel,
  dialogStatusBox,
  dialogStatusDateLabel,
  dialogStepperContent,
  dialogProductsExpandText,
  expandProductsText,
  seeProofText,
  totalPriceHeader,
  totalPriceLabel,
  totalPriceValue,
  totalPriceItem,
  menuAction,
  cancelFormBtn,
};
