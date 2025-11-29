// src/layout/Navbar.jsx
import React from 'react';
import { Bars3Icon, UserIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import LocalStorageService from '../../utils/services/LocalStorageService';

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // 1. Panggil fungsi dari library untuk membersihkan sesi Google
    googleLogout();

    // 2. Hapus token aplikasi Anda dari localStorage (atau di mana pun Anda menyimpannya)
    LocalStorageService.clear();

    // 3. Arahkan pengguna kembali ke halaman login
    navigate('/login');
  };

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-10">
      {/* Tombol untuk membuka drawer di layar kecil */}
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <Bars3Icon className="w-6 h-6" />
        </label>
      </div>

      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Admin LPPM Panel</a>
      </div>

      <div className="flex-none gap-2">
        <div className="flex-none gap-2">
          <NavLink to="/app/profile" className="btn btn-accent mr-2">
            <UserIcon className="w-6 h-6" />
            Profile
          </NavLink>
          <button onClick={handleLogout} className="btn btn-error">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;