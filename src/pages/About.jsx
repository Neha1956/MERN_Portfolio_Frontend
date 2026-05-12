import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const About = () => {
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

      <section className="pt-20 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent mb-6">
                About Me
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
                I'm a passionate Full Stack Developer with a love for creating beautiful, functional web applications.
                With expertise in modern technologies, I bring ideas to life through clean code and innovative solutions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 pt-8">
              <motion.div
                whileHover={{ y: -5 }}
                className="p-8 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
              >
                <h3 className="text-3xl font-bold text-cyan-400 mb-4">My Journey</h3>
                <p className="text-slate-300 leading-relaxed">
                  I started my journey in web development with HTML and CSS, and have since mastered modern frameworks and libraries
                  to build impressive applications. My passion for technology drives me to continuously learn and adapt to new challenges.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="p-8 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
              >
                <h3 className="text-3xl font-bold text-violet-400 mb-4">My Mission</h3>
                <p className="text-slate-300 leading-relaxed">
                  My mission is to create beautiful, functional, and accessible web experiences that make a difference in people's lives.
                  I believe in writing clean, maintainable code and delivering exceptional user experiences.
                </p>
              </motion.div>
            </div>

            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-center"
            >
              <h3 className="text-3xl font-bold text-pink-400 mb-4">What I Do</h3>
              <p className="text-slate-300 leading-relaxed max-w-4xl mx-auto">
                I specialize in full-stack development using modern technologies like React, Node.js, and MongoDB.
                From responsive front-end designs to robust back-end APIs, I create end-to-end solutions that scale and perform.
                I'm passionate about clean code, user experience, and staying up-to-date with the latest industry trends.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
