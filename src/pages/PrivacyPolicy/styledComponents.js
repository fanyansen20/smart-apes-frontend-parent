import { styled, Typography } from "@mui/material";

const paragraphStyles = (
  fontSize,
  lineHeight,
  marginTop,
  fontWeight = 600
) => ({
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight,
  fontSize,
  lineHeight,
  color: "#475467",
  marginTop,
});

export const PageTitle = styled(Typography)(() => ({
  ...paragraphStyles("32px", "48px", 24, 700),
}));

export const SubTitle = styled(Typography)(() => ({
  ...paragraphStyles("20px", "30px", 24),
}));

export const ListInfo = styled(Typography)(() => ({
  ...paragraphStyles("14px", "21px", 14),
}));
