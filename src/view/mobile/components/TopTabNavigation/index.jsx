import React, { Fragment } from "react";

// MUI
import { Tab, Tabs } from "@mui/material";

/**
 * @typedef {{
 * title: string;
 * value: string;
 * }}TabValue
 */

/**
 * @param {{
 * tabList: TabValue[];
 * variant: "standard" | "scrollable" | "fullWidth" | undefined;
 * selectedTab: string | number;
 * onChange: (event: React.SyntheticEvent<Element, Event>, value: any) => void
 * children: React.ReactNode
 * }} param0
 */

const TopTabNavigation = ({
  tabList,
  onChange,
  selectedTab,
  variant,
  children,
  ...other
}) => {
  return (
    <>
      <Tabs
        variant={variant}
        onChange={(e, value) => onChange(value)}
        value={selectedTab}
        {...other}
      >
        {tabList?.map((el, index) => (
          <Tab
            key={index}
            label={el.title}
            value={el.value}
            {...a11yProps(el.value)}
          />
        ))}
      </Tabs>
      {children}
    </>
  );
};

/**
 * @param {
 * value: string | number;
 * selectedTab: string | number;
 * children: React.ReactNode
 * } props
 * @returns {*}
 */
export const TopTabPanel = (props) => {
  const { value, selectedTab, children, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== selectedTab}
      id={`mobile-tabpanel-${value}`}
      aria-labelledby={`mobile-tab-${value}`}
      {...other}
    >
      {value === selectedTab && <Fragment>{children}</Fragment>}
    </div>
  );
};

function a11yProps(value) {
  return {
    id: `mobile-tab-${value}`,
    "aria-controls": `mobile-tabpanel-${value}`,
  };
}

export default TopTabNavigation;
