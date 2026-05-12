import { useState } from "react";
import { motion } from "framer-motion";
import { FiEdit, FiTrash2, FiPlus, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
//import AddProjects from "./AddProjects";
import { useEffect} from "react";
import axiosAPI from "../../api/axiosAPI";
import { toast } from "react-toastify";

const ProjectAction = () => {
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);
   // console.log("Toggle State:", toggle); // Debugging log
const [projects, setProjects] = useState([]);

 const handleDelete = async (id) => {
  try {
    await axiosAPI.delete(`/projects/delete/${id}`);

    setProjects(projects.filter((project) => project._id !== id));
    confirm("Are you sure you want to delete this project?") &
      toast.success("Project deleted successfully");
  } catch (error) {
    console.log(error);
    toast.error("Delete failed");
  }
};


const fetchProjects = async () => {
  try {
    const res = await axiosAPI.get("/projects/get");
    setProjects(res.data.projects);
  } catch (error) {
    console.log(error);
    toast.error("Failed to fetch projects");
  }
};
useEffect(() => {
  fetchProjects();
}, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6">
         <div className="w-full max-w-1xl">
         <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/admin")}
          className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-4xl flex items-center justify-center  font-semibold"
        >
          <FiArrowLeft size={22}/> 
        </motion.button>
        </div>
      <h1 className="text-3xl font-bold text-cyan-400 mb-8">Project Management</h1>
     

       <div className="grid md:grid-cols-3 gap-6">
        {/* Create */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setToggle(true)}
          className="p-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-4xl flex items-center justify-center gap-3 font-semibold"
        >
          <FiPlus /> Create New Project
        </motion.button>
</div>

{toggle && navigate("/add-project")}

      {/* Project Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
       {projects.map((project) => (
  <motion.div
    key={project._id}
    whileHover={{ y: -6 }}
    className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-lg"
  >
    <img
      src={`http://localhost:5000/${project.image}`}
      alt={project.title}
      className="w-full h-44 object-cover rounded-xl mb-4"
    />

    <h2 className="text-xl font-bold text-cyan-300">
      {project.title}
    </h2>

    <p className="text-slate-400 text-sm mt-2">
      {project.description}
    </p>

    <div className="flex gap-3 mt-5">
      <button
  onClick={() => navigate(`/update-project/${project._id}`)}
  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-violet-500 hover:bg-violet-600 transition"
>
  <FiEdit /> Update
</button>

      <button
        onClick={() => handleDelete(project._id)}
        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
      >
        <FiTrash2 /> Delete
      </button>
     <p className="text-slate-400 text-sm mt-2">
  {project.date
    ? new Date(project.date).toLocaleString()
    : "No date"}
</p>
    </div>
  </motion.div>
))}
      </div>
    </div>
  );
};

export default ProjectAction;
