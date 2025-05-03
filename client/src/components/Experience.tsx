import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { gradientText } from "@/lib/utils";
import { glassEffect } from "@/lib/utils";

export default function Experience() {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLElement>(null);

  // Experience data
  const experiences = [
    {
      period: "2022 - Present",
      position: "Senior Data Analyst",
      company: "TechSolutions Inc.",
      description: "Lead data analyst responsible for analyzing large datasets, creating visualization dashboards, and providing actionable insights to drive business decisions.",
      detailedDescription: "• Led a team of 4 analysts in developing and maintaining data pipelines\n• Reduced data processing time by 40% through optimization\n• Implemented automated reporting systems saving 20 hours weekly\n• Collaborated with stakeholders to define KPIs and metrics",
      technologies: ["Python", "SQL", "Tableau", "Machine Learning"],
      current: true,
    },
    {
      period: "2020 - 2022",
      position: "Frontend Developer",
      company: "WebCraft Studios",
      description: "Developed responsive web applications and user interfaces for clients across various industries, focusing on performance optimization and user experience.",
      detailedDescription: "• Built and maintained 15+ client websites using modern frameworks\n• Improved site load times by 60% through optimization techniques\n• Mentored junior developers and conducted code reviews\n• Implemented CI/CD pipelines for automated deployments",
      technologies: ["React", "JavaScript", "HTML/CSS", "UI/UX"],
      current: false,
    },
    {
      period: "2019 - 2020",
      position: "Junior Software Developer",
      company: "InnovateX Labs",
      description: "Collaborated in an agile team to build and maintain web applications, implementing features and fixing bugs across the full stack.",
      detailedDescription: "• Developed and maintained RESTful APIs using Node.js\n• Fixed 100+ bugs and implemented 50+ new features\n• Participated in daily stand-ups and sprint planning\n• Contributed to documentation and testing procedures",
      technologies: ["JavaScript", "Node.js", "MongoDB", "Express"],
      current: false,
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
    <section 
      ref={sectionRef} 
      id="experience" 
      className="py-20 bg-gray-50 dark:bg-gray-900 relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate={controls}
          variants={sectionVariants}
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-2">
            Work <span className="text-accent">Experience</span>
          </motion.h2>
          <motion.div variants={itemVariants} className="w-20 h-1 bg-accent mx-auto rounded-full" />
          <motion.p variants={itemVariants} className="max-w-2xl mx-auto mt-4 text-foreground">
            My professional journey and work history
          </motion.p>
        </motion.div>
        
        {/* Experience Items */}
        <motion.div 
          className="max-w-4xl mx-auto space-y-8"
          initial="hidden"
          animate={controls}
          variants={sectionVariants}
        >
          {experiences.map((exp, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
            >
              <motion.div
                className={`${glassEffect()} p-6 rounded-xl transition-all duration-300 hover:shadow-lg`}
                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <span className="text-sm text-accent font-medium">{exp.period}</span>
                <h3 className="text-xl font-bold mb-1 text-foreground">{exp.position}</h3>
                <h4 className="text-md mb-4 text-foreground">{exp.company}</h4>
                <p className="text-sm mb-4 text-foreground">
                  {exp.description}
                </p>
                <div className="text-sm mb-4 whitespace-pre-line text-foreground">
                  {exp.detailedDescription}
                </div>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="px-2 py-1 bg-accent/10 rounded-full text-xs font-medium text-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
