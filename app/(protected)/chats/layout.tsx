import React from "react";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex justify-center pl-4">{children}</div>;
};

export default ChatLayout;
