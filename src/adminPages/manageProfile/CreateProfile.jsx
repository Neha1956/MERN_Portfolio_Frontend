import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosAPI from "../../api/axiosAPI";
import { toast } from "react-toastify";

const CreateProfile = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    title: "",
    about: "",
    skills: "",
    github: "",
    linkedin: "",
    email: "",
    phone: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [resume, setResume] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      const formData = new FormData();

      formData.append("fullName", form.fullName);
      formData.append("title", form.title);
      formData.append("about", form.about);

      // ✅ FIX: convert string → array
      formData.append(
        "skills",
        JSON.stringify(form.skills.split(",").map(s => s.trim()))
      );

      formData.append(
        "socialLinks",
        JSON.stringify({
          github: form.github,
          linkedin: form.linkedin,
        })
      );

      formData.append(
        "contact",
        JSON.stringify({
          email: form.email,
          phone: form.phone,
        })
      );

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      if (resume) {
        formData.append("resume", resume);
      }

      const res = await axiosAPI.post("/profile/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile created successfully!");
      navigate("/admin");

    } catch (err) {
      console.log(err);
      toast.error("Failed to create profile");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-2xl font-bold text-cyan-400 mb-6">
        Create Profile
      </h1>

      <div className="space-y-3 max-w-2xl">

        <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" className="w-full p-2 bg-slate-800 rounded" />

        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 bg-slate-800 rounded" />

        <textarea name="about" value={form.about} onChange={handleChange} placeholder="About" className="w-full p-2 bg-slate-800 rounded" />

        <input name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma separated)" className="w-full p-2 bg-slate-800 rounded" />

        <input name="github" value={form.github} onChange={handleChange} placeholder="GitHub" className="w-full p-2 bg-slate-800 rounded" />

        <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="LinkedIn" className="w-full p-2 bg-slate-800 rounded" />

        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-2 bg-slate-800 rounded" />

        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full p-2 bg-slate-800 rounded" />

        {/* IMAGE */}
        <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} />

        {/* RESUME */}
        <input type="file" onChange={(e) => setResume(e.target.files[0])} />

        <div className="flex gap-3 mt-4">
          <button onClick={() => navigate(-1)} className="flex-1 bg-red-500 py-2 rounded">
            Cancel
          </button>

          <button onClick={handleCreate} className="flex-1 bg-cyan-500 py-2 rounded">
            Create Profile
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateProfile;
