import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Dashboard() {
  const [stats, setStats] = useState({
    uploads: "unlimited",
    activity: "+94%",
    activeUsers: 1,
  });
  const navigate = useNavigate();

  // In a real app, you might fetch stats here
  useEffect(() => {
    // fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen pt-24 px-6 pb-12 bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10 animate-fadeIn">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Dashboard</h1>
          <p className="text-slate-500 text-lg">
            Manage your activities and view reports.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Stats Cards */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col items-start gap-4 hover:shadow-lg transition-shadow duration-300">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            <div>
              <p className="text-slate-500 font-medium">Total Uploads</p>
              <h3 className="text-3xl font-bold text-slate-800">
                {stats.uploads}
              </h3>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col items-start gap-4 hover:shadow-lg transition-shadow duration-300">
            <div className="p-3 bg-violet-100 text-violet-600 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <div>
              <p className="text-slate-500 font-medium">Activity</p>
              <h3 className="text-3xl font-bold text-slate-800">
                {stats.activity}
              </h3>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col items-start gap-4 hover:shadow-lg transition-shadow duration-300">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div>
              <p className="text-slate-500 font-medium">Active Users</p>
              <h3 className="text-3xl font-bold text-slate-800">
                {stats.activeUsers}
              </h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-panel p-8 rounded-2xl min-h-[300px]">
            <h3 className="text-xl font-bold text-slate-800 mb-4">
              Recent Uploads
            </h3>
            <div className="text-center text-slate-400 py-12">
              under development
            </div>
          </div>
          <div className="glass-panel p-8 rounded-2xl min-h-[300px]">
            <h3 className="text-xl font-bold text-slate-800 mb-4">
              System Status
            </h3>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="text-slate-600">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
