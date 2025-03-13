import { generateAvatar } from "@/lib/avatar";
import React, { useState } from "react";
import Image from "next/image";
import { RefreshCwIcon } from "lucide-react";

const SettingItemAvatar = () => {
  const [newAvatarImage, setNewAvatarImage] = useState(
    generateAvatar()?.toDataUri ?? ""
  );

  return (
    <div className="w-20 h-20 rounded-full mb-3 relative">
      <Image
        alt="Avatar Image"
        src={newAvatarImage}
        fill
        className="object-cover rounded-full select-none"
      />

      <div className="p-[0.20rem] -bottom-1 right-1 bg-white absolute cursor-pointer rounded-full">
        <button
          type="button"
          onClick={() => {
            setNewAvatarImage(generateAvatar()?.toDataUri ?? "");
          }}
          className="active:scale-95 transition-all duration-100 ease-in-out bg-secondary rounded-full p-1 flex flex-1 justify-center items-center"
        >
          <RefreshCwIcon
            size={"0.9rem"}
            className="stroke-secondary-foreground/80"
          />
        </button>
      </div>
    </div>
  );
};

export default SettingItemAvatar;
