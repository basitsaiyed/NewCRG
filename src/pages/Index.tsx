
import Navigation from "@/components/Navigation";
import { useEffect } from "react";

// Define a type for the TomTom SDK to fix the error
declare global {
  interface Window {
    tt: any;
  }
}

const Index = () => {
  useEffect(() => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });

    // Load TomTom map if available
    if (typeof window.tt !== 'undefined' && document.getElementById('map')) {
      try {
        const map = window.tt.map({
          key: 'supu8hAZdQgayQ7E3SfxLUK1M8ocVw7W',
          container: 'map',
          center: [72.63054749391392, 23.18436526489801],
          zoom: 15
        });

        // Create custom marker element
        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker';
        markerElement.innerHTML = `
          <svg width="40" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="#EA4335" d="M12 0C7.58 0 4 3.58 4 8c0 5.5 8 16 8 16s8-10.5 8-16c0-4.42-3.58-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
            <circle cx="12" cy="8" r="3" fill="white"/>
          </svg>
        `;

        // Add custom marker to map
        new window.tt.Marker({
          element: markerElement
        }).setLngLat([72.63054749391392, 23.18436526489801]).addTo(map);
      } catch (error) {
        console.error("Error initializing map:", error);
        if (document.getElementById('map')) {
          document.getElementById('map')!.innerHTML = '<div class="p-6 bg-gray-200 text-center rounded"><p>Map loading error. Please try again later.</p></div>';
        }
      }
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section id="home" className="hero-section min-h-screen flex items-center justify-center pt-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">CRG Toastmasters Club</h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
            Develop your speaking & leadership skills in a supportive and engaging environment
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#meetings" className="bg-primary text-white px-8 py-3 rounded-button hover:bg-opacity-90 transition-colors whitespace-nowrap text-lg font-medium inline-block">
              Join Us In the Next Meet
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Join CRG Toastmasters?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our club offers a supportive environment where you can develop essential skills for personal and professional growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="benefit-card bg-white p-8 rounded shadow-md transition-all duration-300">
              <div className="w-16 h-16 flex items-center justify-center bg-primary bg-opacity-10 rounded-full mb-6">
                <i className="ri-user-voice-line text-primary ri-2x"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Public Speaking Confidence</h3>
              <p className="text-gray-600">
                Overcome fear and anxiety about speaking in public through regular practice in a supportive environment.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="benefit-card bg-white p-8 rounded shadow-md transition-all duration-300">
              <div className="w-16 h-16 flex items-center justify-center bg-primary bg-opacity-10 rounded-full mb-6">
                <i className="ri-team-line text-primary ri-2x"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Leadership Skills</h3>
              <p className="text-gray-600">
                Develop essential leadership abilities by taking on various club roles and participating in team projects.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="benefit-card bg-white p-8 rounded shadow-md transition-all duration-300">
              <div className="w-16 h-16 flex items-center justify-center bg-primary bg-opacity-10 rounded-full mb-6">
                <i className="ri-rocket-line text-primary ri-2x"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Personal Growth</h3>
              <p className="text-gray-600">
                Challenge yourself to step outside your comfort zone and achieve personal development goals.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="benefit-card bg-white p-8 rounded shadow-md transition-all duration-300">
              <div className="w-16 h-16 flex items-center justify-center bg-primary bg-opacity-10 rounded-full mb-6">
                <i className="ri-links-line text-primary ri-2x"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Networking</h3>
              <p className="text-gray-600">
                Connect with like-minded professionals from diverse backgrounds and industries.
              </p>
            </div>

            {/* Benefit 5 */}
            <div className="benefit-card bg-white p-8 rounded shadow-md transition-all duration-300">
              <div className="w-16 h-16 flex items-center justify-center bg-primary bg-opacity-10 rounded-full mb-6">
                <i className="ri-briefcase-4-line text-primary ri-2x"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional Development</h3>
              <p className="text-gray-600">
                Enhance your resume with valuable communication and leadership skills sought by employers.
              </p>
            </div>

            {/* Benefit 6 */}
            <div className="benefit-card bg-white p-8 rounded shadow-md transition-all duration-300">
              <div className="w-16 h-16 flex items-center justify-center bg-primary bg-opacity-10 rounded-full mb-6">
                <i className="ri-feedback-line text-primary ri-2x"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Constructive Feedback</h3>
              <p className="text-gray-600">
                Receive personalized evaluation and guidance to improve your communication skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our dedicated team of leaders is committed to creating an exceptional experience for all members.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team members would go here - using placeholder for brevity */}
            <div className="text-center">
              <p className="text-gray-600">Leadership team information would appear here.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meeting Information Section */}
      <section id="meetings" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Meetings</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We meet weekly to practice, learn, and grow together. Visitors are always welcome!
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2 bg-white p-8 rounded shadow-md">
              <h3 className="text-2xl font-semibold mb-6">Meeting Details</h3>

              <div className="flex items-start mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-primary bg-opacity-10 rounded-full mr-4 flex-shrink-0">
                  <i className="ri-map-pin-line text-primary ri-lg"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Location</h4>
                  <p className="text-gray-600">
                    Harmony Living Ed Value Chain Solutions Pvt Ltd. E-329, 3rd Floor, 
                    Pramukh Anand Orbit Mall, Kudasan, Gandhinagar
                  </p>
                </div>
              </div>

              <div className="flex items-start mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-primary bg-opacity-10 rounded-full mr-4 flex-shrink-0">
                  <i className="ri-time-line text-primary ri-lg"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Schedule</h4>
                  <p className="text-gray-600">Every Sunday at 11:00 AM</p>
                </div>
              </div>

              <div className="flex items-start mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-primary bg-opacity-10 rounded-full mr-4 flex-shrink-0">
                  <i className="ri-calendar-line text-primary ri-lg"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Duration</h4>
                  <p className="text-gray-600">90 minutes (11:00 AM - 12:30 PM)</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 flex items-center justify-center bg-primary bg-opacity-10 rounded-full mr-4 flex-shrink-0">
                  <i className="ri-phone-line text-primary ri-lg"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Contact</h4>
                  <p className="text-gray-600">crgtoastmasters@gmail.com</p>
                  <p className="text-gray-600"><b>Harsh Raval, VP Membership</b></p>
                  <p className="text-gray-600">+91 884 936 0867</p>
                </div>
              </div>
            </div>

            <div id="map" className="lg:w-1/2 h-[400px] rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">CRG Toastmasters</h3>
              <p className="text-gray-400 mb-4">"Where Leaders Are Made"</p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-primary transition-colors">
                  <i className="ri-facebook-fill"></i>
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-primary transition-colors">
                  <i className="ri-twitter-fill"></i>
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-primary transition-colors">
                  <i className="ri-linkedin-fill"></i>
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-primary transition-colors">
                  <i className="ri-instagram-line"></i>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Toastmasters</a></li>
                <li><a href="#benefits" className="text-gray-400 hover:text-white transition-colors">Membership Benefits</a></li>
                <li><a href="#team" className="text-gray-400 hover:text-white transition-colors">Leadership Team</a></li>
                <li><a href="#meetings" className="text-gray-400 hover:text-white transition-colors">Meeting Schedule</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="w-5 h-5 flex items-center justify-center mr-2 mt-1">
                    <i className="ri-map-pin-line text-primary"></i>
                  </div>
                  <span className="text-gray-400">Pramukh Anand Orbit Mall, Kudasan, Gandhinagar</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 flex items-center justify-center mr-2 mt-1">
                    <i className="ri-mail-line text-primary"></i>
                  </div>
                  <span className="text-gray-400">crgtoastmasters@gmail.com</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 flex items-center justify-center mr-2 mt-1">
                    <i className="ri-phone-line text-primary"></i>
                  </div>
                  <span className="text-gray-400">+91 884 936 0867</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 flex items-center justify-center mr-2 mt-1">
                    <i className="ri-time-line text-primary"></i>
                  </div>
                  <span className="text-gray-400">Every Sunday at 11:00 AM</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 CRG Toastmasters Club. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
