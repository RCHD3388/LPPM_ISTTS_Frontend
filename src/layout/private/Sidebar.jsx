// src/layout/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, TagIcon, CalendarDaysIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

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
          to="/app/tags"
          className={({ isActive }) => `${commonClasses} ${isActive ? activeClass : inactiveClass}`}
        >
          {/* --- Perubahan di sini: Gunakan TagIcon --- */}
          <TagIcon className="w-5 h-5" />
          Tag
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/app/periods"
          className={({ isActive }) => `${commonClasses} ${isActive ? activeClass : inactiveClass}`}
        >
          {/* --- Perubahan di sini: Gunakan CalendarDaysIcon --- */}
          <CalendarDaysIcon className="w-5 h-5" />
          Period
        </NavLink>
      </li>
    </ul>
  );
}

export default Sidebar;