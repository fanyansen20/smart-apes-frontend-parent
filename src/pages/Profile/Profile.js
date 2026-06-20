// React
import { useState } from "react";

// MUI
import { Grid, Typography, Container } from "@mui/material";

// Components
import Sidebar from "../../components/profile/Sidebar/Sidebar";
import PersonalInformation from "../../components/profile/PersonalInformation/PersonalInformation";
import ParentAddress from "../../components/profile/ParentAddress/ParentAddress";
import PasswordAndSecurity from "../../components/profile/PasswordAndSecurity/PasswordAndSecurity";

// List Menu
const ProfileListMenu = [
  {
    label: "PERSONAL INFORMATION",
    children: [
      {
        label: "Personal Information",
        component: <PersonalInformation />,
      },
      { label: "Your Address", component: <ParentAddress /> },
      // { label: "Social Profiles", component: <div>social profiles</div> },
    ],
  },
  {
    label: "SECURITY",
    children: [
      {
        label: "Password and Security",
        component: <PasswordAndSecurity />,
      },
      // { label: "Managed Devices", component: <div>managed devices</div> },
    ],
  },
  // {
  //   label: "PRIVACY",
  //   children: [
  //     { label: "Notifications", component: <div>notifications</div> },
  //     {
  //       label: "Subscribe Newsletter",
  //       component: <div>subscribe newsletter</div>,
  //     },
  //   ],
  // },
];

const Profile = () => {
  const [activeMenu, setActiveMenu] = useState([0, 0]);

  const handleChangeMenu = (arr) => {
    setActiveMenu(arr);
  };

  return (
    <Container maxWidth="lg">
      <Grid container className="content" spacing={1}>
        <Grid item className="title" md={12}>
          <div className="dashboardEventTitle">
            <Typography>Parents Profile</Typography>
          </div>
        </Grid>
        <Grid item md={12}>
          <Grid container spacing={3}>
            <Grid item md={3}>
              <Sidebar
                items={ProfileListMenu}
                handleChangeMenu={handleChangeMenu}
                activeMenu={activeMenu}
              />
            </Grid>
            <Grid item md={9}>
              {ProfileListMenu[activeMenu[0]].children[activeMenu[1]].component}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
