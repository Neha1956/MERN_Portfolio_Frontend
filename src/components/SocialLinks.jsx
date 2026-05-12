import { motion } from "framer-motion";
import { FaGithub, FaLinkedin,  FaEnvelope } from "react-icons/fa";

const SocialLinks = () => {
  const socialLinks = [
    {
      icon: FaGithub,
      label: "GitHub",
      url: "https://github.com/yourusername",
      color: "hover:text-gray-400",
      hoverBg: "hover:bg-gray-500/10",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      url: "https://linkedin.com/in/yourusername",
      color: "hover:text-blue-400",
      hoverBg: "hover:bg-blue-500/10",
    },
   
    {
      icon: FaEnvelope,
      label: "Email",
      url: "mailto:your.email@example.com",
      color: "hover:text-pink-400",
      hoverBg: "hover:bg-pink-500/10",
    },
  ];

  return (
    <div className="flex gap-6 justify-center items-center mt-12">
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
    </div>
  );
};

export default SocialLinks;
