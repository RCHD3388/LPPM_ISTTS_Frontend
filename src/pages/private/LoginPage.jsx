import React from "react";
import { AcademicCapIcon } from "@heroicons/react/24/solid";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const handleGoogleLogin = () => {
    // TODO: Integrasikan login Google di sini (misal Firebase / OAuth2)
    alert("Login menggunakan Google sedang diproses...");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-base-200 to-base-100 relative overflow-hidden">
      {/* Accent background */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-primary/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 blur-3xl rounded-full"></div>

      {/* Login Card */}
      <div className="card w-full max-w-lg bg-base-100 shadow-2xl border border-base-300 z-10">
        <div className="card-body items-center text-center">
          {/* Header */}
          <div className="flex flex-col items-center mb-4">
            <div className="bg-primary text-primary-content rounded-full p-4 mb-4 shadow-md">
              <AcademicCapIcon className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-bold text-primary">
              LPPM ISTTS
            </h1>
            <p className="mt-2 text-base-content/70 text-lg">
              Sistem Administrasi & Pengelolaan Data LPPM ISTTS
            </p>
          </div>

          {/* Divider */}
          <div className="divider my-6">Login Sebagai Admin</div>

          {/* Tombol Login Google */}
          <button
            onClick={handleGoogleLogin}
            className="btn btn-lg bg-white hover:bg-base-200 border border-base-300 flex items-center gap-3 w-full justify-center text-base font-medium text-base-content shadow-md"
          >
            <FcGoogle className="w-6 h-6" />
            Login dengan Google
          </button>

          {/* Footer */}
          <p className="mt-10 text-sm text-base-content/60">
            © {new Date().getFullYear()} LPPM ISTTS • All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
