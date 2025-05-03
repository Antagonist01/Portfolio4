import { motion } from "framer-motion";
import { FaDownload, FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import ParticleBackground from "@/components/backgrounds/ParticleBackground";
import { gradientText } from "@/lib/utils";

interface HeroProps {
  scrollToSection: (section: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16">
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center md:text-left">
            {/* Introduction */}
            <motion.p 
              className="text-xl mb-2 text-accent font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Hi, I'm
            </motion.p>
            
            {/* Name */}
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4 text-light-text dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Shivam Dwivedi
            </motion.h1>
            
            {/* Title */}
            <motion.h2 
              className="text-2xl md:text-3xl mb-6 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className={gradientText("secondary")}>Programmer & Data Analyst</span>
            </motion.h2>
            
            {/* Description */}
            <motion.p 
              className="text-base md:text-lg max-w-2xl mx-auto md:mx-0 mb-8 opacity-90 px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Passionate about creating sustainable digital solutions that combine cutting-edge technology with elegant design. Specializing in data analysis and programming.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button 
                className="px-6 py-6 rounded-lg bg-gradient-to-r from-primary-start to-primary-end text-white font-medium hover:shadow-lg transform transition hover:-translate-y-1"
              >
                <FaDownload className="mr-2" /> Download Resume
              </Button>
              
              <Button 
                variant="outline" 
                className="px-6 py-6 rounded-lg border-2 border-primary-start dark:border-primary-end font-medium hover:shadow-lg transform transition hover:-translate-y-1"
                onClick={() => scrollToSection("contact")}
              >
                <FaEnvelope className="mr-2" /> Contact Me
              </Button>
            </motion.div>
            
            {/* Social Links */}
            <motion.div 
              className="flex justify-center md:justify-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xl hover:text-accent transition duration-300 transform hover:-translate-y-1"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xl hover:text-accent transition duration-300 transform hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xl hover:text-accent transition duration-300 transform hover:-translate-y-1"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a 
                href="mailto:shivam.dwivedi@example.com" 
                className="text-xl hover:text-accent transition duration-300 transform hover:-translate-y-1"
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <motion.a 
            href="#about" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("about");
            }}
            className="text-light-text dark:text-dark-text opacity-80 hover:opacity-100 transition-opacity"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </motion.a>
        </motion.div>
        
        {/* Decorative Elements */}
        <motion.div 
          className="absolute top-1/4 right-10 w-20 h-20 bg-primary-start opacity-20 rounded-full blur-xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-10 w-32 h-32 bg-secondary-end opacity-20 rounded-full blur-xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-2/3 right-1/4 w-16 h-16 bg-accent opacity-20 rounded-full blur-xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
}
