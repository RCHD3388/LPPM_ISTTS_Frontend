import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import LandingPage from '../pages/public/LandingPage';
import LoginPage from '../pages/private/LoginPage';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import MainLayout from '../layout/private/MainLayout';
import DashboardPage from '../pages/private/DashboardPage';
import TagPage from '../pages/private/TagPage';
import PeriodPage from '../pages/private/PeriodPage';

const AppRoutes = () => {
  const router = createBrowserRouter([
    // Public Route
    {
      element: <PublicRoutes />,
      children: [
        { path: "/", element: <LandingPage /> },
        { path: "/login", element: <LoginPage /> },
      ]
    },
    {
      element: <PrivateRoutes />,
      children: [
        {
          path: "/app", // Base path untuk seluruh admin panel
          element: <MainLayout />,
          // Halaman-halaman admin menjadi anak dari MainLayout
          children: [
            // Redirect dari /app ke /app/dashboard
            { index: true, element: <Navigate to="/app/dashboard" replace /> },
            { path: "dashboard", element: <DashboardPage /> },
            { path: "tags", element: <TagPage /> },
            { path: "periods", element: <PeriodPage /> },
          ]
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default AppRoutes