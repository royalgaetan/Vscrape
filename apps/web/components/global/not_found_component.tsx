"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const funnyMessages = [
  "Oops! You’ve discovered the Bermuda Triangle of the internet. 🌊",
  "The page went on vacation and never came back. 🏝️",
  "You found a secret level! Too bad there’s nothing here. 🎮",
  "This page was abducted by aliens. 🛸",
  "Our developers are probably crying right now. 😭",
  "Oops! Looks like we misplaced this page... again. 😅",
  "The page is on a coffee break. ☕",
  "Congratulations! You’ve reached the edge of the internet. 🎉",
  "This page is currently under witness protection. 🕵️",
  "We checked under the couch... it’s definitely missing. 🛋️",
];

const NotFoundComponent = ({
  showBackButton = true,
}: {
  showBackButton?: boolean;
}) => {
  const router = useRouter();
  const [subheader, setSubheader] = useState("...");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * funnyMessages.length);
    setSubheader(funnyMessages[randomIndex]);
  }, []);

  return (
    <div className="flex flex-1 w-full h-full items-center justify-center">
      <div className="select-none flex flex-col items-center justify-center min-h-screen text-center px-4">
        {/* Image Header */}
        <Image
          src="/not_found.webp"
          alt="404 Not Found"
          width={250}
          height={250}
          className="-mb-12 opacity-80"
        />

        {/* Main Header */}
        <h3 className="text-3xl font-bold text-muted-foreground">
          Page Not Found
        </h3>

        {/* Funny Subheader */}
        <p className="text-sm text-gray-600/70 mt-2">{subheader}</p>

        {/* CTA Button */}
        {showBackButton && (
          <Button
            variant="default"
            className="mt-6 px-6 py-2"
            onClick={() => router.push("/home")}
          >
            <ArrowLeft className="" />
            <span> Take Me Home</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default NotFoundComponent;
