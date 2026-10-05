//import React from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { toast } from "react-toastify";
import axiosAPI from "../api/axiosAPI"
import { useState } from "react";
function Login({ setShowModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please enter your admin email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosAPI.post("/users/login", form);

      if (res.data.user?.role !== "admin") {
        toast.error("This account does not have admin access.");
        return;
      }

      dispatch(login(res.data));
      setShowModal?.(false);
      toast.success("Login successful!");
      navigate("/admin", { replace: true });
    } catch (error) {
      console.error("Admin login error:", error);
      toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
 <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-950/80 px-4 py-6">
          <div className="modal-fade relative w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
            <button
              onClick={() => {
                if (setShowModal) {
                  setShowModal(false);
                } else {
                  navigate("/");
                }
              }}
              className="absolute right-5 top-5 rounded-full border border-white/10 bg-slate-950/80 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-900 hover:text-white"
              aria-label="Close admin login"
            >
              ❌
            </button>

            <div className="mb-6 text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Admin access</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Sign in to manage your portfolio</h2>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <label htmlFor="admin-email" className="block text-sm font-medium text-slate-200">Email</label>
              <input
              id="admin-email"
              name="email"
                type="email"
                 value={form.email}
              onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
              <label htmlFor="admin-password" className="block text-sm font-medium text-slate-200">Password</label>
              <input
              id="admin-password"
              name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-4 py-3 text-base font-semibold text-slate-950 transition hover:brightness-105"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      
    </>
  )
}
export default Login;
