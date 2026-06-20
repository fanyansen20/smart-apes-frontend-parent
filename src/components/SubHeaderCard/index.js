import { Paper, styled } from "@mui/material";
import React from "react";
import SubHeaderTitleImg from "../../assets/images/SubHeaderTitle.png";

const SubHeader = styled(Paper)(() => ({
  padding: "17px",
  paddingLeft: "34px",
  justifyContent: "space-evenly",
  backgroundImage: `url(${SubHeaderTitleImg})`,
  backgroundSize: "100% 59px",
  color: "#FFFFFF",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "16px",
  lineHeight: "24px",
}));

function SubHeaderCard(props) {
  const { children } = props;
  return <SubHeader elevation={0}>{children}</SubHeader>;
}

export default SubHeaderCard;
