"use client";
import CustomButton from "@/components/global/custom_button";
import AuthContext from "@/providers/authProvider";
import { redirect } from "next/navigation";
import React, { useContext } from "react";
import Image from "next/image";
import CustomLoader from "@/components/global/loader";
import { appName } from "@/lib/constants";

const LoginPage = () => {
  const { isAuthenticated, isLoading, login } = useContext(AuthContext);

  if (isLoading) {
    return <CustomLoader />;
  }
  if (isAuthenticated) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex flex-col gap-1 p-6 w-screen h-screen items-center justify-center">
      <div className="mb-2">
        <Image
          alt="Vscrape logo"
          src={"/Vscrape logo.png"}
          width={80}
          height={80}
        />
      </div>

      <h2 className="my-2 font-bold text-lg">Welcome to {appName}</h2>

      <div>
        <CustomButton text="Login" onClick={login} emoji="➡️" />
      </div>
    </div>
  );
};

export default LoginPage;
