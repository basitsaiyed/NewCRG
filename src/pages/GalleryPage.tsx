
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const GalleryPage = () => {
  // Scroll to top when the gallery page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-amber-50/30">
      <Navigation />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="pt-28 pb-10"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Gallery</h2>
            <p className="text-lg text-gray-600">
              Browse through memories from our meetings, events, and celebrations.
            </p>
          </div>
        </div>
        <Gallery />
      </motion.div>
      <Footer />
    </div>
  );
};

export default GalleryPage;
