import { useState } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiX,FiRefreshCw } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/home" },
    { name: "About", href: "/about" },
    { name: "Skills", href: "/skills" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/90 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent"
          >
            Portfolio
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={link.href}
                  className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
             <motion.button
  onClick={() => window.location.reload()}
  whileHover={{ scale: 1.05, rotate: 5 }}
  whileTap={{ scale: 0.95 }}
  className="flex items-center gap-2 px-4 py-2 rounded-lg
  bg-cyan-500/10 border border-cyan-400/30 text-cyan-300
  hover:bg-cyan-500/20 hover:text-white transition-all duration-300"
>
  <FiRefreshCw size={18} />
  Refresh
</motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-slate-300 hover:text-cyan-400 transition-colors"
            onClick={toggleMenu}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2 flex flex-col">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ x: 10 }}
              >
                <Link
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium py-2 block"
                >
                  {link.name}
                </Link>
               
              </motion.div>
            ))}
          </div>
           <motion.button
  onClick={() => window.location.reload()}
  whileHover={{ scale: 1.05, rotate: 5 }}
  whileTap={{ scale: 0.95 }}
  className="flex items-center gap-2 px-4 py-2 rounded-lg
  bg-cyan-500/10 border border-cyan-400/30 text-cyan-300
  hover:bg-cyan-500/20 hover:text-white transition-all duration-300"
>
  <FiRefreshCw size={18} />
  Refresh
</motion.button>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
