import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axiosAPI from "../../api/axiosAPI";
import { toast } from "react-toastify";
import { setProfile } from "../../redux/profileSlice";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);

  const [form, setForm] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosAPI.get("/profile/get");
        if (res.data.profile) {
          dispatch(setProfile(res.data.profile));
        }
      } catch (error) {
        console.log("Failed to load profile", error);
      }
    };

    if (!profile) {
      fetchProfile();
    }
  }, [dispatch, profile]);

  const values = {
    fullName: form?.fullName ?? profile?.fullName ?? "",
    title: form?.title ?? profile?.title ?? "",
    about: form?.about ?? profile?.about ?? "",
    skills:
      form?.skills ??
      (Array.isArray(profile?.skills) ? profile.skills.join(", ") : profile?.skills ?? ""),
    github: form?.github ?? profile?.socialLinks?.github ?? "",
    linkedin: form?.linkedin ?? profile?.socialLinks?.linkedin ?? "",
    email: form?.email ?? profile?.contact?.email ?? "",
    phone: form?.phone ?? profile?.contact?.phone ?? "",
  };

  const handleChange = (e) => {
    setForm({ ...values, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!profile?._id) {
      toast.error("Profile not found for update.");
      return;
    }

    const currentForm = form ?? values;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("fullName", currentForm.fullName);
      formData.append("title", currentForm.title);
      formData.append("about", currentForm.about);
      formData.append("skills", JSON.stringify(currentForm.skills.split(",").map((skill) => skill.trim())));
      formData.append(
        "socialLinks",
        JSON.stringify({ github: currentForm.github, linkedin: currentForm.linkedin })
      );
      formData.append(
        "contact",
        JSON.stringify({ email: currentForm.email, phone: currentForm.phone })
      );

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }
      if (resume) {
        formData.append("resume", resume);
      }

      const res = await axiosAPI.put(`/profile/update/${profile._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(setProfile(res.data.profile));
      toast.success("Profile updated successfully.");
      navigate("/profile-actions");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p className="text-lg text-slate-300">Loading profile for edit...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-2xl font-bold text-cyan-400 mb-6">Edit Profile</h1>

      <div className="space-y-3 max-w-2xl">
        <input
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-2 bg-slate-800 rounded"
        />

        <input
          name="title"
          value={values.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 bg-slate-800 rounded"
        />

        <textarea
          name="about"
          value={values.about}
          onChange={handleChange}
          placeholder="About"
          className="w-full p-2 bg-slate-800 rounded"
        />

        <input
          name="skills"
          value={values.skills}
          onChange={handleChange}
          placeholder="Skills (comma separated)"
          className="w-full p-2 bg-slate-800 rounded"
        />

        <input
          name="github"
          value={values.github}
          onChange={handleChange}
          placeholder="GitHub"
          className="w-full p-2 bg-slate-800 rounded"
        />

        <input
          name="linkedin"
          value={values.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn"
          className="w-full p-2 bg-slate-800 rounded"
        />

        <input
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 bg-slate-800 rounded"
        />

        <input
          name="phone"
          value={values.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full p-2 bg-slate-800 rounded"
        />

        <label className="block text-slate-400">Profile Image</label>
        <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} />

        <label className="block text-slate-400">Resume</label>
        <input type="file" onChange={(e) => setResume(e.target.files[0])} />

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 bg-red-500 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="flex-1 bg-cyan-500 py-2 rounded disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
