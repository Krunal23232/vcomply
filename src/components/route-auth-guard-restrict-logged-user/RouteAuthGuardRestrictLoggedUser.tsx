import React, { ReactNode } from "react";
import { Navigate } from "react-router";
import ROUTE_URLS from "../../config/routes";
import LocalstorageService from "../../config/localstorage-services";

interface RouteAuthGuardProps {
  children: ReactNode;
}

const RouteAuthGuardRestrictLoggedUser: React.FC<RouteAuthGuardProps> = ({ children }) => {
  const token = LocalstorageService.getLoggedInUserToken();
  if (token) {
    return <Navigate to={ROUTE_URLS.HOME} replace />;
  }
  return <>{children}</>;
};

export default RouteAuthGuardRestrictLoggedUser;
