import React from "react";
import Feed from "../Feed/Feed";

import { UserContext } from "../../UserContext";

const Profile = () => {
  const { userID } = React.useContext(UserContext);
  return <div>{userID ? <Feed userID={userID} /> : null}</div>;
};

export default Profile;
