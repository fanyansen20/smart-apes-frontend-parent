import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getAllChildren } from "../../../../store/children/getAllChildren";

// MUI
import { Container, Grid, Typography } from "@mui/material";

// Component
import SecondaryButton from "../../../../components/button/SecondaryButton";
import HeaderNavigation from "../../components/HeaderNavigation";
import ChildrenItem from "../Dashboard/components/ChildrenItem";

// Styles
import classes from "./_Children.module.scss";

// Constant
import { maxChildren } from "../../../../constants/children";

// Assets
import AddIcon from "../../../../assets/icons/add-user.svg";

const ChildrenList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // #region redux state
  const { children, totalResults, status } = useSelector(
    (store) => store.getAllChildren
  );
  // #endregion

  // #region function
  const goBack = () => {
    navigate("/");
  };

  const navigateToAddChildren = () => {
    navigate("/children/add");
  };
  // #endregion

  // #region useEffect
  useEffect(() => {
    if (totalResults === 0 && status === "idle") {
      dispatch(getAllChildren());
    }
  }, []);
  // #endregion

  return (
    <Fragment>
      <HeaderNavigation title="Children" goBack={goBack} />
      {totalResults < maxChildren && (
        <Container className={classes.childrenBackgroundContainer}>
          <Grid className={classes.childrenHeaderContainer}>
            <SecondaryButton fullWidth onClick={navigateToAddChildren}>
              <img src={AddIcon} />
              <p>Add New Child</p>
            </SecondaryButton>
          </Grid>
        </Container>
      )}
      <Container className={classes.childrenBackgroundContainer}>
        <Grid className={classes.title} xs={12}>
          <div className={classes.dashboardEventTitle}>
            <Typography>{`My Children (${totalResults}/${maxChildren})`}</Typography>
          </div>
        </Grid>
        <Grid xs={12} spacing={1} className={classes.childrenListContainer}>
          {children?.map((child, index) => (
            <ChildrenItem data={child} type={2} key={index} />
          ))}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default ChildrenList;
