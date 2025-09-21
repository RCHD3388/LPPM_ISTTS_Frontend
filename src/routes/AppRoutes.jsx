import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import LandingPage from '../pages/public/LandingPage';
import LoginPage from '../pages/private/LoginPage';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import MainLayout from '../layout/private/MainLayout';
import DashboardPage from '../pages/private/DashboardPage';
import TagPage from '../pages/private/TagPage';
import PeriodPage from '../pages/private/PeriodPage';
import BankPage from '../pages/private/BankPage';
import MainLayoutPublic from '../layout/public/MainLayout';

const AppRoutes = () => {
  const router = createBrowserRouter([
    // Public Route
    {
      element: <PublicRoutes />,
      children: [
        {
          path: "/",
          element: <MainLayoutPublic />,
          children: [
            { index: true, element: <Navigate to="/dashboard" replace /> },
            { path: "dashboard", element: <LandingPage /> },
          ],
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
      ],
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
            { path: "tag", element: <TagPage /> },
            { path: "periode", element: <PeriodPage /> },
            { path: "bank", element: <BankPage /> },
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