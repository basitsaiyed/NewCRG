
import Navigation from "@/components/Navigation";
import Gallery from "@/components/Gallery";
import { motion } from "framer-motion";

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-20 pb-10 bg-gradient-to-b from-primary/10 to-transparent"
      >
        <Gallery />
      </motion.div>
    </div>
  );
};

export default GalleryPage;
