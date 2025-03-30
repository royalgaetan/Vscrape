import React from "react";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex justify-center">{children}</div>;
};

export default ChatLayout;
