import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CircleCheck, Edit2Icon, Edit3Icon, Trash2Icon } from "lucide-react";
export type BankCard = {
  title: string;
  cardNumber: string; // Storing the card number as a string for formatting purposes
  cardholderName: string;
  expirationDate: string; // Format: MM/YY
  cardType: "Visa" | "MasterCard" | "AMEX" | "Discover"; // Example card types
  cardNetwork: "Visa" | "MasterCard" | "AMEX" | "Discover"; // Network logo
  isDefault: boolean;
};

const SettingsItemPaymentCard = ({ bankCard }: { bankCard: BankCard }) => {
  const getBgColor = (title: string): string => {
    switch (title) {
      case "Absa Bank":
        return "bg-slate-900";
      case "Wise":
        return "bg-emerald-900";
      case "MCB Bank":
        return "bg-pink-900";
      default:
        return "bg-gray-800";
    }
  };
  return (
    <div className="group/card w-80 h-fit flex flex-col transition-all duration-100">
      {/* Card */}
      <div
        className={cn(
          "flex rounded-lg w-full h-44 p-4 cursor-pointer group-hover/card:hover:opacity-90",
          getBgColor(bankCard.title)
        )}
      >
        {/* Card Info Section */}
        <div className="flex flex-col justify-between h-full w-3/4">
          {/* Card Title (Bank Name or Card Type) */}
          <h3 className="text-white text-lg font-semibold">{bankCard.title}</h3>

          {/* Card Number */}
          <div className="text-white text-xl font-bold mt-1">
            <span className="text-gray-300">{bankCard.cardNumber}</span>
          </div>

          {/* Cardholder's Name */}
          <div className="text-white text-sm mt-2">
            <span className="uppercase">{bankCard.cardholderName}</span>
          </div>
        </div>

        {/* Card Icons Section */}
        <div className="flex flex-col justify-between h-full items-end w-1/4">
          {/* Card Chip */}
          <div className="w-20 h-12 relative">
            <Image
              src={
                bankCard.cardType === "MasterCard"
                  ? "/Mastercard logo.png"
                  : "/Visa logo.png"
              }
              alt={
                bankCard.cardType === "MasterCard"
                  ? "Mastercard logo"
                  : "Visa logo"
              }
              fill
              className="object-contain"
            />
          </div>

          {/* Card Network (Visa, MasterCard) */}
          <div className="text-white text-sm mt-2">{bankCard.cardNetwork}</div>

          {/* Expiration Date */}
          <div className="text-white text-sm mt-2">
            Exp: {bankCard.expirationDate}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="min-h-8 flex flex-1 justify-between mt-1">
        <div className="hidden group-hover/card:flex transition-all duration-300 flex-1">
          <button
            disabled={bankCard.isDefault}
            className={cn(
              "flex h-7 w-fit justify-center items-center gap-1  bg-transparent text-neutral-500 text-xs cursor-pointer mb-[0.9px] px-3 rounded-sm",
              !bankCard.isDefault && "hover:bg-neutral-200/60"
            )}
          >
            {bankCard.isDefault ? (
              <>
                <CircleCheck className="stroke-[2.2px] size-4 stroke-primary" />
                <span className="text-primary font-semibold text-xs">
                  Default
                </span>
              </>
            ) : (
              <span className="font-medium">Set as default</span>
            )}
          </button>
        </div>
        <button
          className="hidden group-hover/card:flex transition-all duration-300 h-7 w-fit justify-center items-center gap-1 hover:bg-neutral-200/60 bg-transparent text-neutral-500 text-xs cursor-pointer mb-[0.9px] px-3 rounded-sm
        "
        >
          <Edit2Icon strokeWidth={"2.2px"} className="stroke-[2.2px] size-3" />
          <span className="font-medium">Modify</span>
        </button>
        <button className="hidden group-hover/card:flex transition-all w-fit duration-300 h-7 justify-center items-center gap-1 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer mb-[0.9px] px-3 rounded-sm">
          <Trash2Icon strokeWidth={"2.2px"} className="stroke-[2.2px] size-4" />
        </button>
      </div>
    </div>
  );
};

export default SettingsItemPaymentCard;
