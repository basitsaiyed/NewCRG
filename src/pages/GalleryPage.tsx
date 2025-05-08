
import Navigation from "@/components/Navigation";
import Gallery from "@/components/Gallery";

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-20 pb-10 bg-gradient-to-b from-primary/10 to-transparent">
        <Gallery />
      </div>
    </div>
  );
};

export default GalleryPage;
