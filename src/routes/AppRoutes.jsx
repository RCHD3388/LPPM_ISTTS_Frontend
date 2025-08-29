import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import LandingPage from '../pages/public/LandingPage';
import LoginPage from '../pages/private/LoginPage';
import PublicRoutes from './PublicRoutes';

const AppRoutes = () => {
  const router = createBrowserRouter([
    // Public Route
    {
      element: <PublicRoutes />,
      children: [
        { path: "/", element: <LandingPage /> },
        { path: "/login", element: <LoginPage /> },
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default AppRoutes