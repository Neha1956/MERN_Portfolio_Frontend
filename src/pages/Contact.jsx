import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend, FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postMessage } from "../redux/messageSlice";
import { toast } from "react-toastify";
import axiosAPI from "../api/axiosAPI";
import { useEffect } from "react";

const Contact = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.message);
const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
//console.log("Profile data in Contact page:", profile);

  const fetchProfile = async () => {
      try {
        const res = await axiosAPI.get("/profile/get");
        setProfile(res.data.profile.socialLinks || null);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoadingProfile(false);
      }
    };

     useEffect(() => {

    fetchProfile();
    const interval = setInterval(fetchProfile, 50000); // Refresh every 50 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const contactInfo = [
    {
      icon: FiMail,
      label: "Email",
      value: "nehagarhw5@gmail.com",
      href: "mailto:nehagarhw5@gmail.com",
      color: "text-cyan-400",
    },
   
    {
      icon: FiMapPin,
      label: "Location",
      value: "Garhwa, India",
      href: "#",
      color: "text-pink-400",
    },
  ];

  const socialLinks = [
    {
      icon: FiGithub,
      label: "GitHub",
      url: profile?.github || "#",
      color: "hover:text-gray-400",
    },
    {
      icon: FiLinkedin,
      label: "LinkedIn",
      url: profile?.linkedin || "#",
      color: "hover:text-blue-400",
    }
    
   
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("All fields are required");
      return;
    }

    try {
      const result = await dispatch(postMessage(formData));
      
      if (result.type === postMessage.fulfilled.type) {
        toast.success("Message sent successfully! 🎉");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        toast.error(result.payload || "Failed to send message");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

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
            className="space-y-16"
          >
            {/* Header */}
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent mb-6">
                Get In Touch
              </h1>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
                Feel free to reach out!
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold text-cyan-400 mb-6">Let's Connect</h2>
                  <p className="text-slate-300 mb-8">
                    I'm currently available for freelance work and full-time opportunities.
                    Whether you have a project in mind or just want to chat about technology,
                    I'd love to hear from you.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-6">
                  {contactInfo.map((contact, index) => {
                    const Icon = contact.icon;
                    return (
                      <motion.a
                        key={index}
                        href={contact.href}
                        whileHover={{ x: 10 }}
                        className="flex items-center gap-4 p-6 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                      >
                        <div className={`p-3 rounded-full bg-white/10 ${contact.color} group-hover:scale-110 transition-transform`}>
                          <Icon size={24} />
                        </div>
                        <div>
                          <p className="text-sm text-slate-400 uppercase tracking-wide">{contact.label}</p>
                          <p className="text-slate-300 font-medium">{contact.value}</p>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>

                {/* Social Links */}
                <div className="pt-8">
                  <h3 className="text-xl font-bold text-violet-400 mb-4">Follow Me</h3>
                  <div className="flex gap-6">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <motion.a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          className={`p-4 rounded-full border border-white/20 bg-white/5 text-white/70 transition-all duration-300 ${social.color} hover:bg-white/10`}
                          aria-label={social.label}
                        >
                          <Icon size={24} />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-bold text-violet-400 mb-6">Send a Message</h2>
                  <p className="text-slate-300 mb-8">
                    Fill out the form below and I'll get back to you as soon as possible.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                      />
                    </motion.div>

                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                        className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Your Message"
                      required
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all duration-300 resize-none"
                    />
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 font-bold rounded-xl transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <FiSend className="group-hover:translate-x-1 transition-transform" size={20} />
                    {loading ? "Sending..." : "Send Message"}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
