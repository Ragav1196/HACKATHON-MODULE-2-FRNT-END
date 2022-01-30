import { Redirect, Route } from "react-router-dom";

export const PwdRoute = (props) => {
  const TokenExpire = localStorage.getItem("tokenExpire");

  function isTokenExpired() {
    if (TokenExpire > new Date().toString()) {
      return true;
    } else {
      return false;
    }
  }

  if (!isTokenExpired()) {
    localStorage.setItem("tokenExpired", true);
    return <Redirect to="/login" />;
  }

  return <Route {...props} />;
};
