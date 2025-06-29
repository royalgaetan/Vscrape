import { VsSocket } from "@vscrape/engine/src";
import { Circle } from "lucide-react";
import React from "react";

const CustomSocket = <T extends VsSocket>({ data: socket }: { data: T }) => {
  return (
    <Circle
      onClick={() => {}}
      className="!size-4 inline-block z-[2]"
      stroke={socket.color}
      fill={socket.color}
    />
  );
};

export default CustomSocket;
