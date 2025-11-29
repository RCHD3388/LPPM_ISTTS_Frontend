// src/layout/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, TagIcon, CalendarDaysIcon, Cog6ToothIcon, CreditCardIcon, DocumentCheckIcon, MegaphoneIcon, DocumentChartBarIcon, DocumentIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import LocalStorageService from '../../utils/services/LocalStorageService';

export const menuItems = [
  {
    label: "Tag",
    path: "/app/tag",
    icon: TagIcon,
    roles: ["2"], // hanya role 2 dan 3 yang bisa lihat
  },
  {
    label: "Period",
    path: "/app/periode",
    icon: CalendarDaysIcon,
    roles: ["2"],
  },
  {
    label: "Bank",
    path: "/app/bank",
    icon: CreditCardIcon,
    roles: ["2"],
  },
  {
    label: "File Penting",
    path: "/app/filepenting",
    icon: DocumentCheckIcon,
    roles: ["2"],
  },
  {
    label: "Pengumuman",
    path: "/app/pengumuman",
    icon: MegaphoneIcon,
    roles: ["2"],
  },
  {
    label: "Dosen",
    path: "/app/dosen",
    icon: AcademicCapIcon,
    roles: ["2"],
  },
  {
    label: "Proposal",
    path: "/app/proposal",
    icon: DocumentIcon,
    roles: ["1", "2"], // role_id 1 boleh lihat
  },
  {
    label: "Laporan",
    path: "/app/laporan",
    icon: DocumentChartBarIcon,
    roles: ["1", "2"], // role_id 1 boleh lihat
  },
  {
    label: "Setting",
    path: "/app/setting",
    icon: Cog6ToothIcon,
    roles: ["2"],
  },
];

function Sidebar() {
  const user = LocalStorageService.getItem("app_user");

  const commonClasses = "flex items-center gap-2 rounded-lg px-4 py-2";
  const activeClass = "bg-primary text-primary-content";
  const inactiveClass = "hover:bg-base-300";

  // Filter menu berdasarkan role user
  const filteredMenu = menuItems.filter(item =>
    item.roles.includes(user?.role_id)
  );

  return (
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      <li className="text-xl font-bold p-4">
        Admin LPPM Panel
      </li>

      <li className="menu-title">Menu</li>

      {filteredMenu.map(item => {
        const Icon = item.icon;

        return (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `${commonClasses} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}

export default Sidebar;