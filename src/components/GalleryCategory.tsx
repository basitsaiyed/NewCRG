
import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Calendar, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Photo = {
  image_url: string;
  description?: string;
};

type EventItem = {
  id: string | number;
  title: string;
  date: string;
  imageUrl: string;
  description?: string;
  photos: Photo[];
};

interface GalleryCategoryProps {
  photos: EventItem[];
}

export default function GalleryCategory({ photos }: GalleryCategoryProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const handlePreviousPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedEvent) return;
    
    setCurrentPhotoIndex((prev) => 
      prev === 0 ? selectedEvent.photos.length - 1 : prev - 1
    );
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedEvent) return;
    
    setCurrentPhotoIndex((prev) => 
      prev === selectedEvent.photos.length - 1 ? 0 : prev + 1
    );
  };

  const handleClose = () => {
    setSelectedEvent(null);
    setCurrentPhotoIndex(0);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {photos.map((event) => (
          <div
            key={event.id}
            className="group cursor-pointer"
            onClick={() => {
              setSelectedEvent(event);
              setCurrentPhotoIndex(0);
            }}
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
              <div className="aspect-video w-full overflow-hidden relative">
                <img 
                  src={event.imageUrl} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                {event.photos && (
                  <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded text-white text-sm">
                    {event.photos.length} photos
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900">{event.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  {event.date}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedEvent} onOpenChange={handleClose}>
        <DialogContent className="max-w-[95vw] w-[1200px] p-0 max-h-[90vh]">
          <div className="flex flex-col md:flex-row h-[90vh]">
            {/* Main Photo View */}
            <div className="relative flex-1 bg-black flex items-center justify-center">
              {selectedEvent?.photos[currentPhotoIndex] && (
                <img
                  src={selectedEvent.photos[currentPhotoIndex].image_url}
                  alt={selectedEvent.title}
                  className="max-w-full max-h-full object-contain"
                />
              )}

              {/* Navigation buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                onClick={handlePreviousPhoto}
              >
                <ArrowLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                onClick={handleNextPhoto}
              >
                <ArrowRight className="h-8 w-8" />
              </Button>

              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 bg-black/50 text-white hover:bg-black/70 z-10"
                onClick={handleClose}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Thumbnails and Info Sidebar */}
            <div className="w-full md:w-72 bg-white p-4 overflow-y-auto flex flex-col">
              <div className="mb-4">
                <h3 className="font-bold text-xl text-gray-900">{selectedEvent?.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  {selectedEvent?.date}
                </div>
                <p className="text-gray-600 mt-2">{selectedEvent?.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {selectedEvent?.photos.map((photo, index) => (
                  <div
                    key={index}
                    className={cn(
                      "aspect-square cursor-pointer overflow-hidden rounded-lg border-2",
                      currentPhotoIndex === index ? "border-primary" : "border-transparent"
                    )}
                    onClick={() => setCurrentPhotoIndex(index)}
                  >
                    <img
                      src={photo.image_url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {selectedEvent?.photos[currentPhotoIndex]?.description && (
                <p className="text-sm text-gray-600 mt-4 italic">
                  {selectedEvent.photos[currentPhotoIndex].description}
                </p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
