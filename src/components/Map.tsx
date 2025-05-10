import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

// Define a type for the TomTom SDK to avoid TypeScript errors
declare global {
  interface Window {
    tt: any;
  }
}

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    // Check if TomTom is loaded
    const checkTomTom = setInterval(() => {
      if (window.tt && mapContainerRef.current) {
        clearInterval(checkTomTom);
        initializeMap();
      }
    }, 100);

    function initializeMap() {
      try {
        // Create map instance
        const map = window.tt.map({
          key: 'supu8hAZdQgayQ7E3SfxLUK1M8ocVw7W',
          container: mapContainerRef.current,
          center: [72.63054749391392, 23.18436526489801],
          zoom: 15,
          style: 'https://api.tomtom.com/style/1/style/22.2.1-*?map=basic_main&poi=poi_main'
        });

        mapInstance.current = map;

        // Create marker element
        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker';
        markerElement.innerHTML = `
          <svg width="40" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="#EA4335" d="M12 0C7.58 0 4 3.58 4 8c0 5.5 8 16 8 16s8-10.5 8-16c0-4.42-3.58-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
            <circle cx="12" cy="8" r="3" fill="white"/>
          </svg>
        `;

        // Add marker to map
        new window.tt.Marker({
          element: markerElement
        })
          .setLngLat([72.63054749391392, 23.18436526489801])
          .addTo(map);

      } catch (error) {
        console.error('Error initializing map:', error);
        if (mapContainerRef.current) {
          mapContainerRef.current.innerHTML = '<div class="p-6 bg-gray-200 text-center rounded"><p>Map loading error. Please try again later.</p></div>';
        }
      }
    }

    // Cleanup
    return () => {
      clearInterval(checkTomTom);
      if (mapInstance.current) {
        mapInstance.current.remove();
      }
    };
  }, []);

  return (
    <section id="location" className="py-10 bg-amber-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Find Us</h2>
          <p className="text-lg text-gray-600">
            Visit our meeting location. We're easily accessible and welcome guests!
          </p>
        </div>
        
        <Card className="overflow-hidden border-0 shadow-lg">
          <CardContent className="p-0">
            <div ref={mapContainerRef} className="h-[400px] w-full" />
          </CardContent>
        </Card>
        
        <div className="mt-6 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-gray-700">
            <MapPin className="h-10 w-10 text-amber-500" />
            <p>Harmony Living Ed Value Chain Solutions Pvt Ltd., E-329, 3rd Floor, Pramukh Anand Orbit Mall, Kudasan, Gandhinagar</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
