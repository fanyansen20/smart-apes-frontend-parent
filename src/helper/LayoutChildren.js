//React
import { Outlet, matchPath, useLocation } from "react-router-dom";

//Component
import ChildrenNavigation from "../components/Navigation/ChildrenNavigation/ChildrenNavigation";

// constant
import {
  IS_GO_TO_LEARNING_PROFILE_CENTRAL,
  LIST_PATH_TITLE_LOGO,
} from "../constants/listPath";

const LayoutChildren = () => {
  const location = useLocation();

  const isShowTitleLogo = LIST_PATH_TITLE_LOGO.some((path) =>
    matchPath(path, location.pathname)
  );

  const isGoToLearningProfilingCentral = IS_GO_TO_LEARNING_PROFILE_CENTRAL.some(
    (path) => matchPath(path, location.pathname)
  );

  return (
    <div className="layoutChildren">
      <ChildrenNavigation
        showLogoTitle={isShowTitleLogo}
        isGoToLearningProfilingCentral={isGoToLearningProfilingCentral}
      />
      <Outlet />
    </div>
  );
};

export default LayoutChildren;
