"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { CheckCircle2 } from "lucide-react";
import CustomLoader from "@/components/global/loader";
import { redirect } from "next/navigation";

const VerfyEmailPage = () => {
  const { isAuthenticated, isLoading, login } = useAuth();

  if (isLoading) {
    return <CustomLoader />;
  }
  if (isAuthenticated) {
    return redirect("/onboarding");
  }

  return (
    <div className="flex flex-1 w-screen h-screen items-center justify-center">
      <div className="flex flex-col justify-start gap-2 w-[min(450px,90%)] md:px-10 h-auto p-5 border-gray-200 border rounded-lg  bg-white">
        <h2 className="flex flex-1 justify-center text-3xl mt-4 mb-1 w-full text-center font-medium text-[#333]">
          <CheckCircle2 size={"2.2rem"} className="mr-2 stroke-primary" />
          <span> Verified!</span>
        </h2>
        <p className="mb-4 text-muted-foreground text-xs font-medium text-center">
          Your account has been successfully verified.
        </p>

        <Button
          type="submit"
          variant={"default"}
          size={"sm"}
          onClick={login}
          className="w-full mb-7"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default VerfyEmailPage;
