//React
import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { getChildrenProfile } from "../store/user/childSlice";

const LayoutFreeAssessment = () => {
  const [childrenProfile, setChildrenProfile] = useState();
  const params = useParams();
  const dispatch = useDispatch();
  const childData = useSelector((store) => store.child);

  // Onload
  useEffect(() => {
    getProfile();
  }, []);

  // Get children profile
  const getProfile = async () => {
    if (!childData.childData) {
      const res = await dispatch(getChildrenProfile(params.childrenId));
      setChildrenProfile(res.payload);
    } else {
      setChildrenProfile(childData.childData);
    }
  };

  return (
    <div className="layoutFreeAssessment">
      <Outlet context={childrenProfile} />
    </div>
  );
};

export default LayoutFreeAssessment;
