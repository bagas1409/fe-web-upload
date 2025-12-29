import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // API endpoint based on previous usage
      await api.post("/auth/register", {
        name,
        email,
        password,
      });
      toast.success("Account created successfully! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8 relative z-10 animate-fadeIn">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Create Account</h2>
          <p className="text-slate-500 mt-1">Join us today</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Full Name</label>
            <input
              type="text"
              className="input-field"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Email</label>
            <input
              type="email"
              className="input-field"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full btn-primary py-2.5 text-base shadow-blue-500/25"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-6 text-slate-600 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
