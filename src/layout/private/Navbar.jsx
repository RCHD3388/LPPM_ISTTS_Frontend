// src/layout/Navbar.jsx
import React from 'react';
import { Bars3Icon, UserIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';

function Navbar() {
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
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li >
              <NavLink
                to="/app/profile"
                className='badge badge-primary w-full font-bold'
              >
                <UserIcon className="w-4 h-4" />
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/app/tag"
                className='badge badge-error w-full mt-2 font-bold'
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;