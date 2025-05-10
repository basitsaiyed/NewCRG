import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { RiLinkedinBoxFill } from "react-icons/ri";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const Footer = () => {
  return (
    <footer className="py-12 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">CRG Toastmasters</h3>
            <p className="text-white mb-4">"Where Leaders Are Made"</p>
            <div className="flex gap-2">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-amber-100 rounded-full hover:bg-amber-500 transition-colors">
                <FaFacebookF className="w-5 h-5 text-black" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-amber-100 rounded-full hover:bg-amber-500 transition-colors">
                <FaXTwitter className="w-5 h-5 text-black" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-amber-100 rounded-full hover:bg-amber-500 transition-colors">
                <FaLinkedinIn className="w-5 h-5 text-black" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-amber-100 rounded-full hover:bg-amber-500 transition-colors">
                <FaInstagram className="w-5 h-5 text-black" />
              </a>
            </div>  
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white hover:text-white transition-colors">About Toastmasters</a></li>
              <li><Link to="/#benefits" className="text-white hover:text-white transition-colors">Membership Benefits</Link></li>
              <li><Link to="/#team" className="text-white hover:text-white transition-colors">Leadership Team</Link></li>
              <li><Link to="/#meetings" className="text-white hover:text-white transition-colors">Meeting Schedule</Link></li>
              <li><a href="#" className="text-white hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-5 h-5 flex items-center justify-center mr-2 mt-1">
                  <i className="ri-map-pin-line text-amber-300"></i>
                </div>
                <span className="text-white">Harmony Living Ed Value Chain Solutions Pvt Ltd., E-329, 3rd Floor, Pramukh Anand Orbit Mall, Kudasan, Gandhinagar</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 flex items-center justify-center mr-2 mt-1">
                  <i className="ri-mail-line text-amber-300"></i>
                </div>
                <span className="text-white">crgtoastmasters@gmail.com</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 flex items-center justify-center mr-2 mt-1">
                  <i className="ri-phone-line text-amber-300"></i>
                </div>
                <span className="text-white">+91 884 936 0867</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 flex items-center justify-center mr-2 mt-1">
                  <i className="ri-time-line text-amber-300"></i>
                </div>
                <span className="text-white">Every Sunday at 11:00 AM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-700 pt-8 text-center">
          <p className="text-white">&copy; 2025 CRG Toastmasters Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
