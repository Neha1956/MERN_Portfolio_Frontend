import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosAPI from "../../api/axiosAPI";
import { toast } from "react-toastify";

const UpdateProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: "",
    githubLink: "",
    liveLink: "",
  });

  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
  setImage(e.target.files[0]);
};

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const res = await axiosAPI.get("/projects/get");
      const project = res.data.projects.find((p) => p._id === id);

      if (project) {
        setForm({
          title: project.title || "",
          description: project.description || "",
          techStack: project.techStack?.join(",") || "",
          githubLink: project.githubLink || "",
          liveLink: project.liveLink || "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch project");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("techStack", form.techStack);
    formData.append("githubLink", form.githubLink);
    formData.append("liveLink", form.liveLink);

    if (image) {
      formData.append("image", image);
    }

    await axiosAPI.put(`/projects/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Project updated successfully");
    navigate("/project-actions");
  } catch (error) {
    console.log(error);
    toast.error("Update failed");
  }
};
  return (
    <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center p-4">
      <div className="w-full max-w-3xl bg-white/5 border border-white/10 rounded-3xl p-8">
        <h2 className="text-3xl font-bold text-cyan-400 mb-6">
          Update Project
        </h2>

        <form onSubmit={handleUpdate} className="space-y-5">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Project title"
            className="w-full p-3 rounded-xl bg-slate-900 border border-white/10"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            placeholder="Description"
            className="w-full p-3 rounded-xl bg-slate-900 border border-white/10"
          />

          <input
            type="text"
            name="techStack"
            value={form.techStack}
            onChange={handleChange}
            placeholder="React, Node, MongoDB"
            className="w-full p-3 rounded-xl bg-slate-900 border border-white/10"
          />

          <input
            type="url"
            name="githubLink"
            value={form.githubLink}
            onChange={handleChange}
            placeholder="Github link"
            className="w-full p-3 rounded-xl bg-slate-900 border border-white/10"
          />

          <input
            type="url"
            name="liveLink"
            value={form.liveLink}
            onChange={handleChange}
            placeholder="Live link"
            className="w-full p-3 rounded-xl bg-slate-900 border border-white/10"
          />

          <div className="border border-dashed border-white/20 rounded-xl p-6 text-center">
  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="hidden"
    id="update-image"
  />

  <label
    htmlFor="update-image"
    className="cursor-pointer flex flex-col items-center gap-2"
  >
    <span className="text-cyan-400">Upload New Image</span>
  </label>

  {image && (
    <p className="mt-3 text-sm text-slate-300">
      Selected: {image.name}
    </p>
  )}
</div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-xl font-semibold"
          >
            Update Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProject;
