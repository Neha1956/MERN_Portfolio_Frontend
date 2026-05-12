import { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),transparent_25%)]" />
      <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl animate-float" />
      <div className="absolute right-16 top-1/2 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl animate-float animation-delay-2000" />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-10 w-full max-w-4xl rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-300">Welcome</p>
          <h1 className="mb-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl">Welcome to my portfolio</h1>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-8 text-slate-300">
            Please login to continue and explore my projects, skills, and contact info. Enjoy a smooth animated entrance while this page comes to life.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-8 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Login
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-xl shadow-cyan-500/10 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Secure</p>
            <h2 className="mt-3 text-xl font-semibold text-white">Protected access</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">Only authenticated users can continue to the full portfolio view.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-xl shadow-violet-500/10 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Animated</p>
            <h2 className="mt-3 text-xl font-semibold text-white">Eye-catching design</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">Subtle motion and layered gradients make the landing page feel modern and dynamic.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-xl shadow-slate-500/10 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Ready</p>
            <h2 className="mt-3 text-xl font-semibold text-white">Lets get started</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">Click login to open the modal and continue into the portfolio experience.</p>
          </div>
        </div>
      </div>

      {showModal && (
        <Login setShowModal={setShowModal} setShowSignupModal={setShowSignupModal} />
      )}
      {showSignupModal && (
        <Signup setShowSignupModal={setShowSignupModal} setShowModal={setShowModal}/>
      )}
    </div>
  );
};

export default LandingPage;
