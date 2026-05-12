


import Navbar from "../components/Navbar";

import HeroSection from "../components/HeroSection";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "../components/Footer";
import ScrollIndicater from "../components/ScrollIndicater";

const Home = () => {
 return (
    <>
      {/* Navbar */}
      <Navbar />

        {/* Hero Section */}
        <HeroSection/>

        <About/>

        <Skills/>
        <Projects/>
        <Contact/>
      {/* Footer */}
      <Footer/>

      {/* Scroll indicator */}
     <ScrollIndicater/>
    </>
  );
};

export default Home;
