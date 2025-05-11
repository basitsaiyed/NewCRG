export type EventItem = {
  id: string | number;
  title: string;
  date: string;
  thumbnail: string;
  photos: string[];
  meetingType: string;
  tags?: string[];
  description?: string;
};
