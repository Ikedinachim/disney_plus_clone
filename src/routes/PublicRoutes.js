import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return isAuthenticated ? (
    user?.user?.role === "user" ? (
      <Navigate to="/app" />
    ) : user?.user?.role === "influencer" ? (
      <Navigate to="/influencer" />
    ) : user?.user?.role === "user" && user?.user?.isAdmin ? (
      <Navigate to="/admin" />
    ) : user?.user?.role === "billboard_provider" ? (
      <Navigate to="/billboard" />
    ) : (
      <Navigate to="/login" />
    )
  ) : (
    <div>
      <Outlet />
    </div>
  );
};

export default PublicRoutes;
