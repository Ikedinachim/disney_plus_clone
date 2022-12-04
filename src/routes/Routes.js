import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";

import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
// import PermissionDenied from "./PermissionDenied";

const MainRoutes = () => (
  <Routes>
    {/** Protected Routes For User */}
    {/** Wrap all Route under ProtectedRoutes element */}
    <Route path="/" element={<ProtectedRoutes />}></Route>

    {/** Protected Routes For Admin */}
    {/** Wrap all Route under ProtectedRoutes element */}
    <Route path="/" element={<ProtectedRoutes />}></Route>

    {/** Public Routes */}
    {/** Wrap all Route under PublicRoutes element */}
    <Route path="login" element={<PublicRoutes />}>
      <Route path="/login" element={<Login />} />
    </Route>

    {/** Permission denied route */}
    {/* <Route path="/denied" element={<PermissionDenied />} /> */}
  </Routes>
);

export default MainRoutes;
