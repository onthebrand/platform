"use client";

import { Button } from "@/components/ui/button";

const ContactButton = () => {
  const handleClick = () => {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Button onClick={handleClick} className="rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold transition-colors">
      Conversemos
    </Button>
  );
};

export default ContactButton;