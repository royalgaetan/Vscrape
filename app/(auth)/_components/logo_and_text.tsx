import React from "react";
import Image from "next/image";
import { appName } from "@/lib/constants";
import { cn } from "@/lib/utils";

const LogoAndText = ({
  logoWidth,
  logoHeight,
  textClassName,
}: {
  logoWidth?: number;
  logoHeight?: number;
  textClassName?: string;
}) => {
  return (
    <div className="flex flex-1 items-center justify-center gap-1">
      <Image
        alt="Vscrape logo"
        src={"/Vscrape logo.png"}
        className="select-none"
        width={logoWidth ?? 35}
        height={logoHeight ?? 35}
      />

      <h3
        className={cn(
          "select-none font-semibold text-lg  text-[#333]",
          textClassName
        )}
      >
        {appName}
      </h3>
    </div>
  );
};

export default LogoAndText;
