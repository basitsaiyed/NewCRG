
import React from "react";
import { MapPin, Calendar, Clock, Mic } from "lucide-react";

const MeetingInfo = () => {
  return (
    <section id="meetings" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Club Meetings</h2>
          <p className="text-lg text-gray-600">
            Join us at our weekly meetings to develop your communication and leadership skills in a supportive environment.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-full text-amber-600 flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Location</h3>
                  <p className="text-gray-600">Harmony Living Ed Value Chain Solutions Pvt Ltd.</p>
                  <p className="text-gray-600">E-329, 3rd Floor, Pramukh Anand Orbit Mall, Kudasan, Gandhinagar</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-full text-amber-600 flex-shrink-0">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Day</h3>
                  <p className="text-gray-600">Every Sunday</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-full text-amber-600 flex-shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Time</h3>
                  <p className="text-gray-600">11:00 AM - 12:30 PM</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-full text-amber-600 flex-shrink-0">
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
      </div>
    </section>
  );
};

export default MeetingInfo;
