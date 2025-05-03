import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEnvelope, FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaDev, FaMedium, FaCopy, FaExternalLinkAlt } from "react-icons/fa";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { gradientText, glassEffect, gradientBg, copyToClipboard } from "@/lib/utils";

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(1, "Please fill out this field."),
  email: z.string().min(1, "Please fill out this field.").email("Please enter a valid email address"),
  subject: z.string().optional(),
  message: z.string().min(1, "Please fill out this field.").min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

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

  // Form handling
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Direct email handler with mailto
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Construct a mailto URL with form data
  const createMailtoLink = (data: ContactFormValues): string => {
    const subject = encodeURIComponent(data.subject || `Portfolio Contact: ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
    );
    return `mailto:shivam.dwivedi@example.com?subject=${subject}&body=${body}`;
  };

  // Handle form submission
  const onSubmit = (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Create and open mailto link
    const mailtoLink = createMailtoLink(data);
    window.location.href = mailtoLink;
    
    // Display success message and reset form
    toast({
      title: "Email client opened!",
      description: "Your message has been prepared. Please send the email from your email client.",
    });
    
    setTimeout(() => {
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  };

  // Handle copy to clipboard
  const handleCopy = async (text: string) => {
    const success = await copyToClipboard(text);
    
    if (success) {
      toast({
        title: "Copied to clipboard",
        description: "Text has been copied to your clipboard",
      });
    } else {
      toast({
        title: "Failed to copy",
        description: "Could not copy text to clipboard",
        variant: "destructive",
      });
    }
  };

  // Contact information
  const contactInfo = [
    {
      type: "Email",
      value: "shivam.dwivedi@example.com",
      icon: <FaEnvelope />,
      gradient: "primary",
      action: {
        label: "Copy",
        icon: <FaCopy />,
        onClick: () => handleCopy("shivam.dwivedi@example.com"),
      },
    },
    {
      type: "LinkedIn",
      value: "linkedin.com/in/shivam-dwivedi",
      icon: <FaLinkedin />,
      gradient: "secondary",
      action: {
        label: "Visit",
        icon: <FaExternalLinkAlt />,
        href: "https://linkedin.com/in/shivam-dwivedi",
      },
    },
    {
      type: "GitHub",
      value: "github.com/shivam-dwivedi",
      icon: <FaGithub />,
      gradient: "accent",
      action: {
        label: "Visit",
        icon: <FaExternalLinkAlt />,
        href: "https://github.com/shivam-dwivedi",
      },
    },
  ];

  // Social media links
  const socialLinks = [
    { icon: <FaTwitter />, href: "#", gradient: "primary" },
    { icon: <FaInstagram />, href: "#", gradient: "secondary" },
    { icon: <FaDev />, href: "#", gradient: "accent" },
    { icon: <FaMedium />, href: "#", gradient: "primary" },
  ];

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
    <section ref={sectionRef} id="contact" className="py-20 relative bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Grid - Modern Minimalist Design */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto px-2 sm:px-4"
          initial="hidden"
          animate={controls}
          variants={sectionVariants}
        >
          {/* Left Side Content */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col justify-center"
          >
            <div className="mb-6">
              <motion.div 
                className="w-12 h-12 rounded-md bg-primary-start/10 dark:bg-primary-start/20 flex items-center justify-center mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <FaEnvelope className="text-primary-start" size={24} />
              </motion.div>
              
              <motion.h2 
                variants={itemVariants} 
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight"
              >
                If you like what you see, 
                <span className="hidden sm:inline"><br /></span>
                <span className="sm:hidden"> </span>
                let's work together.
              </motion.h2>
              
              <motion.p 
                variants={itemVariants} 
                className="text-base md:text-lg opacity-80 mb-6 max-w-md"
              >
                I bring rapid solutions to make the life of my clients easier. Have any questions? Reach out to me from this contact form and I will get back to you shortly.
              </motion.p>
            </div>
            

          </motion.div>
          
          {/* Contact Form - Clean Minimalist Design */}
          <motion.div variants={itemVariants}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Name *" 
                          {...field} 
                          className="h-14 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:border-primary-start focus:ring-1 focus:ring-primary-start"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Email *" 
                          type="email" 
                          {...field} 
                          className="h-14 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:border-primary-start focus:ring-1 focus:ring-primary-start"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea 
                          placeholder="Message *" 
                          rows={5} 
                          {...field}
                          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md resize-none focus:border-primary-start focus:ring-1 focus:ring-primary-start"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <motion.button
                  type="submit"
                  className="h-12 px-8 rounded-lg border-2 border-accent font-medium transition-all duration-300 bg-transparent hover:bg-accent hover:text-white inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Opening Email..." : "Send message"}
                  {!isSubmitting && (
                    <svg className="inline-block ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </motion.button>
              </form>
            </Form>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
