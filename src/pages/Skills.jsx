import { motion } from "framer-motion";
import { FaReact, FaNode, FaGitAlt, FaDocker } from "react-icons/fa";
import { SiTypescript, SiMongodb, SiTailwindcss, SiJavascript, SiExpress, SiFirebase } from "react-icons/si";
//import { useSelector } from "react-redux";
import axiosAPI from "../api/axiosAPI";
import { useEffect,useState } from "react";
//import { setProfile } from "../redux/profileSlice";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";

const Skills = () => {
  //const profile = useSelector((state) => state.profile?.profile);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);

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
    const interval = setInterval(getProfile, 50000); // Refresh every 50 seconds
    return () => clearInterval(interval); // Cleanup on unmount
    getProfile();
  }, []);


 // const IMAGE_URL = "http://localhost:5000/";
  //const skillsData = profile?.skills;
 // console.log("Skills from profile:", skillsData);
  const skills = [
    { name: "React", icon: FaReact, color: "text-cyan-400",  },
    { name: "Node.js", icon: FaNode, color: "text-green-400", },
    { name: "MongoDB", icon: SiMongodb, color: "text-green-500", },
   // { name: "TypeScript", icon: SiTypescript, color: "text-blue-400", level: "Intermediate" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-300", },
    { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400", },
    { name: "Express.js", icon: SiExpress, color: "text-gray-400", },
    { name: "Git", icon: FaGitAlt, color: "text-orange-500", },
    { name: "Docker", icon: FaDocker, color: "text-blue-500", },
   // { name: "Firebase", icon: SiFirebase, color: "text-yellow-500", level: "Intermediate" },
  ];

 
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Animated background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -left-1/2 -top-1/2 w-full h-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, -50, 0],
          }}
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
            className="space-y-12"
          >
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent mb-6">
                Skills & Technologies
              </h1>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                I work with modern technologies and tools to create exceptional web experiences.
                Here are the technologies I'm proficient in:
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -10, scale: 1.05 }}
                    className="p-6 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center justify-center gap-4 cursor-pointer group"
                  >
                    <Icon className={`text-5xl ${skill.color} group-hover:scale-125 transition-transform`} />
                    <div className="text-center">
                      <span className="text-sm font-semibold text-slate-300 block">{skill.name}</span>
                      <div className="flex items-center gap-2 mt-2">
                       
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
         <div className="mt-6">
  <h3 className="text-lg font-semibold text-white mb-4">
  Key  Skills 
  </h3>

  <div className="flex flex-wrap gap-3">
    {(() => {
      try {
        let skills = profile.skills?.join(",");

        while (typeof skills === "string") {
          skills = JSON.parse(skills);
        }

        return skills.map((skill, idx) => (
          <span
            key={idx}
            className="px-4 py-2 rounded-full text-sm font-medium
            bg-gradient-to-r from-cyan-500/20 to-blue-500/20
            text-cyan-300 border border-cyan-400/30
            shadow-md shadow-cyan-500/10
            hover:scale-105 hover:border-cyan-300 hover:text-white
            transition-all duration-300 cursor-pointer"
          >
            {skill}
          </span>
        ));
      } catch (error) {
        console.log(error);
        return (
          <span className="text-slate-400 text-sm">
            Skills not available
          </span>
        );
      }
    })()}
  </div>
</div>            
              
            

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-center pt-12"
            >
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">Always Learning</h3>
              <p className="text-slate-300 max-w-3xl mx-auto">
                Technology evolves rapidly, and I'm committed to staying current with the latest trends and best practices.
                I'm always exploring new frameworks, tools, and methodologies to improve my craft and deliver better solutions.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Skills;
