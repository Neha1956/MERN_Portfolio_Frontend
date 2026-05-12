//import React from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { toast } from "react-toastify";
import axiosAPI from "../api/axiosAPI"
import { useState } from "react";
function Login({ setShowModal, setShowSignupModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
const[form,setForm]=useState({
  email:"",
  password:"",
  role:""
})
const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (!form.email || !form.password || !form.role) {
      toast.error("Please fill in all fields.");
      return;
    }

    const res = await axiosAPI.post("/users/login", form);

    dispatch(login(res.data));
    setShowModal(false);
    toast.success("Login successful!");

    if (res.data.user.role === "admin") {
      navigate("/admin");
    } else if (res.data.user.role === "user") {
      navigate("/home");
    } else {
      toast.error("Invalid user role");
    }
  } catch (error) {
    console.error("Login error:", error);
    toast.error("Login failed. Please check credentials.");
  }
};

  return (
    <>
 <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-950/80 px-4 py-6">
          <div className="modal-fade relative w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-5 top-5 rounded-full border border-white/10 bg-slate-950/80 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-900 hover:text-white"
              aria-label="Close"
            >
              ❌
            </button>

            <div className="mb-6 text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Login required</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Sign in to continue</h2>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-slate-200">Email</label>
              <input
              name="email"
                type="email"
                 value={form.email}
              onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
              <label className="block text-sm font-medium text-slate-200">Password</label>
              <input
              name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
              <label className="block text-sm font-medium text-slate-200">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              >
                <option value="" className="bg-slate-950 text-slate-100">Select Role</option>
                <option value="user" className="bg-slate-950 text-slate-100" >
                  User
                </option>
                <option value="admin" className="bg-slate-950 text-slate-100">
                  Admin
                </option>
              </select>

              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-4 py-3 text-base font-semibold text-slate-950 transition hover:brightness-105"
              >
                Continue
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-400">
                <span>Don't have an account?</span>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setShowSignupModal(true);
                  }}
                  className="font-semibold text-cyan-300 transition hover:text-cyan-100"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      
    </>
  )
}
export default Login;
