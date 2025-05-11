
import React, { useEffect } from "react";
import Navigation from "@/components/Navigation";
import MeetingInfo from "@/components/MeetingInfo";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Map from "@/components/Map";
import { Button } from "@/components/ui/button";
import {
  Award,
  BookOpen,
  Users,
  MessageCircle,
} from "lucide-react";
import CommitteeMember from "@/components/CommitteeMember";
import { Link } from "react-router-dom";

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
              <p className="text-lg text-gray-600">
                Whether you're a beginner or an experienced speaker, Toastmasters is the place for you to grow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* <span className="inline-block px-5 py-2 rounded-full bg-amber-100 text-amber-700 font-semibold text-lg shadow-sm hover:bg-amber-500 hover:text-white transition-all duration-300 cursor-pointer">
                  Visit as a Guest
                </span><br /> */}
                <Link to="/gallery">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white w-full sm:w-auto">
                    Gallery
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 w-full">
              <div className="relative aspect-[4/3] md:aspect-[16/9]">
                <img
                  src="https://res.cloudinary.com/dtn8ucfqp/image/upload/v1746984053/upscalemedia-transformed_wj7d4b.png"
                  alt="Toastmasters International"
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
              name="Prakhar Verma"
              role="President"
              imageUrl="https://res.cloudinary.com/dtn8ucfqp/image/upload/v1746981758/Prakhar_dyrg31.jpg"
              bio="Prakhar leads our club with passion and dedication, ensuring every member develops their skills."
            />
            <CommitteeMember
              name="Megha Bhatt"
              role="Vice President Education"
              imageUrl="https://res.cloudinary.com/dtn8ucfqp/image/upload/v1746982914/megha2_xfze49.jpg"
              bio="Megha oversees our educational program and helps members progress through their speaking journeys."
            />
            <CommitteeMember
              name="Harsh Rawell"
              role="Vice President Membership"
              imageUrl="https://res.cloudinary.com/dtn8ucfqp/image/upload/v1746981758/Harsh_llaxkb.jpg"
              bio="Harsh welcomes new members and ensures they feel at home in our supportive community."
            />
            <CommitteeMember
              name="Arun"
              role="Vice President Public Relations"
              imageUrl="https://res.cloudinary.com/dtn8ucfqp/image/upload/v1746981758/Arun_vludv2.jpg"
              bio="Arun promotes our club and builds relationships with the local community."
            />
            <CommitteeMember
              name="Pranita"
              role="Secretary"
              imageUrl="https://res.cloudinary.com/dtn8ucfqp/image/upload/v1746981757/Pranita_lqliow.jpg"
              bio="Pranita keeps our records organized and ensures smooth communication within the club."
            />
            <CommitteeMember
              name="Shrimohan"
              role="Treasurer"
              imageUrl="https://res.cloudinary.com/dtn8ucfqp/image/upload/v1746983343/wmremove-transformed_tgw8tp.jpg"
              bio="Shrimohan manages our finances and ensures we have the resources needed for club activities."
            />
            <CommitteeMember
              name="Saurav Asija"
              role="Sergeant at Arms"
              imageUrl="https://res.cloudinary.com/dtn8ucfqp/image/upload/v1746983615/1746983505540_1_kevjhq.jpg"
              bio="Saurav Keeps track of the club's physical properties and ensures a positive meeting environment."
            />
          </div>
        </div>
      </section>

      {/* Meeting Information Section */}
      <MeetingInfo />

      {/* Map Section */}
      <Map />

      {/* CTA section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
