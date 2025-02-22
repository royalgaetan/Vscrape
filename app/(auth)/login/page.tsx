"use client";
import AuthContext from "@/providers/authProvider";
import { redirect } from "next/navigation";
import React, { useContext } from "react";

const LoginPage = () => {
  const { isAuthenticated, isLoading, login } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isAuthenticated) {
    return redirect("/dashboard");
  }

  return (
    <>
      <h1>LoginPage</h1>

      <br />
      <button onClick={() => login()}>Login ➡️</button>
    </>
  );
};

export default LoginPage;
