// src/layout/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, TagIcon, CalendarDaysIcon, CreditCardIcon, DocumentCheckIcon, MegaphoneIcon, DocumentChartBarIcon, DocumentIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

function Sidebar() {
  const commonClasses = "flex items-center gap-2 rounded-lg px-4 py-2";
  const activeClass = "bg-primary text-primary-content";
  const inactiveClass = "hover:bg-base-300";

  return (
    // Struktur ul ini akan dimasukkan ke dalam .drawer-side
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      <li className="text-xl font-bold p-4">
        Admin Panel
      </li>
      {/* Tambahkan spasi atau border di bawah judul jika perlu */}
      <li className="menu-title">Menu</li>
      <li>
        <NavLink
          to="/app/dashboard"
          className={({ isActive }) => `${commonClasses} ${isActive ? activeClass : inactiveClass}`}
        >
          <HomeIcon className="w-5 h-5" />
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/app/tag"
          className={({ isActive }) => `${commonClasses} ${isActive ? activeClass : inactiveClass}`}
        >
          {/* --- Perubahan di sini: Gunakan TagIcon --- */}
          <TagIcon className="w-5 h-5" />
          Tag
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/app/periode"
          className={({ isActive }) => `${commonClasses} ${isActive ? activeClass : inactiveClass}`}
        >
          {/* --- Perubahan di sini: Gunakan CalendarDaysIcon --- */}
          <CalendarDaysIcon className="w-5 h-5" />
          Period
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/app/bank"
          className={({ isActive }) => `${commonClasses} ${isActive ? activeClass : inactiveClass}`}
        >
          {/* --- Perubahan di sini: Gunakan CalendarDaysIcon --- */}
          <CreditCardIcon className="w-5 h-5" />
          Bank
        </NavLink>
        <NavLink
          to="/app/filepenting"
          className={({ isActive }) => `${commonClasses} ${isActive ? activeClass : inactiveClass}`}
        >
          {/* --- Perubahan di sini: Gunakan CalendarDaysIcon --- */}
          <DocumentCheckIcon className="w-5 h-5" />
          File Penting
        </NavLink>
        <NavLink
          to="/app/pengumuman"
          className={({ isActive }) => `${commonClasses} ${isActive ? activeClass : inactiveClass}`}
        >
          {/* --- Perubahan di sini: Gunakan CalendarDaysIcon --- */}
          <MegaphoneIcon className="w-5 h-5" />
          Pengumuman
        </NavLink>
        <NavLink
          to="/app/dosen"
          className={({ isActive }) => `${commonClasses} ${isActive ? activeClass : inactiveClass}`}
        >
          {/* --- Perubahan di sini: Gunakan CalendarDaysIcon --- */}
          <AcademicCapIcon className="w-5 h-5" />
          Dosen
        </NavLink>
        <NavLink
          to="/app/proposal"
          className={({ isActive }) => `${commonClasses} ${isActive ? activeClass : inactiveClass}`}
        >
          {/* --- Perubahan di sini: Gunakan CalendarDaysIcon --- */}
          <DocumentIcon className="w-5 h-5" />
          Proposal
        </NavLink>
        <NavLink
          to="/app/laporan"
          className={({ isActive }) => `${commonClasses} ${isActive ? activeClass : inactiveClass}`}
        >
          {/* --- Perubahan di sini: Gunakan CalendarDaysIcon --- */}
          <DocumentChartBarIcon className="w-5 h-5" />
          Laporan
        </NavLink>
      </li>
    </ul>
  );
}

export default Sidebar;