import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axiosAPI from "../api/axiosAPI";

const Projects = () => {

  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL;
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await axiosAPI.get("/projects/get");
      //console.log("Projects Data:", res.data.projects);
      setProjects(res.data.projects || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
    const interval = setInterval(fetchProjects, 50000); // Refresh every 30 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -left-1/2 -top-1/2 w-full h-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, delay: 1 }}
          className="absolute -right-1/2 top-1/2 w-full h-full bg-gradient-to-l from-pink-500/20 to-cyan-500/20 rounded-full blur-3xl"
        />
      </div>

      <Navbar />

      <section className="pt-20 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-16"
          >
            {/* Header */}
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent mb-6">
                My Projects
              </h1>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Here are some of my recent projects showcasing my development
                skills and learning journey.
              </p>
            </div>

            {/* All Projects */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-cyan-400 text-center">
                All Projects
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -10 }}
                    className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="overflow-hidden h-48 relative">
                      <img
                       src={
  project.image
    ? `${IMAGE_BASE_URL}${project.image.replace(/\\/g, "/")}`
    : "https://via.placeholder.com/400x250?text=No+Image"
}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60" />
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-white">
                        {project.title}
                      </h3>

                      <p className="text-sm text-slate-300">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                      
{project.techStack
  ?.flatMap((item) => item.split(","))
  .map((tech, i) => (
    <div
      key={i}
      className="text-xs px-3 py-1 bg-cyan-400/10 text-cyan-300 rounded-full border border-cyan-400/30"
    >
      {tech.trim()}
    </div>
))}
                      </div>

                      {/* Links */}
                      <div className="flex gap-3 pt-4">
                        {project.githubLink && (
                          <motion.a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            className="p-2 rounded-lg bg-white/10 text-slate-300 hover:text-cyan-400 transition-colors"
                          >
                            <FiGithub size={20} />
                          </motion.a>
                        )}

                        {project.liveLink && (
                          <motion.a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            className="p-2 rounded-lg bg-cyan-400/20 text-cyan-400 hover:bg-cyan-400/30 transition-colors flex-1 flex items-center justify-center gap-2"
                          >
                            Live Demo <FiExternalLink size={16} />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {projects.length === 0 && (
                <p className="text-center text-slate-400 mt-10">
                  No projects found.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
