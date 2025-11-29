import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { RiLinkedinBoxFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="py-12 bg-primary text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">CRG Toastmasters</h3>
            <p className="text-white mb-4">"Where Leaders Are Made"</p>
            <div className="flex gap-2">
              <a 
                href="https://in.linkedin.com/in/crg-toastmasters-029b51382" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                <FaLinkedinIn className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://www.instagram.com/crg_toastmasters?igsh=MWliZjEzaGtsdWF5Mw==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                <FaInstagram className="w-5 h-5 text-white" />
              </a>
            </div>  
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white hover:text-accent transition-colors">About Toastmasters</a></li>
              <li><Link to="/#benefits" className="text-white hover:text-accent transition-colors">Membership Benefits</Link></li>
              <li><Link to="/#team" className="text-white hover:text-accent transition-colors">Leadership Team</Link></li>
              <li><Link to="/#meetings" className="text-white hover:text-accent transition-colors">Meeting Schedule</Link></li>
              <li><a href="#" className="text-white hover:text-accent transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-5 h-5 flex items-center justify-center mr-2 mt-1">
                  <i className="ri-map-pin-line text-accent"></i>
                </div>
                <a 
                  href="https://maps.app.goo.gl/ZStZ2c2FWUAhdy6bA" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:text-accent transition-colors underline"
                >
                  GIFT City Fire Station, Training Room, First Floor, GIFT City
                </a>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 flex items-center justify-center mr-2 mt-1">
                  <i className="ri-mail-line text-accent"></i>
                </div>
                <span className="text-white">crgtoastmasters@gmail.com</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 flex items-center justify-center mr-2 mt-1">
                  <i className="ri-phone-line text-accent"></i>
                </div>
                <a 
                  href="https://wa.me/918849360867" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:text-accent transition-colors underline"
                >
                  +91 884 936 0867
                </a>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 flex items-center justify-center mr-2 mt-1">
                  <i className="ri-time-line text-accent"></i>
                </div>
                <span className="text-white">Every Sunday at 10:30 AM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-white">&copy; 2025 CRG Toastmasters Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
