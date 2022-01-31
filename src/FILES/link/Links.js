import { Topbar } from "../home-page/Topbar";
import { SidebarData } from "../home-page/side-bar/Sidebar";
import { MainContent } from "../home-page/MainContent";
import { Switch, Route } from "react-router-dom";
import { LeadsData } from "../leads/LeadsData";
// import { ContactsData } from "../contacts/ContactsData";
import { createContext, useState } from "react";
import { Calendarx } from "../calendar/Calendar";
import { Register } from "../authentication/Register";
import { Login } from "../authentication/Login";
import { ProtectedRoute } from "../protected-routes/ProtectedRoute.js";
import { LoginRoute } from "../protected-routes/loginPage";
import { AdminRoute } from "../protected-routes/OnlyAdmin";
import { EditLeadFn } from "../leads/EditLead";
import { ResetPassword } from "../authentication/ResetPassword";
import { NewPassword } from "../authentication/NewPassword";
import { PwdRoute } from "../protected-routes/NewPwdChng";
import { ServiceReqData } from "../service-requests/ServiceReqData";
import { EditServiceReqFn } from "../service-requests/EditServiceReq";
import { ContactsData } from "../contacts/ContactsData";
import { EditContactsFn } from "../contacts/EditContacts";

const initialTitle = "HOME";

export const context = createContext(null);

export function Links() {
  const [title, setTitle] = useState(initialTitle);

  const [titleReg, setTitleReg] = useState(initialTitle);

  const obj = {
    title: title,
    setTitle: setTitle,
    titleReg: titleReg,
    setTitleReg: setTitleReg,
  };

  return (
    <context.Provider value={obj}>
      <>
        <Switch>
          {/* HOME */}
          <ProtectedRoute path="/home">
            <Topbar />
            <SidebarData />
            <MainContent />
          </ProtectedRoute>

          {/* LEADS */}
          <ProtectedRoute exact path="/lead">
            <Topbar />
            <SidebarData />
            <LeadsData />
          </ProtectedRoute>
          <Route path={`/lead/:id`}>
            <Topbar />
            <SidebarData />
            <EditLeadFn />
          </Route>

          {/* SERVICE REQUESTS */}
          <ProtectedRoute exact path="/service-request">
            <Topbar />
            <SidebarData />
            <ServiceReqData />
          </ProtectedRoute>
          <Route path={`/service-request/:id`}>
            <Topbar />
            <SidebarData />
            <EditServiceReqFn />
          </Route>

          {/* CONTACTS     */}
          <ProtectedRoute exact path="/contacts">
            <Topbar />
            <SidebarData />
            <ContactsData />
          </ProtectedRoute>
          <Route path={`/contacts/:id`}>
            <Topbar />
            <SidebarData />
            <EditContactsFn />
          </Route>

          {/* CALENDAR */}
          <ProtectedRoute exact path="/calendar">
            <Topbar />
            <SidebarData />
            <Calendarx />
          </ProtectedRoute>

          {/* REGISTER */}
          <AdminRoute path="/register">
            <Topbar />
            <Register />
          </AdminRoute>

          {/* RESET PASSWORD */}
          <Route path="/reset-password">
            <ResetPassword />
          </Route>

          <PwdRoute exact path="/new-password/:token">
            <NewPassword />
          </PwdRoute>

          {/* LOGIN */}
          <Route path="/adminonly">ADMIN ONLY</Route>
          <LoginRoute path="/">
            <Login />
          </LoginRoute>
        </Switch>
      </>
    </context.Provider>
  );
}
