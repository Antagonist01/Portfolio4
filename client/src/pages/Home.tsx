import { useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  // Refs for each section for smooth scrolling
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Object mapping section names to refs
  const sectionRefs = {
    home: homeRef,
    about: aboutRef,
    skills: skillsRef,
    projects: projectsRef,
    experience: experienceRef,
    contact: contactRef,
  };

  // Scroll to a section function
  const scrollToSection = (section: keyof typeof sectionRefs) => {
    const ref = sectionRefs[section];
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80, // Adjust for navbar height
        behavior: "smooth",
      });
    }
  };

  // Set active section based on scroll position
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Add offset for better UX

      // Determine which section is in view
      Object.entries(sectionRefs).forEach(([section, ref]) => {
        if (
          ref.current &&
          scrollPosition >= ref.current.offsetTop - 100 &&
          scrollPosition < ref.current.offsetTop + ref.current.offsetHeight - 100
        ) {
          setActiveSection(section);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300">
      <Navbar 
        activeSection={activeSection} 
        scrollToSection={scrollToSection} 
      />
      
      <div ref={homeRef}>
        <Hero scrollToSection={scrollToSection} />
      </div>
      
      <div ref={aboutRef}>
        <About />
      </div>
      
      <div ref={skillsRef}>
        <Skills />
      </div>
      
      <div ref={projectsRef}>
        <Projects />
      </div>
      
      <div ref={experienceRef}>
        <Experience />
      </div>
      
      <div ref={contactRef}>
        <Contact />
      </div>
      
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}

import { useState } from "react";
