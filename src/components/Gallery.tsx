
import { useState } from "react";
import { ArrowLeft, ArrowRight, Image, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  date?: string;
};

export default function Gallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
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
    {
      id: "9",
      src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      alt: "Technical presentation",
      caption: "Technical skills workshop",
      date: "November 30, 2024"
    },
    {
      id: "10",
      src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      alt: "Programming workshop",
      caption: "Communication in tech industry",
      date: "November 15, 2024"
    },
    {
      id: "11",
      src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      alt: "Digital communication",
      caption: "Workshop on digital communication",
      date: "October 25, 2024"
    },
    {
      id: "12",
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      alt: "Tech speech contest",
      caption: "Technology speech competition",
      date: "October 10, 2024"
    },
  ];

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = "auto";
  };

  const navigateImage = (direction: "next" | "prev") => {
    if (selectedImageIndex === null) return;
    
    if (direction === "next") {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
    } else {
      setSelectedImageIndex((selectedImageIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Photo Gallery</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore moments from our previous meetings and events. These images capture our journey of growth, learning, and friendship.
        </p>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {galleryImages.map((image, index) => (
          <Card 
            key={image.id} 
            className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => openLightbox(index)}
          >
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <img
                src={image.src}
                alt={image.alt}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
                  <div className="w-10 h-10 rounded-full bg-white bg-opacity-75 flex items-center justify-center">
                    <Image size={20} className="text-primary" />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-gray-900 truncate">{image.caption}</p>
              <p className="text-xs text-gray-500">{image.date}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4" onClick={closeLightbox}>
          <div className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button 
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full z-10"
              onClick={closeLightbox}
            >
              <X size={24} />
            </button>
            
            {/* Navigation buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 md:left-5 text-white hover:bg-white hover:bg-opacity-20 rounded-full z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("prev");
              }}
            >
              <ArrowLeft size={32} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 md:right-5 text-white hover:bg-white hover:bg-opacity-20 rounded-full z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("next");
              }}
            >
              <ArrowRight size={32} />
            </Button>

            {/* Main image */}
            <div className="relative w-full h-4/5 flex items-center justify-center">
              <img 
                src={galleryImages[selectedImageIndex].src} 
                alt={galleryImages[selectedImageIndex].alt} 
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Caption */}
            <div className="p-4 text-center text-white mt-4">
              <p className="font-medium text-lg">{galleryImages[selectedImageIndex].caption}</p>
              <p className="text-sm text-gray-300">{galleryImages[selectedImageIndex].date}</p>
            </div>

            {/* Thumbnail navigation */}
            <div className="absolute bottom-4 left-0 right-0">
              <div className="flex justify-center items-center gap-2 overflow-x-auto py-2 px-4">
                {galleryImages.map((image, index) => (
                  <div 
                    key={image.id} 
                    className={cn(
                      "w-12 h-12 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all cursor-pointer",
                      selectedImageIndex === index ? "border-white" : "border-transparent hover:border-gray-300"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex(index);
                    }}
                  >
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
