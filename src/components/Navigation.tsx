
import { useState } from "react";
import { Link } from "react-router-dom";
import { ImageIcon, Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">CRG Toastmasters Club</Link>
        <div className={`md:flex items-center space-x-8 ${isMenuOpen ? 'flex flex-col absolute top-full left-0 w-full bg-white shadow-md p-4 space-y-4 md:space-y-0 md:static md:flex-row md:shadow-none' : 'hidden'}`}>
          <Link to="/" className="text-gray-700 hover:text-primary transition-colors">Home</Link>
          <a href="#benefits" className="text-gray-700 hover:text-primary transition-colors">Benefits</a>
          <a href="#team" className="text-gray-700 hover:text-primary transition-colors">Our Team</a>
          <Link to="/gallery" className="text-gray-700 hover:text-primary transition-colors flex items-center group">
            <ImageIcon className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" />
            <span className="group-hover:translate-x-1 transition-transform">Gallery</span>
          </Link>
          <a href="#meetings" className="text-gray-700 hover:text-primary transition-colors">Meetings</a>
        </div>
        <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} className="text-primary" /> : <Menu size={24} className="text-primary" />}
        </div>
      </div>
    </nav>
  );
}
