
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Gallery from "@/components/Gallery";
import { motion } from "framer-motion";

const GalleryPage = () => {
  // Scroll to top when the gallery page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="pt-24 pb-10 bg-gradient-to-b from-primary/10 to-transparent"
      >
        <Gallery />
      </motion.div>
    </div>
  );
};

export default GalleryPage;
