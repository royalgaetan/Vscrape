"use client";

import { copyToClipboard } from "@/lib/dom_utils";
import { delay } from "@/lib/numbers_utils";
import { useState } from "react";

export const useCopy2Clipboard = () => {
  const [textCopied, setTextCopied] = useState<boolean | null>(null);
  const [isTextBeingCopied, setIsTextBeingCopied] = useState<boolean>(false);

  const copy2Clipboard = async (secretKey: string) => {
    setIsTextBeingCopied(true);
    const res = await copyToClipboard(secretKey);
    setTextCopied(res);
    await delay(500);
    setIsTextBeingCopied(false);
    await delay(1500);
    setTextCopied(null);
  };

  return {
    textCopied,
    isTextBeingCopied,
    copy2Clipboard,
  };
};
