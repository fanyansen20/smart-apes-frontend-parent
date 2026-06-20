// MUI Components
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import {
  Alert,
  Box,
  Grid,
  Menu,
  MenuItem,
  Stack,
  Typography,
  styled,
} from "@mui/material";

// Components
import LinkText from "../../../../components/link";

// Constants
import { CANCELLED_SUB_STATUS } from "./constants";

// Style
import classes from "./_OrderList.module.scss";
import { defaultFontStyles, styles } from "./styles";

export const LabelBox = styled(Box)(({ bgColor }) => ({
  ...defaultFontStyles,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  padding: "8px",
  background: bgColor,
  color: "#FFFFFF",
  fontWeight: "700",
  fontSize: "0.6vw",
  width: "52%",
  borderRadius: "2px",
  marginBottom: 10,
}));

export const OrderActionMenu = ({
  orderId,
  orderStatus,
  openActionMenu,
  handleClickActionMenu,
  handleCloseActionMenu,
  openOrderDetails: setActionOpenDetail,
  onClickCancelFormOpen,
  menuList,
}) => {
  const orderDetailOpen = () => {
    setActionOpenDetail();
    handleCloseActionMenu();
  };
  const cancelFormOpen = () => {
    if (orderStatus !== "delivered") {
      onClickCancelFormOpen();
      handleCloseActionMenu();
    }
  };
  return (
    <>
      <button className={classes.buttonOption} onClick={handleClickActionMenu}>
        <Typography>
          <MoreHorizOutlinedIcon />
        </Typography>
      </button>
      <Menu
        id={orderId}
        sx={styles.menuAction}
        anchorEl={openActionMenu}
        open={Boolean(openActionMenu)}
        onClose={handleCloseActionMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {(menuList &&
          menuList.map(
            (menu, idx) =>
              !menu?.hidden && (
                <MenuItem
                  key={idx}
                  divider={idx + 1 !== menuList?.length}
                  onClick={menu?.onClick}
                >
                  {menu?.label}
                </MenuItem>
              )
          )) || (
          <>
            <MenuItem divider onClick={orderDetailOpen}>
              See Order Details
            </MenuItem>
            {/* {orderStatus === "delivered" && (
              <MenuItem divider>Tracking Portal</MenuItem>
            )} */}
            <MenuItem onClick={cancelFormOpen}>
              {orderStatus === "delivered" ? "Complain Order" : "Cancel Order"}
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
};

export const SubStatusLabel = ({ cancelledBy }) => (
  <Alert
    className={classes.subStatusLabel}
    severity="error"
    classes={{
      icon: classes.subStatusIcon,
      message: classes.subStatusMessage,
    }}
  >
    {
      CANCELLED_SUB_STATUS.find((item) =>
        cancelledBy?.includes(item.cancelledBy)
      )?.desc
    }
  </Alert>
);

export const FooterDetail = ({ openOrderDetails }) => (
  <Grid className={classes.footerCard}>
    <Stack direction="row" alignItems="center" gap={2}>
      <LinkText underline="none" onClick={openOrderDetails}>
        See Order Details
      </LinkText>
    </Stack>
  </Grid>
);
