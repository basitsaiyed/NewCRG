import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GalleryCategory from "./GalleryCategory";

type Photo = {
  image_url: string;
  description?: string;
};

type EventItem = {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
  photos: Photo[];
  meetingType: string;
  tags: string[];
  description?: string;
};

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/.netlify/functions/getGallery');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredEvents = events.filter(event => 
    activeCategory === "all" || event.meetingType === activeCategory
  );

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <p>Loading gallery...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Event Gallery</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore moments from our previous meetings and events. These images capture our journey of growth, learning, and friendship.
        </p>
      </div>

      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="bg-primary/5">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="regular">Regular Meetings</TabsTrigger>
            <TabsTrigger value="special">Special Events</TabsTrigger>
            <TabsTrigger value="workshops">Workshops</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <GalleryCategory photos={filteredEvents} />
        </TabsContent>
        
        <TabsContent value="regular" className="mt-0">
          <GalleryCategory photos={events.filter(e => e.meetingType === 'regular')} />
        </TabsContent>
        
        <TabsContent value="special" className="mt-0">
          <GalleryCategory photos={events.filter(e => e.meetingType === 'special')} />
        </TabsContent>
        
        <TabsContent value="workshops" className="mt-0">
          <GalleryCategory photos={events.filter(e => e.meetingType === 'workshops')} />
        </TabsContent>
      </Tabs>
    </div>
  );
}