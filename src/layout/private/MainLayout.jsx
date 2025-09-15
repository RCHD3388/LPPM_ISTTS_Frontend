// src/layout/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function MainLayout() {
  return (
    <div className="drawer lg:drawer-open">
      {/* Checkbox tersembunyi untuk mengontrol state drawer */}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Konten Halaman (termasuk Navbar) */}
      <div className="drawer-content flex flex-col bg-base-100">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          {/* Outlet akan merender halaman aktif (Dashboard, Users, dll.) */}
          <Outlet />
        </main>
      </div>

      {/* Konten Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        {/* Konten menu sidebar dipanggil dari komponen Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
}

export default MainLayout;