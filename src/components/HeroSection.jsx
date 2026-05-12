import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiArrowRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import TypingAnimation from "../components/TypingAnimation";
import axiosAPI from "../api/axiosAPI";

const API_BASE_URL = "http://localhost:5000"; // Fallback URL

const HeroSection = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

 
    const fetchProfile = async () => {
      try {
        const res = await axiosAPI.get("/profile/get");
        setProfile(res.data.profile || null);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

     useEffect(() => {

    fetchProfile();
    const interval = setInterval(fetchProfile, 50000); // Refresh every 50 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const displayProfile = profile || {
    fullName: "Your Name",
    title: "Full Stack Developer",
    about:
      "I'm a passionate Full Stack Developer specializing in modern web technologies. I love creating beautiful, responsive web applications that solve real-world problems.",
    socialLinks: {
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername",
    },
    contact: {
      email: "your.email@example.com",
    },
    profileImage: null,
  };

   

  const profileImage = displayProfile.profileImage
  ? `${API_BASE_URL}/${displayProfile.profileImage.replace(/\\/g, "/")}`
  : "";

   // console.log("Profile Image URL:", profileImage);

  const resumeDownload = () => {
    const resumeUrl = displayProfile.resume
      ? `${API_BASE_URL}/${displayProfile.resume}`
      : "/resume.pdf";

    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "My_Resume.pdf";
    link.click();
  };

  const socialLinks = [
    {
      icon: FiGithub,
      label: "GitHub",
      url: displayProfile.socialLinks?.github || "https://github.com/yourusername",
      color: "hover:text-gray-400",
      hoverBg: "hover:bg-gray-500/10",
    },
    {
      icon: FiLinkedin,
      label: "LinkedIn",
      url: displayProfile.socialLinks?.linkedin || "https://linkedin.com/in/yourusername",
      color: "hover:text-blue-400",
      hoverBg: "hover:bg-blue-500/10",
    },
    {
      icon: FiMail,
      label: "Email",
      url: `mailto:${displayProfile.contact?.email || "your.email@example.com"}`,
      color: "hover:text-pink-400",
      hoverBg: "hover:bg-pink-500/10",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl mx-auto"
      >
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Welcome Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <p className="text-sm md:text-base uppercase tracking-[0.35em] text-cyan-400 font-semibold">
                Welcome to my portfolio
              </p>
            </motion.div>

            {/* Typing Animation */}
            <motion.div variants={itemVariants}>
              <TypingAnimation text={`Hi, I'm ${displayProfile.fullName}`} speed={80} />
            </motion.div>

            {/* Title */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-cyan-300 font-semibold"
            >
              {displayProfile.title}
            </motion.p>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-slate-300 leading-relaxed"
            >
              {displayProfile.about}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.button
                onClick={resumeDownload}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 font-bold rounded-xl transition-all duration-300 hover:shadow-xl group"
              >
                <FiDownload className="group-hover:translate-y-1 transition-transform" size={20} />
                Download Resume
              </motion.button>

              <Link to="/projects">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(96, 165, 250, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-bold rounded-xl transition-all duration-300 hover:bg-cyan-400/10 group"
                >
                  View Projects
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </motion.button>
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-6 justify-center items-center mt-12">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    whileHover={{
                      scale: 1.3,
                      rotate: 10,
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-full border border-white/20 bg-white/5 text-white/70 transition-all duration-300 ${social.color} ${social.hoverBg}`}
                    aria-label={social.label}
                  >
                    <Icon size={24} />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Side - Profile Image */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center"
          >
            <motion.div
              animate={{
                y: [0, 20, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {/* Glowing background circles */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-3xl blur-3xl opacity-30" />

              {/* Profile Image Container */}
              <div className="relative bg-gradient-to-br from-cyan-400 to-violet-500 p-1 rounded-3xl overflow-hidden">
                <div className="bg-slate-900 rounded-3xl p-8 relative z-10">
                  
                      <motion.img
                    src={profileImage}
                    alt="Profile"
                    className="w-64 h-64 rounded-2xl object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 bg-clip-border"
                style={{ borderRadius: "24px" }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 md:gap-8 mt-16 pt-16 border-t border-white/10"
        >
          {[
            { number: "30+", label: "Projects" },
            { number: "100+", label: "Happy Clients" },
            { number: "student", label: "fresher" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="text-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
            >
              <p className="text-2xl md:text-4xl font-bold text-cyan-400">{stat.number}</p>
              <p className="text-xs md:text-sm text-slate-400 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
