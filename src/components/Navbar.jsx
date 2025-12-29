import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="glass-panel mx-auto max-w-7xl rounded-2xl flex items-center justify-between px-6 py-3 relative">
        {/* Logo Area */}
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform duration-200">
            W
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
            WebUpload
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-1 bg-slate-100/50 p-1 rounded-xl border border-slate-200/50">
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-white/80 transition-all duration-200"
            >
              Dashboard
            </Link>
            <Link
              to="/images"
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-white/80 transition-all duration-200"
            >
              Gallery
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 font-medium text-sm transition-all duration-200 border border-red-100"
          >
            <span>Log out</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-20 left-6 right-6 md:hidden glass-panel rounded-2xl p-4 flex flex-col gap-2 animate-fadeIn z-50">
          <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="px-4 py-3 rounded-xl text-slate-600 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/images"
            onClick={() => setIsOpen(false)}
            className="px-4 py-3 rounded-xl text-slate-600 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors"
          >
            Gallery
          </Link>
          <div className="h-px bg-slate-100 my-1" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-medium transition-colors w-full text-left"
          >
            <span>Log out</span>
          </button>
        </div>
      )}
    </nav>
  );
}
