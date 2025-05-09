
import React from "react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Take the Next Step?</h2>
          <p className="text-xl mb-8">
            Visit us as a guest with no obligation. Experience firsthand how Toastmasters can help you become a confident speaker and leader.
          </p>
          <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100">
            Visit as a Guest
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
