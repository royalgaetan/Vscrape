"use client";

import { copyToClipboard, delay } from "@/lib/utils";
import { useState } from "react";

export const useCopy2Clipboard = () => {
  const [textCopied, setTextCopied] = useState<boolean | null>(null);
  const [isTextBeingCopied, setIsTextBeingCopied] = useState<boolean>(false);

  const copy2Clipboard = async (secretKey: string) => {
    setIsTextBeingCopied(true);
    const res = await copyToClipboard(secretKey);
    setTextCopied(res);
    await delay(200);
    setIsTextBeingCopied(false);
    await delay(1000);
    setTextCopied(null);
  };

  return {
    textCopied,
    isTextBeingCopied,
    copy2Clipboard,
  };
};
