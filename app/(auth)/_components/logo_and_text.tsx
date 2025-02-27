import React from "react";
import Image from "next/image";
import { appName } from "@/lib/constants";
import { cn } from "@/lib/utils";

const LogoAndText = () => {
  return (
    <div className="flex flex-1 items-center justify-center gap-1">
      <Image
        alt="Vscrape logo"
        src={"/Vscrape logo.png"}
        className=""
        width={35}
        height={35}
      />

      <h3 className={cn("font-semibold text-lg  text-[#333]")}>{appName}</h3>
    </div>
  );
};

export default LogoAndText;
