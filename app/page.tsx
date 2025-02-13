"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gray-900">
      <div className=" text-white p-6">
        {/* Animated Image */}
        <div>
          <Image
            src="/underConstruction.png"
            alt="Under Construction"
            width={200}
            height={200}
            className="mb-6"
          />
        </div>

        {/* Animated Text */}
        <h1 className="text-2xl sm:text-4xl font-bold">
          🚧 Site Under Construction 🚧
        </h1>

        {/* Subtext */}
        <p className="mt-3 text-gray-400 text-center">
          We’re cooking something amazing. Stay tuned!
        </p>
      </div>
    </div>
  );
}
