
import { useState } from "react";
import { Image } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  date?: string;
};

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  
  // Sample gallery images - replace with your actual images later
  const galleryImages: GalleryImage[] = [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      alt: "Toastmasters meeting",
      caption: "Weekly meeting discussion",
      date: "April 15, 2025"
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      alt: "Leadership workshop",
      caption: "Leadership workshop session",
      date: "March 28, 2025"
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1473177104440-ffee2f376098",
      alt: "Public speaking event",
      caption: "Annual speaking competition",
      date: "March 10, 2025"
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      alt: "Evening networking event",
      caption: "Networking after meeting",
      date: "February 22, 2025"
    },
    {
      id: "5",
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      alt: "Outdoor team building",
      caption: "Team building retreat",
      date: "February 5, 2025"
    },
    {
      id: "6",
      src: "https://images.unsplash.com/photo-1543269865-cbf427effbad",
      alt: "Group discussion",
      caption: "Group discussion on communication",
      date: "January 18, 2025"
    },
    {
      id: "7",
      src: "https://images.unsplash.com/photo-1556761175-4b46a572b786",
      alt: "Speech practice",
      caption: "Practice speeches session",
      date: "January 4, 2025"
    },
    {
      id: "8",
      src: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd",
      alt: "Award ceremony",
      caption: "Annual awards ceremony",
      date: "December 15, 2024"
    },
  ];

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore moments from our previous meetings and events. These images capture our journey of growth, learning, and friendship.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {galleryImages.map((image) => (
          <Card 
            key={image.id} 
            className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => openLightbox(image)}
          >
            <div className="relative aspect-video overflow-hidden bg-gray-100">
              <img
                src={image.src}
                alt={image.alt}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
            </div>
            <div className="p-4">
              <p className="font-medium text-gray-900">{image.caption}</p>
              <p className="text-sm text-gray-500">{image.date}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4" onClick={closeLightbox}>
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute -top-12 right-0 text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full"
              onClick={closeLightbox}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="relative aspect-video">
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.alt} 
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="p-4 bg-white">
                <p className="font-medium text-gray-900">{selectedImage.caption}</p>
                <p className="text-sm text-gray-500">{selectedImage.date}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
