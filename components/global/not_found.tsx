"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const funnyMessages = [
  "Oops! You’ve discovered the Bermuda Triangle of the internet. 🌊",
  "404: The page went on vacation and never came back. 🏝️",
  "You found a secret level! Too bad there’s nothing here. 🎮",
  "This page was abducted by aliens. 🛸",
  "Our developers are probably crying right now. 😭",
  "Oops! Looks like we misplaced this page... again. 😅",
  "404: The page is on a coffee break. ☕",
  "Congratulations! You’ve reached the edge of the internet. 🎉",
  "This page is currently under witness protection. 🕵️",
  "We checked under the couch... it’s definitely missing. 🛋️",
];

export default function NotFoundComponent() {
  const router = useRouter();
  const [subheader, setSubheader] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * funnyMessages.length);
    setSubheader(funnyMessages[randomIndex]);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      {/* Image Header */}
      <Image
        src="/not_found.webp"
        alt="404 Not Found"
        width={300}
        height={300}
        className="mb-6"
      />

      {/* Main Header */}
      <h1 className="text-4xl font-bold text-gray-900">404 - Page Not Found</h1>

      {/* Funny Subheader */}
      <p className="text-lg text-gray-600 mt-3">{subheader}</p>

      {/* CTA Button */}
      <Button
        variant="default"
        className="mt-6 px-6 py-2"
        onClick={() => router.push("/home")}
      >
        <ArrowLeft className="" />
        <span> Take Me Home</span>
      </Button>
    </div>
  );
}
