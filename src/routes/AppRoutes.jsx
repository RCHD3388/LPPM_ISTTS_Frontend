import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import LandingPage from '../pages/public/LandingPage';
import LoginPage from '../pages/private/LoginPage';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import MainLayout from '../layout/private/MainLayout';
import TagPage from '../pages/private/TagPage';
import PeriodPage from '../pages/private/PeriodPage';
import BankPage from '../pages/private/BankPage';
import MainLayoutPublic from '../layout/public/MainLayout';
import FilePentingPage from '../pages/private/FilePentingPage';
import PengumumanPage from '../pages/private/PengumumanPage';
import LaporanPage from '../pages/private/LaporanPage';
import ProposalPage from '../pages/private/ProposalPage';
import DosenPage from '../pages/private/DosenPage';
import PengumumanDetailPage from '../pages/private/PengumumanDetailPage';
import SettingPage from '../pages/private/SettingPage';
import ProfilePage from '../pages/private/ProfilePage';
import AuthorPage from '../pages/public/AuthorPage';
import AuthorListPage from '../pages/public/AuthorListPage';
import StatisticPage from '../pages/public/StatisticPage';
import DepartmentListPage from '../pages/public/DepartmenListPage';


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
            { path: "authors", element: <AuthorListPage/>},
            { path: "authors/:authorId", element: <AuthorPage/>},
            { path: "statistic", element: <StatisticPage/>},
            { path: "department", element: <DepartmentListPage/>},
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
            { index: true, element: <Navigate to="/app/proposal" replace /> },
            { path: "tag", element: <TagPage /> },
            { path: "periode", element: <PeriodPage /> },
            { path: "bank", element: <BankPage /> },
            { path: "filepenting", element: <FilePentingPage /> },
            { path: "pengumuman", element: <PengumumanPage /> },
            { path: "pengumuman/:pengumumanId", element: <PengumumanDetailPage /> },
            { path: "dosen", element: <DosenPage /> },
            { path: "proposal", element: <ProposalPage /> },
            { path: "laporan", element: <LaporanPage /> },
            { path: "setting", element: <SettingPage /> },
            { path: "profile", element: <ProfilePage /> },
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