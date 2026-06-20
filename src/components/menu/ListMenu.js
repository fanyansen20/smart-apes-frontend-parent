import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Material UI
import {
  Grid,
  Typography,
  Container,
  Menu,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

// Icons
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ReactComponent as DashboardIcon } from "../../assets/icons/dashboard.svg";
import { ReactComponent as UserIcon } from "../../assets/icons/user.svg";
import { ReactComponent as BagIcon } from "../../assets/icons/bag.svg";
import { ReactComponent as WalletIcon } from "../../assets/icons/wallet.svg";
// import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar.svg";
import { ReactComponent as OrdersIcon } from "../../assets/icons/orders.svg";
import { ReactComponent as DisputedOrderIcon } from "../../assets/icons/disputed-orders.svg";

// Styles
import "./ListMenuDropdown.scss";

const ORDER_DROPDOWN_ITEMS = [
  {
    icon: <OrdersIcon width={38} />,
    primary: "Orders",
    secondary: "Manage all of your orders here",
    link: "/order-list",
  },
  {
    icon: <DisputedOrderIcon width={38} />,
    primary: "Disputed Order",
    secondary: "List of the complain order you’ve been made",
    link: "/disputed-order",
  },
];

const MENU_ITEMS = [
  { label: "Dashboard", icon: <DashboardIcon />, link: "/" },
  {
    label: "Orders",
    menuClassName: "orderMenu",
    icon: <BagIcon />,
    link: ["/order-list", "/disputed-order", "/give-ratings"],
    dropdownComponent: ({
      dropdownListOnClick,
      checkIsListSelected,
      ...otherProps
    }) => (
      <Menu
        {...otherProps}
        classes={{
          list: "dropdown-menu-list-order",
          paper: "paper-dropdown-menu-order",
        }}
      >
        {ORDER_DROPDOWN_ITEMS.map(({ icon, link, ...otherItems }, key) => {
          const isSelected = checkIsListSelected(link);
          return (
            <ListItem key={key} disablePadding>
              <ListItemButton
                onClick={() => link && dropdownListOnClick(link)}
                selected={isSelected}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText {...otherItems} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </Menu>
    ),
  },
  { label: "Wallet", icon: <WalletIcon />, link: "/wallet" },
  // { label: "Children", icon: <PeopleOutline />, link: "/children" },
  { label: "Profile", icon: <UserIcon />, link: "/profile" },
];

const ListMenu = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeDropdownTab, setActiveDropdownTab] = useState(null);
  const [orderMenuEl, setOrderMenuEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const menuIdxByLink = MENU_ITEMS.findIndex((item) =>
    item.link.includes(location?.pathname)
  );

  useEffect(() => {
    setActiveTab(menuIdxByLink);
  }, [location.pathname]);

  const handleChangeTab = ({ index, link, event, hasDropdown }) => {
    if (hasDropdown) {
      setActiveDropdownTab(index);
    } else {
      setActiveTab(index);
      navigate(link);
      setActiveDropdownTab(null);
    }
    setOrderMenuEl(event.currentTarget);
  };

  const dropdownListOnClick = (link) => {
    setOrderMenuEl(null);
    setActiveDropdownTab(null);
    navigate(link);
  };

  return (
    <Grid container className="menu" spacing={1} justifyContent="space-evenly">
      <Container maxWidth="lg">
        {MENU_ITEMS.map((item, index) => (
          <Grid
            item
            md={2.5}
            key={index}
            className={`${
              activeTab === index ? "itemMenu-active" : "itemMenu"
            } ${item?.menuClassName}`}
            onClick={(e) =>
              handleChangeTab({
                index,
                link: item?.link,
                event: e,
                hasDropdown: Boolean(item?.dropdownComponent),
              })
            }
          >
            {item.icon}
            <Typography className="textMenu">{item.label}</Typography>
            {item?.dropdownComponent && <KeyboardArrowDownIcon />}
          </Grid>
        ))}
        {MENU_ITEMS.find(
          (item, index) =>
            index === activeDropdownTab && item?.dropdownComponent
        )?.dropdownComponent({
          open: Boolean(orderMenuEl),
          anchorEl: orderMenuEl,
          onClose: () => setOrderMenuEl(null),
          dropdownListOnClick,
          checkIsListSelected: (currentLink) =>
            location.pathname === currentLink,
        })}
      </Container>
    </Grid>
  );
};

export default ListMenu;
