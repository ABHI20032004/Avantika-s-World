import {
  Camera,
  Cake,
  Home,
  Menu,
  Upload,
  User,
  X,
  LogIn,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function MobileNav() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/5 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] pt-2 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl md:hidden">

        <div className="mx-auto flex max-w-md items-end justify-around">

          {/* Home */}

          <Link
            to="/"
            className={`flex min-w-[64px] flex-col items-center gap-1 rounded-xl px-3 py-2 transition ${
              isActive("/")
                ? "text-[#ff8066]"
                : "text-gray-400"
            }`}
          >
            <Home
              size={21}
              strokeWidth={
                isActive("/") ? 2.7 : 2
              }
            />

            <span className="text-[10px] font-bold">
              Home
            </span>
          </Link>


          {/* Gallery */}

          <Link
            to="/gallery"
            className={`flex min-w-[64px] flex-col items-center gap-1 rounded-xl px-3 py-2 transition ${
              isActive("/gallery")
                ? "text-[#ff8066]"
                : "text-gray-400"
            }`}
          >
            <Camera
              size={21}
              strokeWidth={
                isActive("/gallery")
                  ? 2.7
                  : 2
              }
            />

            <span className="text-[10px] font-bold">
              Gallery
            </span>
          </Link>


          {/* Center Upload Button */}

          <Link
            to="/upload"
            className="relative -mt-7 flex h-14 w-14 items-center justify-center rounded-full bg-[#ff8066] text-white shadow-[0_8px_25px_rgba(255,128,102,0.4)] ring-4 ring-[#fffaf4] transition active:scale-95"
            aria-label="Upload memory"
          >
            <Upload size={23} strokeWidth={2.5} />

            {/* Login indicator */}

            {!user && (
              <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-[#172033]" />
            )}
          </Link>


          {/* Birthdays */}

          <Link
            to="/birthdays"
            className={`flex min-w-[64px] flex-col items-center gap-1 rounded-xl px-3 py-2 transition ${
              isActive("/birthdays")
                ? "text-[#ff8066]"
                : "text-gray-400"
            }`}
          >
            <Cake
              size={21}
              strokeWidth={
                isActive("/birthdays")
                  ? 2.7
                  : 2
              }
            />

            <span className="text-[10px] font-bold">
              Birthdays
            </span>
          </Link>


          {/* Menu */}

          <button
            onClick={() => setMenuOpen(true)}
            className="flex min-w-[64px] flex-col items-center gap-1 rounded-xl px-3 py-2 text-gray-400"
            aria-label="Open menu"
          >
            <Menu size={21} />

            <span className="text-[10px] font-bold">
              More
            </span>
          </button>

        </div>

      </nav>


      {/* More Menu */}

      {menuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">

          {/* Backdrop */}

          <button
            onClick={closeMenu}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            aria-label="Close menu"
          />


          {/* Bottom Sheet */}

          <div className="absolute bottom-0 left-0 right-0 rounded-t-[2rem] bg-white px-5 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-5 shadow-2xl">

            <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-gray-200" />

            <div className="mb-6 flex items-center justify-between">

              <div>

                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff8066]">
                  Memory Vault
                </p>

                <h2 className="mt-1 text-xl font-black">
                  {user
                    ? `Welcome, ${user.name}`
                    : "Explore your memories"}
                </h2>

              </div>

              <button
                onClick={closeMenu}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100"
              >
                <X size={19} />
              </button>

            </div>


            <div className="space-y-2">

              {/* Dashboard */}

              <Link
                to="/about"
                onClick={closeMenu}
                className="flex min-h-14 items-center gap-4 rounded-2xl bg-[#fffaf4] px-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#ff8066] shadow-sm">
                  <LayoutDashboard size={19} />
                </div>

                <div>
                  <p className="text-sm font-black">
                    About
                  </p>

                  <p className="text-xs text-gray-400">
                    Know more about Avantika
                  </p>
                </div>
              </Link>


              {/* Upload */}

              <Link
                to="/upload"
                onClick={closeMenu}
                className="flex min-h-14 items-center gap-4 rounded-2xl bg-[#fffaf4] px-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff8066] text-white">
                  <Upload size={19} />
                </div>

                <div>
                  <p className="text-sm font-black">
                    Upload Memory
                  </p>

                  <p className="text-xs text-gray-400">
                    Add a photo or video
                  </p>
                </div>

                {!user && (
                  <span className="ml-auto rounded-full bg-[#172033] px-2.5 py-1 text-[9px] font-black text-white">
                    LOGIN
                  </span>
                )}
              </Link>


              {/* Login / Logout */}

              {user ? (
                <button
                  onClick={async () => {
                    await logout();
                    closeMenu();
                  }}
                  className="flex min-h-14 w-full items-center gap-4 rounded-2xl bg-red-50 px-4 text-left"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-red-500">
                    <LogOut size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-black text-red-500">
                      Logout
                    </p>

                    <p className="text-xs text-red-300">
                      Sign out of your account
                    </p>
                  </div>
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex min-h-14 items-center gap-4 rounded-2xl bg-[#172033] px-4 text-white"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <LogIn size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-black">
                      Login
                    </p>

                    <p className="text-xs text-white/50">
                      Login to upload memories
                    </p>
                  </div>
                </Link>
              )}

            </div>

          </div>

        </div>
      )}
    </>
  );
}

export default MobileNav;