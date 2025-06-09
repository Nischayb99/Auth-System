import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    setIsMobileMenuOpen(false);
  };

  // Helper for active link styling
  const isActive = (path) =>
    location.pathname === path
      ? "bg-primary-700 text-white shadow-md"
      : "hover:bg-primary-500 hover:text-white";

  return (
    <nav className="bg-primary-600 text-white sticky top-0 z-30 shadow-xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight group">
              <img
                src="/bondify.svg"
                alt="Bondify"
                className="w-9 h-9 drop-shadow-lg group-hover:scale-110 transition-transform"
              />
              <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-400 bg-clip-text text-transparent group-hover:from-primary-100 group-hover:to-blue-400 transition-colors">
                Auth System
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded transition font-semibold ${isActive("/")}`}
            >
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/chats"
                  className={`px-4 py-2 rounded transition font-semibold ${isActive("/chats")}`}
                >
                  Chats
                </Link>
                <Link
                  to="/profile"
                  className={`px-4 py-2 rounded transition font-semibold ${isActive("/profile")}`}
                >
                  Profile
                </Link>
                <Link
                  to="/demo"
                  className={`px-4 py-2 rounded transition font-semibold ${isActive("/demo")}`}
                >
                  Demo
                </Link>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded transition font-semibold ${isActive("/login")}`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="ml-2 px-4 py-2 rounded bg-gradient-to-r from-blue-400 to-cyan-400 text-primary-900 font-bold shadow hover:from-blue-500 hover:to-cyan-500 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
            {isAuthenticated && (
              <>
                <span className="ml-4 font-semibold text-primary-100 flex items-center gap-2">
                  <img
                    src={user?.avatar || "/df-avatar.png"}
                    alt={user?.username}
                    className="w-7 h-7 rounded-full border-2 border-primary-200 object-cover"
                  />
                  {user?.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="ml-2 px-4 py-2 rounded bg-primary-700 hover:bg-primary-800 font-semibold shadow transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-primary-500 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-primary-600 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link
              to="/"
              className={`block px-4 py-2 rounded font-semibold ${isActive("/")}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/chats"
                  className={`block px-4 py-2 rounded font-semibold ${isActive("/chats")}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Chats
                </Link>
                <Link
                  to="/profile"
                  className={`block px-4 py-2 rounded font-semibold ${isActive("/profile")}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/about"
                  className={`block px-4 py-2 rounded font-semibold ${isActive("/about")}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <span className="px-4 py-2 text-primary-100 font-semibold flex items-center gap-2">
                  <img
                    src={user?.avatar || "/df-avatar.png"}
                    alt={user?.username}
                    className="w-7 h-7 rounded-full border-2 border-primary-200 object-cover"
                  />
                  {user?.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 rounded bg-primary-700 hover:bg-primary-800 font-semibold shadow transition"
                >
                  Logout
                </button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className={`block px-4 py-2 rounded font-semibold ${isActive("/login")}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 rounded bg-gradient-to-r from-blue-400 to-cyan-400 text-primary-900 font-bold shadow hover:from-blue-500 hover:to-cyan-500 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;