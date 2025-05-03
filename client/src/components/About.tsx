import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { FaCode, FaClock, FaLaptopCode } from "react-icons/fa";
import { gradientText, glassEffect, gradientBg } from "@/lib/utils";

export default function About() {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLElement>(null);

  // Stats to display
  const stats = [
    {
      id: "projects-count",
      value: "25+",
      label: "Projects Completed",
      icon: <FaCode />,
      gradientType: "primary",
    },
    {
      id: "experience-count",
      value: "3+",
      label: "Years Experience",
      icon: <FaClock />,
      gradientType: "secondary",
    },
    {
      id: "tech-count",
      value: "15+",
      label: "Technologies",
      icon: <FaLaptopCode />,
      gradientType: "primary",
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
    <section ref={sectionRef} id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate={controls}
          variants={sectionVariants}
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-2">
            About <span className="text-accent">Me</span>
          </motion.h2>
          <motion.div variants={itemVariants} className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <motion.div 
            className="flex justify-center"
            initial="hidden"
            animate={controls}
            variants={sectionVariants}
          >
            <motion.div 
              variants={itemVariants}
              className="relative w-64 h-64 md:w-80 md:h-80 transform transition-all duration-300 hover:scale-105 group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-start to-primary-end rounded-2xl opacity-20 blur-lg group-hover:opacity-30 transition-opacity" />
              <img 
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                alt="Shivam Dwivedi" 
                className="rounded-2xl w-full h-full object-cover border-2 border-white dark:border-gray-800 shadow-xl"
              />
            </motion.div>
          </motion.div>
          
          {/* About Content */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={sectionVariants}
          >
            <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-4">
              Who Am I?
            </motion.h3>
            <motion.p variants={itemVariants} className="mb-6 opacity-90">
              I'm a passionate programmer and data analyst with expertise in creating sustainable digital solutions. I combine analytical thinking with creative problem-solving to build applications that matter.
            </motion.p>
            <motion.p variants={itemVariants} className="mb-8 opacity-90">
              With a background in both development and data science, I bring a unique perspective to projects that require technical expertise and data-driven insights.
            </motion.p>
            
            {/* Stats Cards */}
            <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-6">
              Skills & Expertise
            </motion.h3>
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.id}
                  className={`${glassEffect()} p-4 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:scale-105`}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                        <span className="text-white text-xl">{stat.icon}</span>
                      </div>
                    </div>
                    <h4 className="text-3xl font-bold text-accent" id={stat.id}>
                      {stat.value}
                    </h4>
                    <p className="text-sm text-foreground">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
