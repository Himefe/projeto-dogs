import React from "react";
import Feed from "../Feed/Feed";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user);

  return <div>{user.data.id ? <Feed userID={user.data.id} /> : null}</div>;
};

export default Profile;
