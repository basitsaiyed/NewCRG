
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ImageIcon, Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Check if we're on the homepage
  const isHomePage = location.pathname === "/";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">CRG Toastmasters Club</Link>
        <div className={`md:flex items-center space-x-8 ${isMenuOpen ? 'flex flex-col absolute top-full left-0 w-full bg-white shadow-md p-4 space-y-4 md:space-y-0 md:static md:flex-row md:shadow-none' : 'hidden'}`}>
          <Link to="/" className="text-gray-700 hover:text-primary transition-colors">Home</Link>
          <Link to={isHomePage ? "#benefits" : "/#benefits"} className="text-gray-700 hover:text-primary transition-colors">Benefits</Link>
          <Link to={isHomePage ? "#team" : "/#team"} className="text-gray-700 hover:text-primary transition-colors">Our Team</Link>
          <Link to="/gallery" className="text-gray-700 hover:text-primary transition-colors flex items-center group">
            <ImageIcon className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" />
            <span className="group-hover:translate-x-1 transition-transform">Gallery</span>
          </Link>
          <Link to={isHomePage ? "#meetings" : "/#meetings"} className="text-gray-700 hover:text-primary transition-colors">Meetings</Link>
        </div>
        <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} className="text-primary" /> : <Menu size={24} className="text-primary" />}
        </div>
      </div>
    </nav>
  );
}
