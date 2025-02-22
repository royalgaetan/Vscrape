import React from "react";

type Props = {
  text: string;
  emoji?: string;
  onClick: () => void;
};

const CustomButton = ({ text, emoji, onClick }: Props) => {
  return (
    <button
      className="hover:cursor-pointer hover:opacity-80 group/button flex flex-1 hover:bg-neutral-100 rounded-2xl px-4 py-1 text-sm"
      onClick={() => onClick()}
    >
      {text}
      {emoji && (
        <span className="block transition-all duration-200 group-hover/button:translate-x-1 translate-x-0">
          {emoji}
        </span>
      )}
    </button>
  );
};

export default CustomButton;
