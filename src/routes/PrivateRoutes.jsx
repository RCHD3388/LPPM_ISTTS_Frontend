import { Navigate, Outlet } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { useEffect, useRef } from "react";
import LocalStorageService from "../utils/services/LocalStorageService";

const PrivateRoutes = () => {
  const user = LocalStorageService.getItem("app_user");
  const { addToast } = useToast();

  // Prevent toast running twice (because of StrictMode)
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!user.token && !hasShownToast.current) {
      addToast("Silahkan Login terlebih dahulu", "error");
      hasShownToast.current = true;
    }
  }, [user, addToast]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
