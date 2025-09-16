// src/layout/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function MainLayoutPublic() {
  return (
    <div className="">
      <Navbar />
      {/* Konten Halaman (termasuk Navbar) */}
      <div className="mt-20">
        {/* Outlet akan merender halaman aktif (Dashboard, Users, dll.) */}
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayoutPublic;