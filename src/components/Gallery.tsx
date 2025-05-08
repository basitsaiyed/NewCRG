
import { useState } from "react";
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
  imageUrl: string;
  description?: string;
  photos: Photo[];
};

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");

  const regularMeetings: EventItem[] = [
    {
      id: "meeting1",
      title: "Weekly Meeting Discussion",
      date: "April 15, 2025",
      imageUrl: "https://images.unsplash.com/photo-1560439514-4e9645039924",
      description: "Members practicing impromptu speaking skills during our Table Topics session.",
      photos: [
        {
          image_url: "https://images.unsplash.com/photo-1560439514-4e9645039924",
          description: "Opening remarks from our Table Topics master"
        },
        {
          image_url: "https://images.unsplash.com/photo-1552664730-d307ca884978",
          description: "Members engaging in impromptu speaking"
        },
        {
          image_url: "https://images.unsplash.com/photo-1591115765373-5207764f72e7",
          description: "Group discussion after the session"
        }
      ]
    },
    {
      id: "meeting2",
      title: "Speech Evaluation",
      date: "March 28, 2025",
      imageUrl: "https://images.unsplash.com/photo-1561489401-fc2876ced162",
      description: "Members providing constructive feedback to help speakers improve.",
      photos: [
        {
          image_url: "https://images.unsplash.com/photo-1561489401-fc2876ced162",
          description: "Evaluator sharing feedback"
        },
        {
          image_url: "https://images.unsplash.com/photo-1580894744854-03c6cddf0358",
          description: "Speaker receiving evaluation report"
        },
        {
          image_url: "https://images.unsplash.com/photo-1628201692968-a2a980023894",
          description: "Audience listening attentively"
        }
      ]
    },
    {
      id: "meeting3",
      title: "Prepared Speech",
      date: "March 10, 2025",
      imageUrl: "https://images.unsplash.com/photo-1557425955-df376b5903c8",
      description: "A member delivering their prepared speech on leadership principles.",
      photos: [
        {
          image_url: "https://images.unsplash.com/photo-1557425955-df376b5903c8",
          description: "Speaker on stage"
        },
        {
          image_url: "https://images.unsplash.com/photo-1542744166-e989ea7a2526",
          description: "Presentation slides"
        },
        {
          image_url: "https://images.unsplash.com/photo-1585779971180-774105516507",
          description: "Audience taking notes"
        }
      ]
    }
  ];

  const specialEvents: EventItem[] = [
    {
      id: "event1",
      title: "Club Anniversary",
      date: "February 22, 2025",
      imageUrl: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce",
      description: "Celebrating our club's 5th anniversary with special guest speakers.",
      photos: [
        {
          image_url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce",
          description: "Opening ceremony"
        },
        {
          image_url: "https://images.unsplash.com/photo-1540317580256-e5d0c50a3d60",
          description: "Keynote speaker presentation"
        },
        {
          image_url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
          description: "Award ceremony"
        },
        {
          image_url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b",
          description: "Group celebration"
        }
      ]
    },
    {
      id: "event2",
      title: "Speech Contest",
      date: "January 15, 2025",
      imageUrl: "https://images.unsplash.com/photo-1475721027785-f74ec9c7e14c",
      description: "Our annual speech contest where members compete with their best speeches.",
      photos: [
        {
          image_url: "https://images.unsplash.com/photo-1475721027785-f74ec9c7e14c",
          description: "Contestants on stage"
        },
        {
          image_url: "https://images.unsplash.com/photo-1568699751349-b5604944b8c0",
          description: "Judges evaluating speeches"
        },
        {
          image_url: "https://images.unsplash.com/photo-1585314062724-7969186339c9",
          description: "Award presentation"
        }
      ]
    }
  ];

  const workshops: EventItem[] = [
    {
      id: "workshop1",
      title: "Impromptu Speaking Workshop",
      date: "December 5, 2024",
      imageUrl: "https://images.unsplash.com/photo-1544531585-9847b68c8c86",
      description: "A special workshop focused on developing quick thinking and impromptu speaking skills.",
      photos: [
        {
          image_url: "https://images.unsplash.com/photo-1544531585-9847b68c8c86",
          description: "Workshop facilitator"
        },
        {
          image_url: "https://images.unsplash.com/photo-1556075798-74089b20d941",
          description: "Participants practicing"
        },
        {
          image_url: "https://images.unsplash.com/photo-1556228450-376391209186",
          description: "Group activity"
        }
      ]
    },
    {
      id: "workshop2",
      title: "Vocal Variety Workshop",
      date: "November 12, 2024",
      imageUrl: "https://images.unsplash.com/photo-1559223607-b4d0555ae227",
      description: "Learning how to use your voice effectively to engage your audience.",
      photos: [
        {
          image_url: "https://images.unsplash.com/photo-1559223607-b4d0555ae227",
          description: "Instructor demonstrating vocal techniques"
        },
        {
          image_url: "https://images.unsplash.com/photo-1560179737-d4969f750508",
          description: "Participants practicing vocal exercises"
        },
        {
          image_url: "https://images.unsplash.com/photo-1563911302283-d67d63b5a9c5",
          description: "Feedback session"
        }
      ]
    }
  ];

  const getAllPhotos = () => {
    return [...regularMeetings, ...specialEvents, ...workshops];
  };

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
          <GalleryCategory photos={getAllPhotos()} />
        </TabsContent>
        
        <TabsContent value="regular" className="mt-0">
          <GalleryCategory photos={regularMeetings} />
        </TabsContent>
        
        <TabsContent value="special" className="mt-0">
          <GalleryCategory photos={specialEvents} />
        </TabsContent>
        
        <TabsContent value="workshops" className="mt-0">
          <GalleryCategory photos={workshops} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
