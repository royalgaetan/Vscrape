"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div
      className="flex flex-col items-center justify-center h-full w-full bg-gray-900"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        className=" text-white p-6"
        style={{
          padding: "10vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "auto",
          width: "auto",
        }}
      >
        <div>
          <Image
            src="/underConstruction.png"
            alt="Under Construction"
            width={200}
            height={200}
            className="mb-6"
          />
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold">
          🚧 Site Under Construction 🚧
        </h1>

        <p className="mt-3 text-gray-400 text-center">
          😋 We’re cooking something amazing. Stay tuned! 👌
        </p>
      </div>
    </div>
  );
}
