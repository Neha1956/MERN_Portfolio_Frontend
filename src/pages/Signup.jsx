//import React from 'react';
//import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { toast } from "react-toastify";
import axiosAPI from "../api/axiosAPI"
import { useState } from "react";
function Signup({setShowSignupModal,setShowModal}) {

//const navigate = useNavigate();
const dispatch = useDispatch();

  const [form, setForm] = useState({
  name: "",
  email: "",
  password: "",
  role: "user",
});

const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    const res = await axiosAPI.post("/users/register", form);

    toast.success("Signup successful!");

    dispatch(login(res.data));

    setShowSignupModal(false);
  } catch (error) {
    console.log(error);
    toast.error("Signup failed");
  }
};

  return (
    <>
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-950/80 px-4 py-6">
          <div className="modal-fade relative w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
            <button
              onClick={() => setShowSignupModal(false)}
              className="absolute right-5 top-5 rounded-full border border-white/10 bg-slate-950/80 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-900 hover:text-white"
              aria-label="Close"
            >
              ❌
            </button>

            <div className="mb-6 text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Create account</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Sign up now</h2>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-slate-200">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              <label className="block text-sm font-medium text-slate-200">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
              <label className="block text-sm font-medium text-slate-200">Password</label>
              <input
                type="password"
                placeholder="Create password"
                className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
             <label className="block text-sm font-medium text-slate-200">
  Role
</label>

<input
  type="text"
  value="User"
  readOnly
  className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-400 cursor-not-allowed"
/>
             

              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-3 text-base font-semibold text-slate-950 transition hover:brightness-105"
              >
                Create account
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-400">
                <span>Already have an account?</span>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(true);
                    setShowSignupModal(false);
                  }}
                  className="font-semibold text-cyan-300 transition hover:text-cyan-100"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      
    </>
  )
}

export default Signup
