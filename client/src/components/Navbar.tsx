import { useState, useEffect } from "react";
import { useTheme } from "@/context/theme-context";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FaBars, FaTimes, FaGithub, FaLinkedin } from "react-icons/fa";
import { cn, glassEffect } from "@/lib/utils";
import { motion } from "framer-motion";

interface NavbarProps {
  activeSection: string;
  scrollToSection: (section: string) => void;
}

export default function Navbar({ activeSection, scrollToSection }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, setTheme } = useTheme();

  // Navigation links
  const navLinks = [
    { name: "Home", section: "home" },
    { name: "About", section: "about" },
    { name: "Skills", section: "skills" },
    { name: "Projects", section: "projects" },
    { name: "Experience", section: "experience" },
    { name: "Contact", section: "contact" },
  ];

  // Handle scroll event to add shadow to navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle theme between dark and light
  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Click handler for navigation
  const handleNavClick = (section: string) => {
    scrollToSection(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        glassEffect(),
        isScrolled ? "shadow-md" : ""
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo/Brand */}
          <div className="mr-8">
            <motion.a 
              href="#"
              onClick={() => handleNavClick("home")}
              className="text-xl sm:text-2xl font-bold text-light-text dark:text-white whitespace-nowrap"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Shivam Dwivedi
            </motion.a>
          </div>
          
          {/* Desktop Navigation */}
          <motion.div 
            className="hidden md:flex items-center space-x-8 flex-grow justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {navLinks.map((link) => (
              <a
                key={link.section}
                href={`#${link.section}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.section);
                }}
                className={cn(
                  "text-sm font-medium hover:text-accent transition-colors duration-300 relative group",
                  activeSection === link.section ? "text-accent" : ""
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300",
                  activeSection === link.section ? "w-full" : "w-0 group-hover:w-full"
                )}></span>
              </a>
            ))}
          </motion.div>
          
          {/* Right side items: theme toggle, contact button */}
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Dark Mode Toggle */}
            <div className="flex items-center">
              <Switch
                checked={isDarkMode}
                onCheckedChange={toggleTheme}
                aria-label="Toggle theme"
              />
            </div>
            
            {/* Contact Button (desktop only) */}
            <Button
              variant="default"
              className="hidden md:inline-block bg-gradient-to-r from-primary-start to-primary-end hover:shadow-lg transition-all duration-300 text-white"
              onClick={() => handleNavClick("contact")}
            >
              Contact Me
            </Button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-light-text dark:text-dark-text" 
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </motion.div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <motion.div
          className={cn("md:hidden", isMobileMenuOpen ? "block" : "hidden")}
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.section}
                href={`#${link.section}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.section);
                }}
                className={cn(
                  "block px-3 py-2 text-base font-medium hover:text-accent transition-colors duration-300",
                  activeSection === link.section ? "text-accent" : ""
                )}
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </nav>
  );
}
