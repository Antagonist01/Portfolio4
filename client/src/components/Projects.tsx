import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { gradientText, glassEffect } from "@/lib/utils";

export default function Projects() {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLElement>(null);

  // Projects data
  const projects = [
    {
      title: "Carbon Footprint Calculator",
      description: "An interactive tool that helps users track and reduce their carbon emissions through personalized recommendations.",
      detailedDescription: "Built with React and Node.js, this application features real-time carbon footprint tracking, interactive data visualization, and AI-powered recommendations for reducing environmental impact.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80",
      technologies: ["React", "Node.js", "Chart.js"],
      demoLink: "#",
      githubLink: "#",
      gradient: "primary",
    },
    {
      title: "SEO Tag Inspector",
      description: "A web application that analyzes websites for SEO optimization and provides recommendations for improvement.",
      detailedDescription: "Leveraging modern web technologies, this tool performs comprehensive SEO analysis, generates detailed reports, and offers actionable insights for improving website visibility.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      technologies: ["JavaScript", "Express", "Puppeteer"],
      demoLink: "#",
      githubLink: "#",
      gradient: "secondary",
    },
    {
      title: "Interactive To-Do List",
      description: "A modern, drag-and-drop task management application with categorization and priority management.",
      detailedDescription: "This feature-rich task management app includes real-time updates, drag-and-drop functionality, task categorization, and priority-based organization using React and TypeScript.",
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      technologies: ["React", "TypeScript", "Firebase"],
      demoLink: "#",
      githubLink: "#",
      gradient: "primary",
    },
    {
      title: "Modern Chair Product Page",
      description: "An e-commerce product page with 3D visualization, color customization, and interactive features.",
      detailedDescription: "Featuring advanced 3D rendering capabilities, this e-commerce product page allows users to customize chair colors, view from multiple angles, and experience immersive product visualization.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      technologies: ["Three.js", "GSAP", "Vue.js"],
      demoLink: "#",
      githubLink: "#",
      gradient: "secondary",
    },
  ];

  // Animate when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls]);

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section ref={sectionRef} id="projects" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate={controls}
          variants={sectionVariants}
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-2">
            Featured <span className="text-accent">Projects</span>
          </motion.h2>
          <motion.div variants={itemVariants} className="w-20 h-1 bg-accent mx-auto rounded-full" />
          <motion.p variants={itemVariants} className="max-w-2xl mx-auto mt-4 opacity-80">
            Here are some of my recent projects showcasing my technical skills and problem-solving abilities
          </motion.p>
        </motion.div>
        
        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={controls}
          variants={sectionVariants}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`${glassEffect()} rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:scale-102`}
              whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="relative overflow-hidden h-48">
                <motion.img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {project.detailedDescription}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="px-3 py-1.5 bg-accent/10 rounded-full text-sm font-semibold text-gray-900 dark:text-gray-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  <a href={project.demoLink} className="text-sm font-medium text-accent hover:underline">
                    <FaExternalLinkAlt className="inline mr-1" /> Live Demo
                  </a>
                  <a href={project.githubLink} className="text-sm font-medium text-accent hover:underline">
                    <FaGithub className="inline mr-1" /> GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* View All Projects Button */}
        <motion.div 
          className="text-center mt-12"
          variants={itemVariants}
        >
          <motion.a
            href="#"
            className="px-6 py-3 rounded-lg border-2 border-accent font-medium hover:bg-accent hover:text-white transition-all duration-300 inline-block"
            whileHover={{ scale: 1.05 }}
          >
            View All Projects <svg className="inline-block ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
