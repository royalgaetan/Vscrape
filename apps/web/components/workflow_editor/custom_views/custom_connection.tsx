import React from "react";
import { ClassicScheme, Presets } from "rete-react-plugin";

const { useConnection } = Presets.classic;

const CustomConnection = ({
  data,
  isLoop,
}: {
  data: ClassicScheme["Connection"];
  isLoop?: boolean;
}) => {
  const path = useConnection();

  if (!path.path) return null;
  return (
    <svg
      data-testid={`Connection`}
      className="!overflow-visible absolute pointer-events-none w-[9999px] h-[9999px] transition-all duration-150"
    >
      <path
        className="inline-block translate-y-[0.2rem] cursor-pointer group/connectionLine fill-none stroke-[5px] stroke-neutral-500 pointer-events-auto"
        d={path.path}
      />
    </svg>
  );
};

export default CustomConnection;
