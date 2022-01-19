import { Redirect, Route } from "react-router-dom";
import { GetUserType } from "../authentication/UserType";

export const AdminRoute = (props) => {
  const token = localStorage.getItem("Token");

  if (token) {
    let decodedObj = GetUserType();
    const user = decodedObj.id.userType;

    if (user === "admin" || user === "manager") {
      return <Route {...props} />;
    }
  }

  return <Redirect to="/adminonly" />;
};
