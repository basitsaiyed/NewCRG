
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

// Define an EventCategory type to organize images by event
type EventCategory = {
  id: string;
  title: string;
  date: string;
  thumbnailImage: string;
  images: GalleryImage[];
};

export default function Gallery() {
  const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
  
  // Reorganize gallery images into event categories
  const galleryEvents: EventCategory[] = [
    {
      id: "event1",
      title: "Weekly Meeting Discussion",
      date: "April 15, 2025",
      thumbnailImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      images: [
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
          alt: "Group discussion",
          caption: "Members discussing communication techniques",
          date: "April 15, 2025"
        },
        {
          id: "3",
          src: "https://images.unsplash.com/photo-1556761175-4b46a572b786",
          alt: "Speech presentation",
          caption: "Member giving a prepared speech",
          date: "April 15, 2025"
        }
      ]
    },
    {
      id: "event2",
      title: "Leadership Workshop",
      date: "March 28, 2025",
      thumbnailImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      images: [
        {
          id: "4",
          src: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd",
          alt: "Leadership workshop",
          caption: "Leadership workshop session",
          date: "March 28, 2025"
        },
        {
          id: "5",
          src: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
          alt: "Team activity",
          caption: "Leadership team activity",
          date: "March 28, 2025"
        },
        {
          id: "6",
          src: "https://images.unsplash.com/photo-1543269865-cbf427effbad",
          alt: "Workshop participants",
          caption: "Workshop group activity",
          date: "March 28, 2025"
        }
      ]
    },
    {
      id: "event3",
      title: "Annual Speaking Competition",
      date: "March 10, 2025",
      thumbnailImage: "https://images.unsplash.com/photo-1473177104440-ffee2f376098",
      images: [
        {
          id: "7",
          src: "https://images.unsplash.com/photo-1473177104440-ffee2f376098",
          alt: "Public speaking event",
          caption: "Annual speaking competition",
          date: "March 10, 2025"
        },
        {
          id: "8",
          src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
          alt: "Speech winner",
          caption: "Competition winner announcement",
          date: "March 10, 2025"
        },
        {
          id: "9",
          src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
          alt: "Judges panel",
          caption: "Competition judges",
          date: "March 10, 2025"
        }
      ]
    },
    {
      id: "event4",
      title: "Networking Event",
      date: "February 22, 2025",
      thumbnailImage: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      images: [
        {
          id: "10",
          src: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
          alt: "Evening networking event",
          caption: "Networking after meeting",
          date: "February 22, 2025"
        },
        {
          id: "11",
          src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
          alt: "Member discussions",
          caption: "Members networking and sharing ideas",
          date: "February 22, 2025"
        }
      ]
    }
  ];

  const openLightbox = (eventIndex: number) => {
    setSelectedEventIndex(eventIndex);
    setCurrentPhotoIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedEventIndex(null);
    setCurrentPhotoIndex(0);
    document.body.style.overflow = "auto";
  };

  const navigateImage = (direction: "next" | "prev") => {
    if (selectedEventIndex === null) return;
    
    const currentEvent = galleryEvents[selectedEventIndex];
    const imageCount = currentEvent.images.length;
    
    if (direction === "next") {
      setCurrentPhotoIndex((prev) => (prev + 1) % imageCount);
    } else {
      setCurrentPhotoIndex((prev) => (prev - 1 + imageCount) % imageCount);
    }
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Event Gallery</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore moments from our previous meetings and events. These images capture our journey of growth, learning, and friendship.
        </p>
      </div>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryEvents.map((event, eventIndex) => (
          <Card 
            key={event.id} 
            className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => openLightbox(eventIndex)}
          >
            <div className="relative aspect-video overflow-hidden bg-gray-100">
              <img
                src={event.thumbnailImage}
                alt={event.title}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
                  <div className="w-10 h-10 rounded-full bg-white bg-opacity-75 flex items-center justify-center">
                    <Image size={20} className="text-primary" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 px-2 py-1 rounded text-white text-xs">
                {event.images.length} photos
              </div>
            </div>
            <div className="p-4">
              <p className="text-lg font-medium text-gray-900">{event.title}</p>
              <p className="text-sm text-gray-500">{event.date}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Lightbox */}
      {selectedEventIndex !== null && (
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
              {selectedEventIndex !== null && currentPhotoIndex !== null && (
                <img 
                  src={galleryEvents[selectedEventIndex].images[currentPhotoIndex].src} 
                  alt={galleryEvents[selectedEventIndex].images[currentPhotoIndex].alt} 
                  className="max-h-full max-w-full object-contain"
                />
              )}
            </div>

            {/* Caption */}
            <div className="p-4 text-center text-white mt-2">
              <p className="font-medium text-lg">
                {selectedEventIndex !== null && currentPhotoIndex !== null && galleryEvents[selectedEventIndex].images[currentPhotoIndex].caption}
              </p>
              <p className="text-sm text-gray-300">
                {selectedEventIndex !== null && currentPhotoIndex !== null && galleryEvents[selectedEventIndex].images[currentPhotoIndex].date}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {currentPhotoIndex !== null && selectedEventIndex !== null && 
                  `Photo ${currentPhotoIndex + 1} of ${galleryEvents[selectedEventIndex].images.length}`}
              </p>
            </div>

            {/* Thumbnail navigation */}
            <div className="absolute bottom-4 left-0 right-0">
              <div className="flex justify-center items-center gap-2 overflow-x-auto py-2 px-4">
                {selectedEventIndex !== null && galleryEvents[selectedEventIndex].images.map((image, index) => (
                  <div 
                    key={image.id} 
                    className={cn(
                      "w-12 h-12 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all cursor-pointer",
                      currentPhotoIndex === index ? "border-white" : "border-transparent hover:border-gray-300"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentPhotoIndex(index);
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
