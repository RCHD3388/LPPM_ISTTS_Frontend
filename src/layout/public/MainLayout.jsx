// src/layout/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function MainLayoutPublic() {
  return (
    <div className="">
      <div className="max-w-[50vw]">
        <Navbar />
      </div>
      {/* Konten Halaman (termasuk Navbar) */}
      <div className="">
        {/* Outlet akan merender halaman aktif (Dashboard, Users, dll.) */}
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
}

export default MainLayoutPublic;