
import React from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import {
  MapPin,
  Calendar,
  Clock,
  Award,
  BookOpen,
  Users,
  MessageCircle,
  ArrowRight,
  Mic
} from "lucide-react";
import { useEffect } from "react";
import CommitteeMember from "@/components/CommitteeMember";

// Define a type for the TomTom SDK to fix the error
declare global {
  interface Window {
    tt: any;
  }
}

const Index = () => {
  useEffect(() => {
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
      <section id="home" className="pt-24 py-16 md:py-24 bg-amber-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 space-y-6">
              <div className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                Find your voice. Develop your leadership.
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Become A Better <span className="text-amber-500">Speaker</span> And Leader
              </h1>
              <p className="text-lg text-gray-600">
                Join our supportive community where you'll develop communication and leadership skills in a positive, feedback-rich environment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white w-full sm:w-auto">
                  Visit as a Guest
                </Button>
                <Button size="lg" variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-50 w-full sm:w-auto">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 w-full">
              <div className="relative aspect-[4/3] md:aspect-[16/9]">
                <img 
                  src="https://images.unsplash.com/photo-1475721027785-f74ec9c7e14c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                  alt="Public speaking event" 
                  className="rounded-lg shadow-xl w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Benefits of Joining</h2>
            <p className="text-lg text-gray-600">
              Toastmasters provides a supportive and positive learning environment where members develop communication and leadership skills.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-amber-100 text-amber-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Public Speaking Skills</h3>
              <p className="text-gray-600">
                Overcome fear of public speaking and develop confidence through regular practice in a supportive environment.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-amber-100 text-amber-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Leadership Development</h3>
              <p className="text-gray-600">
                Take on club roles and leadership positions to develop valuable skills for your career and personal life.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-amber-100 text-amber-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Structured Learning Path</h3>
              <p className="text-gray-600">
                Follow Toastmasters' proven program at your own pace with clear goals and achievements to celebrate.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-amber-100 text-amber-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Professional Growth</h3>
              <p className="text-gray-600">
                Develop skills that are highly valued in the workplace, from presentation skills to effective meetings.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-amber-100 text-amber-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Networking Opportunities</h3>
              <p className="text-gray-600">
                Connect with diverse professionals from different industries and backgrounds in your community.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-amber-100 text-amber-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Constructive Feedback</h3>
              <p className="text-gray-600">
                Receive helpful evaluations from fellow members to continually improve your speaking abilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Executive Committee</h2>
            <p className="text-lg text-gray-600">
              Meet our dedicated team who work together to make our club a thriving and supportive community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <CommitteeMember 
              name="Sarah Johnson"
              role="President"
              imageUrl="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
              bio="Sarah leads our club with passion and dedication, ensuring every member develops their skills."
            />
            <CommitteeMember 
              name="Michael Chen"
              role="Vice President Education"
              imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80"
              bio="Michael oversees our educational program and helps members progress through their speaking journeys."
            />
            <CommitteeMember 
              name="Jessica Rodriguez"
              role="Vice President Membership"
              imageUrl="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80"
              bio="Jessica welcomes new members and ensures they feel at home in our supportive community."
            />
            <CommitteeMember 
              name="David Patel"
              role="Vice President Public Relations"
              imageUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
              bio="David promotes our club and builds relationships with the local community."
            />
            <CommitteeMember 
              name="Emma Wilson"
              role="Secretary"
              imageUrl="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
              bio="Emma keeps our records organized and ensures smooth communication within the club."
            />
            <CommitteeMember 
              name="Robert Kim"
              role="Treasurer"
              imageUrl="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
              bio="Robert manages our finances and ensures we have the resources needed for club activities."
            />
          </div>
        </div>
      </section>

      {/* Meeting Information Section */}
      <section id="meetings" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Club Meetings</h2>
            <p className="text-lg text-gray-600">
              Join us at our weekly meetings to develop your communication and leadership skills in a supportive environment.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2 bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 p-2 rounded-full text-amber-600 mt-1">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Location</h3>
                      <p className="text-gray-600">Harmony Living Ed Value Chain Solutions Pvt Ltd. E-329, 3rd Floor, Pramukh Anand Orbit Mall, Kudasan, Gandhinagar</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 p-2 rounded-full text-amber-600 mt-1">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Day</h3>
                      <p className="text-gray-600">Every Sunday</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 p-2 rounded-full text-amber-600 mt-1">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Time</h3>
                      <p className="text-gray-600">11:00 AM - 12:30 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 p-2 rounded-full text-amber-600 mt-1">
                      <Mic className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Format</h3>
                      <p className="text-gray-600">Prepared speeches, evaluations, and impromptu speaking</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="map" className="lg:w-1/2 h-[400px] rounded-lg shadow-md"></div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Take the Next Step?</h2>
            <p className="text-xl mb-8">
              Visit us as a guest with no obligation. Experience firsthand how Toastmasters can help you become a confident speaker and leader.
            </p>
            <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100">
              Join Our Next Meeting <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
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
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-amber-500 transition-colors">
                  <i className="ri-facebook-fill"></i>
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-amber-500 transition-colors">
                  <i className="ri-twitter-fill"></i>
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-amber-500 transition-colors">
                  <i className="ri-linkedin-fill"></i>
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-amber-500 transition-colors">
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
                    <i className="ri-map-pin-line text-amber-500"></i>
                  </div>
                  <span className="text-gray-400">Pramukh Anand Orbit Mall, Kudasan, Gandhinagar</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 flex items-center justify-center mr-2 mt-1">
                    <i className="ri-mail-line text-amber-500"></i>
                  </div>
                  <span className="text-gray-400">crgtoastmasters@gmail.com</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 flex items-center justify-center mr-2 mt-1">
                    <i className="ri-phone-line text-amber-500"></i>
                  </div>
                  <span className="text-gray-400">+91 884 936 0867</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 flex items-center justify-center mr-2 mt-1">
                    <i className="ri-time-line text-amber-500"></i>
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
