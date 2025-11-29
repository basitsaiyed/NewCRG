
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-12 bg-primary text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Take the Next Step?</h2>
          <p className="text-xl mb-8">
            Visit us as a guest with no obligation. Experience firsthand how Toastmasters can help you become a confident speaker and leader.
          </p>
          <Link to="#meetings">
            <Button size="lg" className="bg-accent text-gray-900 hover:bg-accent/90 font-bold shadow-lg">
              Visit as a Guest
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
