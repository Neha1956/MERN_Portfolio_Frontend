import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiEdit,
  
  FiUser,
  FiLinkedin,
  FiArrowLeft,
  FiPlus,
} from "react-icons/fi";

import { useSelector, useDispatch } from "react-redux";
import axiosAPI from "../../api/axiosAPI";
import { setProfile,} from "../../redux/profileSlice";

const ProfileActions = () => {
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.profile?.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

  // GET PROFILE
  const getProfile = async () => {
    try {
      const res = await axiosAPI.get("/profile/get");
      dispatch(setProfile(res.data.profile));
    } catch (error) {
      console.log("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  
 

  // EDIT NAVIGATION
  const handleCreate = () => {
    navigate("/create-profile");
  };

  // EMPTY STATE
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <h1 className="text-xl text-red-400">No Profile Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl"
      >
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/admin")}
          className="mb-4 p-2 bg-cyan-500 rounded-full"
        >
          <FiArrowLeft size={20} />
        </button>

        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center text-center">
          {profile.profileImage && (
            <img
              src={`${IMAGE_URL}${profile.profileImage}`}
              alt="profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-cyan-400"
            />
          )}

          <h2 className="text-2xl font-bold mt-4 text-cyan-300">
            {profile.fullName}
          </h2>

          <p className="text-slate-400">{user?.email}</p>
        </div>

        {/* DETAILS */}
        <div className="mt-6 space-y-3">

          {/* TITLE */}
          <div className="bg-slate-900/50 p-4 rounded-xl">
            <p className="text-sm text-slate-400">Title</p>
            <p className="text-white font-semibold">{profile.title}</p>
          </div>

          {/* ABOUT */}
          <div className="bg-slate-900/50 p-4 rounded-xl">
            <p className="text-sm text-slate-400">About</p>
            <p className="text-white">{profile.about}</p>
          </div>

          {/* SKILLS */}
          <div className="bg-slate-900/50 p-4 rounded-xl">
            <p className="text-sm text-slate-400 mb-2">Skills</p>
           <div className="flex flex-wrap gap-2">
  {(profile.skills
    ? JSON.parse(profile.skills.join(","))
    : []
  ).map((skill, idx) => (
    <span
      key={idx}
      className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm"
    >
      {skill}
    </span>
  ))}
</div>
          </div>

          {/* LINKEDIN */}
          <div className="bg-slate-900/50 p-4 rounded-xl">
            <p className="text-sm text-slate-400">LinkedIn</p>
            <a
              href={profile.socialLinks?.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-violet-400 flex items-center gap-2"
            >
              <FiLinkedin /> View Profile
            </a>
          </div>

          {/* RESUME */}
          <div className="bg-slate-900/50 p-4 rounded-xl">
            <p className="text-sm text-slate-400">Resume</p>

            {profile.resume ? (
              <a
                href={`${IMAGE_URL}${profile.resume}`}
                target="_blank"
                className="text-cyan-400 underline"
              >
                View / Download Resume
              </a>
            ) : (
              <p className="text-slate-500">No resume uploaded</p>
            )}
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-6 flex-col md:flex-row">

          <button
            onClick={handleCreate}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-violet-500 hover:bg-violet-600 transition font-semibold"
          >
            <FiPlus /> Create Profile
          </button>

          <button
            onClick={() => navigate("/edit-profile")}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition font-semibold"
          >
            <FiEdit /> Edit Profile
          </button>

         
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileActions;
