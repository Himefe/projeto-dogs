import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

const ProtectedRouter = ({ children }) => {
  const user = useSelector((state) => state.user.data);
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRouter;
