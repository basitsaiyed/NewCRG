
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-amber-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">CRG Toastmasters</h3>
            <p className="text-amber-200 mb-4">"Where Leaders Are Made"</p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-amber-700 rounded-full hover:bg-amber-500 transition-colors">
                <i className="ri-facebook-fill"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-amber-700 rounded-full hover:bg-amber-500 transition-colors">
                <i className="ri-twitter-fill"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-amber-700 rounded-full hover:bg-amber-500 transition-colors">
                <i className="ri-linkedin-fill"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-amber-700 rounded-full hover:bg-amber-500 transition-colors">
                <i className="ri-instagram-line"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-amber-200 hover:text-white transition-colors">About Toastmasters</a></li>
              <li><Link to="/#benefits" className="text-amber-200 hover:text-white transition-colors">Membership Benefits</Link></li>
              <li><Link to="/#team" className="text-amber-200 hover:text-white transition-colors">Leadership Team</Link></li>
              <li><Link to="/#meetings" className="text-amber-200 hover:text-white transition-colors">Meeting Schedule</Link></li>
              <li><a href="#" className="text-amber-200 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <ul className="flex flex-col space-y-3">
              <li className="flex items-start">
                <div className="w-5 h-5 flex items-center justify-center mr-3 mt-1">
                  <i className="ri-map-pin-line text-amber-300"></i>
                </div>
                <span className="text-amber-200">Pramukh Anand Orbit Mall, Kudasan, Gandhinagar</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 flex items-center justify-center mr-3 mt-1">
                  <i className="ri-mail-line text-amber-300"></i>
                </div>
                <span className="text-amber-200">crgtoastmasters@gmail.com</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 flex items-center justify-center mr-3 mt-1">
                  <i className="ri-phone-line text-amber-300"></i>
                </div>
                <span className="text-amber-200">+91 884 936 0867</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 flex items-center justify-center mr-3 mt-1">
                  <i className="ri-time-line text-amber-300"></i>
                </div>
                <span className="text-amber-200">Every Sunday at 11:00 AM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-700 pt-8 text-center">
          <p className="text-amber-200">&copy; 2025 CRG Toastmasters Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
