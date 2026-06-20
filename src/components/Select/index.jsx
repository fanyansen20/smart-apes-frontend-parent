import React, { memo, useState, useMemo, useCallback, useEffect } from "react";
import {
  Grid,
  Typography,
  Stack,
  Paper,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  OutlinedInput,
  Checkbox,
  ListItemText,
  ListItemIcon,
  CircularProgress,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LabelInput from "../LabelInput";
import "./style.scss";

function SelectInput(props) {
  const {
    itemValues,
    labelSelect,
    placeholder,
    nestedMenu,
    id,
    onOpen,
    onClose,
    onChange,
    name,
    defaultValue,
    // menuOnClick,
    // menuNestedOnClick,
    // MenuProps,
    loading,
    error,
    helperText,
    multipleSelectNested,
    maxSelected,
    multipleValue,
    multipleLabel,
    reset,
    stopReset,
    ...allProps
  } = props;

  const menuValues = useMemo(
    () =>
      (itemValues?.length > 0 &&
        itemValues.map((item) => ({
          ...item,
          mainParent: true,
          activeMenuId: 1,
        }))) ||
      [],
    [itemValues]
  );

  const [activeMenu, setActiveMenu] = useState([menuValues]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [selectedMenuLabel, setSelectedMenuLabel] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (reset && stopReset) {
      setActiveMenu([menuValues]);
      stopReset();
    }
  }, [reset, menuValues, stopReset]);

  const handleClose = useCallback(() => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  }, [setOpen, onClose]);

  const handleOpen = useCallback(() => {
    setOpen(true);
    if (onOpen) {
      onOpen();
    }
  }, [setOpen, onOpen]);

  const handleMenuClick = useCallback(
    (item, action) => {
      const { activeMenuId, children, label, value, id, display_string, name } =
        item;
      const currentActiveMenu = activeMenu.filter(
        (_item, idx) => idx < activeMenuId
      );
      const currentSelectedValue = selectedValue.filter(
        (_item, idx) => idx < activeMenuId
      );
      const currentSelectedMenuLabel = selectedMenuLabel.filter(
        (_item, idx) => idx < activeMenuId
      );

      currentSelectedValue.splice(activeMenuId - 1, 1, value || id);
      currentSelectedMenuLabel.splice(
        activeMenuId - 1,
        1,
        label || display_string
      );

      if (
        nestedMenu &&
        (!children || children?.length === 0) &&
        activeMenuId === currentSelectedMenuLabel.length &&
        action === "onClick"
      ) {
        handleClose();
        if (currentSelectedValue.length === activeMenu.length && onChange) {
          const menu = {
            target: {
              name,
              item,
              value: currentSelectedValue[currentSelectedValue.length - 1],
              nestedLabel:
                currentSelectedMenuLabel.length > 1
                  ? currentSelectedMenuLabel.join(" > ")
                  : currentSelectedMenuLabel[0],
              label: [],
            },
          };

          if (multipleSelectNested) {
            if (
              !multipleLabel?.includes(label || name) &&
              multipleLabel?.length < maxSelected
            ) {
              const currentMultipleLabel = [
                ...(multipleLabel || []),
                label || name,
              ];
              const currentMultipleValue = [
                ...(multipleValue || []),
                currentSelectedValue[currentSelectedValue.length - 1],
              ];

              menu.target.value = currentMultipleValue;
              menu.target.label = currentMultipleLabel;
            } else {
              const currentMultipleLabel = multipleLabel?.filter(
                (item) => item !== (label || name)
              );
              const currentMultipleValue = multipleValue?.filter(
                (item) =>
                  item !== currentSelectedValue[currentSelectedValue.length - 1]
              );

              menu.target.value = currentMultipleValue;
              menu.target.label = currentMultipleLabel;
            }
          } else {
            setSelectedValue([...currentSelectedValue]);
            setSelectedMenuLabel([...currentSelectedMenuLabel]);
          }
          onChange(menu);
        } else {
          setSelectedValue([...currentSelectedValue]);
          setSelectedMenuLabel([...currentSelectedMenuLabel]);
        }
      }

      if (nestedMenu && children) {
        const currentChildMenu = children.map((item) => ({
          ...item,
          activeMenuId: activeMenuId + 1,
        }));
        setActiveMenu([...currentActiveMenu, currentChildMenu]);
        setSelectedValue([...currentSelectedValue]);
        setSelectedMenuLabel([...currentSelectedMenuLabel]);
      }
    },
    [
      activeMenu,
      selectedMenuLabel,
      nestedMenu,
      handleClose,
      selectedValue,
      onChange,
      multipleSelectNested,
      maxSelected,
      multipleLabel,
      multipleValue,
    ]
  );

  const nestedMenuList = useMemo(() => {
    const gridItemSize = Math.floor(12 / activeMenu.length);

    const renderListItemText = (item) => {
      if (
        (!item.children || item.children?.length === 0) &&
        multipleSelectNested
      ) {
        return (
          <Stack direction="row" alignItems="center">
            <Checkbox
              sx={{
                width: "36px",
                height: "36px",
                "&.Mui-checked": {
                  color: "#7E54F1",
                },
              }}
              size="small"
              inputProps={{ "aria-label": "controlled" }}
              checked={
                item.label ||
                selectedMenuLabel.includes(item.display_string) ||
                multipleLabel?.includes(item.name)
              }
            />
            {item.label || item.display_string}
          </Stack>
        );
      }
      return item.label || item.display_string;
    };

    return (
      <Grid container>
        {activeMenu.map((valueMenu, valueMenuIdx) => (
          <Grid
            item
            md={gridItemSize}
            key={valueMenuIdx}
            className="mui-nested-menu"
          >
            {valueMenu.map((menuItem, menuItemIdx) => (
              <MenuItem
                key={menuItemIdx}
                sx={
                  (!menuItem.children || menuItem.children?.length === 0) &&
                  multipleSelectNested && {
                    paddingLeft: "8px",
                    paddingTop: 0,
                    paddingBottom: 0,
                  }
                }
                className="mui-menu-item"
                value={menuItem.value || menuItem.id}
                selected={
                  menuItem.label ||
                  selectedMenuLabel.includes(menuItem.display_string) ||
                  ((!menuItem.children || menuItem.children?.length === 0) &&
                    multipleLabel?.includes(menuItem.name))
                }
                onMouseOver={() => open && handleMenuClick(menuItem)}
                onClick={() => handleMenuClick(menuItem, "onClick")}
              >
                <ListItemText>{renderListItemText(menuItem)}</ListItemText>
                {menuItem.children && menuItem.children.length > 0 && (
                  <ListItemIcon>
                    <KeyboardArrowRightIcon />
                  </ListItemIcon>
                )}
              </MenuItem>
            ))}
          </Grid>
        ))}
      </Grid>
    );
  }, [
    activeMenu,
    handleMenuClick,
    selectedMenuLabel,
    open,
    multipleSelectNested,
    multipleLabel,
  ]);

  return (
    <div className="mui-select-container">
      {labelSelect && <LabelInput id={id} value={labelSelect} />}
      {multipleSelectNested && (
        <Paper variant="outlined">{nestedMenuList}</Paper>
      )}
      {!multipleSelectNested && (
        <FormControl className="mui-select-form-control" size="small" id={name}>
          <Select
            {...allProps}
            name={name}
            open={open}
            onClose={() => {
              handleClose();
            }}
            onOpen={handleOpen}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (nestedMenu && selectedMenuLabel.length > 0 && defaultValue) {
                return selectedMenuLabel.length > 1
                  ? selectedMenuLabel.join(" > ")
                  : selectedMenuLabel[0];
              }

              if (nestedMenu && defaultValue) {
                return defaultValue;
              }

              if (defaultValue) {
                return defaultValue;
              }

              if (!selected) {
                return <span className="selected-text">{placeholder}</span>;
              }

              if (!nestedMenu) {
                const valuesItem = menuValues.map(
                  (item) => item.value || item.id
                );
                return menuValues[valuesItem.indexOf(selected)]?.label;
              }
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 280,
                  "::-webkit-scrollbar": {
                    width: 8,
                  },
                  "::-webkit-scrollbar-thumb": {
                    background: "rgb(218, 218, 218)",
                    borderRadius: "4px",
                  },
                  "::-webkit-scrollbar-track": {
                    background: "#FFFFFF",
                  },
                },
              },
              classes: {
                paper: "mui-select-container",
              },
            }}
            displayEmpty
            error={error}
          >
            {loading && (
              <Stack alignItems="center">
                <CircularProgress
                  sx={{
                    margin: "9px 0",
                    color: "gray",
                  }}
                  size={25}
                />
              </Stack>
            )}
            {!loading && (!menuValues || menuValues?.length === 0) && (
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: 15,
                  margin: "9px 0",
                  color: "gray",
                }}
              >
                Data is not available
              </Typography>
            )}
            {!loading && nestedMenu && nestedMenuList}
            {!loading &&
              !nestedMenu &&
              menuValues.map((menu, index) => (
                <MenuItem
                  key={index}
                  className="mui-menu-menu"
                  value={menu.value || menu.id}
                  name={menu.label || menu.display_string}
                  onClick={() => {
                    const { value, label } = menu;
                    const e = {
                      target: {
                        value,
                        label,
                      },
                    };
                    onChange(e);
                  }}
                >
                  {menu.label || menu.display_string}
                </MenuItem>
              ))}
          </Select>
          {error && helperText && (
            <FormHelperText
              sx={{
                marginLeft: 1,
              }}
              error={Boolean(error)}
            >
              {helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    </div>
  );
}

export default memo(SelectInput);
