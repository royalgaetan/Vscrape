import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen bg-[#F6F7F9]">
      <div className="flex flex-1 justify-center items-center">{children}</div>
    </div>
  );
};

export default RootLayout;
