
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EventItem } from "@/types/gallery";

type Photo = {
  image_url: string;
  description?: string;
};

interface GalleryCategoryProps {
  photos: EventItem[];
}

type PhotoWithDescription = {
  url: string;
  description?: string;
};


const addDefaultImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = '/fallback-image.jpg';
};

interface GalleryCategoryProps {
  photos: EventItem[];
}

export default function GalleryCategory({ photos }: GalleryCategoryProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 0.5
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

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
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {photos.map((event) => (
          <motion.div
            key={event.id}
            variants={item}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="group cursor-pointer"
            onClick={() => {
              setSelectedEvent(event);
              setCurrentPhotoIndex(0);
            }}
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="aspect-video w-full overflow-hidden relative">
                <motion.img
                  src={event.thumbnail}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                {event.photos && (
                  <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded text-white text-sm backdrop-blur-sm">
                    {event.photos.length} photos
                  </div>
                )}
              </div>
              <motion.div
                className="p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="font-bold text-lg text-gray-900">{event.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  {selectedEvent && formatDate(selectedEvent.date)}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Dialog open={!!selectedEvent} onOpenChange={handleClose}>
        <DialogContent className="max-w-[95vw] w-[1200px] p-0 max-h-[90vh] backdrop-blur-sm bg-white/95">
          <div className="flex flex-col md:flex-row h-[90vh]">
            {/* Main Photo View */}
            <div className="relative flex-1 bg-black/90 flex items-center justify-center">
              {selectedEvent?.photos[currentPhotoIndex] && (
                <motion.img
                  key={currentPhotoIndex}
                  src={selectedEvent.photos[currentPhotoIndex]}
                  alt={`${selectedEvent.title} - Photo ${currentPhotoIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = '/fallback-image.jpg';
                  }}
                />
              )}

              {/* Navigation buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 transition-all duration-300 rounded-full"
                onClick={handlePreviousPhoto}
              >
                <ArrowLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 transition-all duration-300 rounded-full"
                onClick={handleNextPhoto}
              >
                <ArrowRight className="h-8 w-8" />
              </Button>

              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 bg-black/30 text-white hover:bg-black/50 transition-all duration-300 rounded-full z-10"
                onClick={handleClose}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Thumbnails and Info Sidebar */}
            <motion.div
              className="w-full md:w-72 bg-white/90 p-4 overflow-hidden flex flex-col"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4">
                <h3 className="font-bold text-xl text-gray-900">{selectedEvent?.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  {selectedEvent?.date}
                </div>
                <p className="text-gray-600 mt-2">{selectedEvent?.description}</p>
              </div>

              <ScrollArea className="flex-1">
                <div className="grid grid-cols-3 gap-2">
                  {selectedEvent?.photos.map((photoUrl, index) => (
                    <motion.div
                      key={index}
                      className={cn(
                        "aspect-square cursor-pointer overflow-hidden rounded-lg border-2",
                        currentPhotoIndex === index ? "border-primary" : "border-transparent"
                      )}
                      onClick={() => setCurrentPhotoIndex(index)}
                    >
                      <img
                        src={photoUrl}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/fallback-image.jpg';
                        }}
                      />
                    </motion.div>
                  ))}
                </div>

                {selectedEvent?.photos[currentPhotoIndex] ? (
                  <motion.p
                    className="text-sm text-gray-600 mt-4 italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={currentPhotoIndex}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {selectedEvent.photos[currentPhotoIndex]}
                  </motion.p>
                ) : null}
              </ScrollArea>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
