// React
import React, { Fragment, Suspense } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Helper
import AuthRoute from "../helper/AuthRoute";
import LayoutChildrenMobile from "../helper/LayoutChildrenMobile";
import LayoutMobile from "../helper/LayoutMobile";

// Components
import Preloader from "../components/preloader/Preloader";

// Lazy Components
const Unauthenticated = React.lazy(() =>
  import("../pages/Unauthenticated/Unauthenticated")
);
const SecretLogin = React.lazy(() =>
  import("../pages/SecretLogin/SecretLogin")
);

// #region parent page
const Dashboard = React.lazy(() => import("../view/mobile/pages/Dashboard"));
const Profile = React.lazy(() => import("../view/mobile/pages/Profile"));
const OrderList = React.lazy(() =>
  import("../view/mobile/pages/OrderList/index")
);
const OrderDetail = React.lazy(() =>
  import("../view/mobile/pages/OrderDetail/index")
);
const SubOrderDetail = React.lazy(() =>
  import("../view/mobile/pages/OrderDetail/SubOrderDetail/index")
);
const DeliveryStatus = React.lazy(() =>
  import("../view/mobile/pages/OrderDetail/DeliveryStatus/index")
);

const Children = React.lazy(() => import("../view/mobile/pages/Children"));
const AddChildren = React.lazy(() =>
  import("../view/mobile/pages/AddChildren")
);
const RedeemCode = React.lazy(() => import("../view/mobile/pages/RedeemCode"));
const Wallet = React.lazy(() => import("../view/mobile/pages/Wallet"));
// #endregion

// #region children page
const ChildrenDashboard = React.lazy(() =>
  import("../view/mobile/pages/ChildrenDashboard")
);
const EditChildren = React.lazy(() =>
  import("../view/mobile/pages/EditChildren")
);
const ChildrenDashboardProfile = React.lazy(() =>
  import("../view/mobile/pages/ChildrenDashboard/Profile")
);
const ChildrenDashboardClasses = React.lazy(() =>
  import("../view/mobile/pages/ChildrenDashboard/Classes")
);
const ChildrenDashboardAssessment = React.lazy(() =>
  import("../view/mobile/pages/ChildrenDashboard/Assessment")
);
const ChildrenDashboardCalendar = React.lazy(() =>
  import("../view/mobile/pages/ChildrenDashboard/Calendar")
);
const ChildrenDashboardEvent = React.lazy(() =>
  import("../view/mobile/pages/ChildrenDashboard/Event")
);
// #endregion
// #region profiling central
const LearningProfilingCentral = React.lazy(() =>
  import("../view/mobile/pages/ProfilingCentral")
);
const AssignTest = React.lazy(() =>
  import("../view/mobile/pages/ProfilingCentral/AssignTest")
);
const AssignHistoryList = React.lazy(() =>
  import("../view/mobile/pages/ProfilingCentral/AssignHistoryList")
);
const FreeAssessment = React.lazy(() =>
  import("../view/mobile/pages/ChildrenDashboard/FreeAssessment")
);
const AssessmentSummary = React.lazy(() =>
  import("../view/mobile/pages/ChildrenDashboard/AssessmentSummary")
);
const AssessmentResult = React.lazy(() =>
  import("../view/mobile/pages/ChildrenDashboard/AssessmentResult")
);
const SummaryTest = React.lazy(() =>
  import("../view/mobile/pages/SummaryTest")
);
// #endregion
// #region settings page
const Settings = React.lazy(() => import("../view/mobile/pages/Settings"));
const PersonalInformationSettings = React.lazy(() =>
  import("../view/mobile/pages/Settings/PersonalInformation")
);
const ChangePasswordSettings = React.lazy(() =>
  import("../view/mobile/pages/Settings/ChangePassword")
);
const Addresses = React.lazy(() =>
  import("../view/mobile/pages/Settings/Addresses")
);
const AddressForm = React.lazy(() =>
  import("../view/mobile/pages/Settings/AddressForm")
);
// #endregion

const MobileRoutes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Fragment>
        <Route element={<AuthRoute />}>
          {/* LayoutMobile to Add Bottom Navbar on Mobile View */}
          <Route element={<LayoutMobile />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/order-list" element={<OrderList type="order" />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Children Module */}
          <Route element={<LayoutChildrenMobile />}>
            <Route
              path="children/:childrenId"
              element={<ChildrenDashboard />}
            />
            <Route
              path="children/:childrenId/classes"
              element={<ChildrenDashboardClasses />}
            />
            <Route
              path="children/:childrenId/profile"
              element={<ChildrenDashboardProfile />}
            />
            <Route
              path="children/:childrenId/profile/events"
              element={<ChildrenDashboardEvent />}
            />

            {/* Assessment */}
            <Route
              path="children/:id/assessment-central"
              element={<ChildrenDashboardAssessment />}
            />
          </Route>

          {/* Module Without Bottom Navbar */}
          {/* Order Module */}
          <Route
            path="/order-detail/:orderType/:orderId"
            element={<OrderDetail />}
          />
          <Route
            path="/order-detail/:orderType/:orderId/sub-order/:subOrderId"
            element={<SubOrderDetail />}
          />
          <Route
            path="/order-detail/:orderType/:orderId/sub-order/:subOrderId/delivery-status"
            element={<DeliveryStatus />}
          />

          {/* Children  */}
          <Route
            path="children/:childrenId/profile/calendars"
            element={<ChildrenDashboardCalendar />}
          />
          <Route path="/redeem-code" element={<RedeemCode />} />

          {/* Learning Profiling Central */}
          <Route
            path="/children/:childrenId/learning-profiling-central"
            element={<LearningProfilingCentral />}
          />
          <Route
            path="/children/:childrenId/learning-profiling-central/assign-test"
            element={<AssignTest />}
          />
          <Route
            path="/children/:childrenId/learning-profiling-central/assign-history"
            element={<AssignHistoryList />}
          />
          <Route
            path="/children/:childrenId/summary-test/:referenceId"
            element={<SummaryTest />}
          />

          {/* Children List and Form */}
          <Route path="children/:childrenId/edit" element={<EditChildren />} />
          <Route path="/children" element={<Children />} />
          <Route path="/children/add" element={<AddChildren />} />
          <Route path="/wallet" element={<Wallet />} />

          {/* Assessment  */}
          <Route
            path="/children/:childrenId/free-assessment/:freeAssessmentId/attempt/:attemptId"
            element={<FreeAssessment />}
          />
          <Route
            path="/children/:childrenId/free-assessment/:freeAssessmentId/summary/:attemptId"
            element={<AssessmentSummary />}
          />
          <Route
            path="/children/:childrenId/free-assessment/:freeAssessmentId/result/:attemptId"
            element={<AssessmentResult />}
          />

          {/* Settings */}
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/settings/personal-information"
            element={<PersonalInformationSettings />}
          />
          <Route
            path="/settings/change-password"
            element={<ChangePasswordSettings />}
          />

          {/* Addresses */}
          <Route path="/settings/addresses" element={<Addresses />} />
          <Route path="/settings/addresses/add" element={<AddressForm />} />
          <Route
            path="/settings/addresses/:addressId"
            element={<AddressForm />}
          />

          {/* Others */}
          <Route path="/unauthenticated" element={<Unauthenticated />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Route>

        {/* Secret Login For Development */}
        {process.env.NODE_ENV === "development" && (
          <Route path="/login" element={<SecretLogin />} />
        )}
      </Fragment>
    )
  );

  return (
    <Suspense fallback={<Preloader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default MobileRoutes;
