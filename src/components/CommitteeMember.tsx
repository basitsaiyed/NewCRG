
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface CommitteeMemberProps {
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
}

const CommitteeMember: React.FC<CommitteeMemberProps> = ({
  name,
  role,
  imageUrl,
  bio
}) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="aspect-[3/4] overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover object-center"
        />
      </div>
      <CardContent className="p-5">
        <h3 className="font-semibold text-xl">{name}</h3>
        <p className="text-amber-600 font-medium mb-2">{role}</p>
        <p className="text-gray-600 text-sm">{bio}</p>
      </CardContent>
    </Card>
  );
};

export default CommitteeMember;
