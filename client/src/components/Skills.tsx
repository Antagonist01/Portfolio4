import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { 
  FaCode, 
  FaLaptopCode, 
  FaChartBar, 
  FaRobot, 
  FaLeaf, 
  FaCertificate 
} from "react-icons/fa";
import { gradientText, glassEffect, gradientBg } from "@/lib/utils";

export default function Skills() {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLElement>(null);

  // Skill categories
  const skillCategories = [
    {
      title: "Programming & Database",
      icon: <FaCode />,
      gradient: "primary",
      skills: [
        { name: "Python", percentage: 90 },
        { name: "SQL", percentage: 85 },
        { name: "JavaScript", percentage: 80 },
        { name: "TypeScript", percentage: 75 },
      ],
    },
    {
      title: "Frontend Development",
      icon: <FaLaptopCode />,
      gradient: "secondary",
      skills: [
        { name: "React", percentage: 85 },
        { name: "HTML & CSS", percentage: 90 },
        { name: "Tailwind CSS", percentage: 85 },
        { name: "UI/UX Design", percentage: 75 },
      ],
    },
    {
      title: "Data Analysis",
      icon: <FaChartBar />,
      gradient: "accent",
      skills: [
        { name: "Pandas", percentage: 90 },
        { name: "Data Visualization", percentage: 85 },
        { name: "Statistical Analysis", percentage: 80 },
        { name: "Machine Learning", percentage: 75 },
      ],
    },
    {
      title: "AI Tools",
      icon: <FaRobot />,
      gradient: "secondary",
      skills: [
        { name: "TensorFlow", percentage: 80 },
        { name: "NLP", percentage: 75 },
        { name: "Computer Vision", percentage: 70 },
        { name: "Generative AI", percentage: 65 },
      ],
    },
    {
      title: "Sustainability",
      icon: <FaLeaf />,
      gradient: "primary",
      skills: [
        { name: "Carbon Footprint", percentage: 85 },
        { name: "Sustainable Design", percentage: 80 },
        { name: "Energy Efficiency", percentage: 75 },
        { name: "Circular Economy", percentage: 70 },
      ],
    },
    {
      title: "Certifications",
      icon: <FaCertificate />,
      gradient: "accent",
      certifications: [
        "Frontend Web Development (Meta)",
        "Machine Learning Specialist (Stanford)",
        "UI/UX Design Fundamentals (Google)",
        "Sustainability in Practice (MIT)",
      ],
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
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Determine background color based on gradient type
  const getGradientClass = (type: string) => {
    switch (type) {
      case "primary":
        return gradientBg("primary");
      case "secondary":
        return gradientBg("secondary");
      case "accent":
        return "bg-accent";
      default:
        return gradientBg("primary");
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="skills" 
      className="py-20 bg-gray-50 dark:bg-gray-900 relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
            Technical <span className="text-accent">Skills</span>
          </h1>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.6, 
                delay: 0.1 + (index * 0.1),
                ease: "easeOut" 
              }}
              className={`${glassEffect()} p-6 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:scale-102`}
              whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex items-center mb-6">
                <motion.div 
                  className={`w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mr-4 flex-shrink-0`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                >
                  <span className="text-accent text-xl">{category.icon}</span>
                </motion.div>
                <motion.h3 
                  className="text-2xl font-bold text-black dark:text-white truncate"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                >
                  {category.title}
                </motion.h3>
              </div>
              
              <div className="space-y-5">
                <div className="mb-8">
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0 }}
                    animate={controls}
                  >
                    <motion.div 
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "5rem" }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="w-20 h-1 bg-accent rounded-full mb-4" 
                    />
                  </motion.div>
                
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    {category.title === "Programming & Database" && "Proficient in multiple programming languages and database technologies, with a focus on building robust and scalable applications."}
                    {category.title === "Frontend Development" && "Experienced in creating modern, responsive web interfaces using the latest frontend technologies and best practices."}
                    {category.title === "Data Analysis" && "Skilled in analyzing complex datasets and creating meaningful insights using various data analysis tools and techniques."}
                    {category.title === "AI Tools" && "Experienced with various AI and machine learning tools, focusing on practical applications and solutions."}
                    {category.title === "Sustainability" && "Dedicated to implementing sustainable practices in software development and digital solutions."}
                  </p>
                </div>
                {category.skills ? (
                  // For skill categories with progress bars
                  category.skills.map((skill, skillIndex) => (
                    <motion.div 
                      key={skillIndex}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 0.2 + (skillIndex * 0.1),
                        ease: "easeOut"
                      }}
                    >
                      <div className="flex justify-between mb-1">
                        <span className="px-2 py-1 text-xs font-medium text-gray-900 dark:text-gray-100">
                          {skill.name}
                        </span>
                        <motion.span
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.6, delay: 1.2 + (skillIndex * 0.1) }}
                          className="text-gray-900 dark:text-gray-100 font-medium"
                        >
                          {skill.percentage}%
                        </motion.span>
                      </div>
                      <div className="relative w-full h-2 bg-opacity-20 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className={`absolute left-0 top-0 h-full rounded-full bg-accent`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 1.2, 
                            delay: 0.3 + (skillIndex * 0.1),
                            ease: "easeOut"
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-white/20"
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  // For certification list
                  <ul className="space-y-4">
                    {category.certifications?.map((cert, certIndex) => (
                      <motion.li 
                        key={certIndex} 
                        className="flex items-center text-gray-800 dark:text-gray-100"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.3, 
                          delay: 0.2 + (certIndex * 0.1),
                          ease: "easeOut"
                        }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.3,
                            delay: 0.3 + (certIndex * 0.1)
                          }}
                        >
                          <svg className="w-4 h-4 text-accent mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </motion.div>
                        <span>{cert}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}