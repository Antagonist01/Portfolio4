import { FaHeart } from "react-icons/fa";

interface FooterProps {
  scrollToSection: (section: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {

  // Current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Copyright & Credits */}
        <div className="text-center">
          <p className="text-sm opacity-70">
            &copy; {currentYear} Shivam Dwivedi. All rights reserved.
          </p>
          <p className="text-xs opacity-50 mt-2 flex items-center justify-center">
            <FaHeart className="text-secondary-end mx-1" /> Made with passion
          </p>
        </div>
      </div>
    </footer>
  );
}
