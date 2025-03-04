"use client";
import { redirect } from "next/navigation";
import React from "react";
import LogoAndText from "../_components/logo_and_text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import CustomLoader from "@/components/global/loader";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authFormSchema } from "@/lib/schema_validation";
import Link from "next/link";

const LoginPage = () => {
  const { isAuthenticated, isLoading, login } = useAuth();
  const loginForm = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  if (isLoading) {
    return <CustomLoader />;
  }
  if (isAuthenticated) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex flex-1 w-screen h-screen items-center justify-center">
      <div className="flex flex-col gap-2 w-[min(450px,90%)] md:px-10 h-auto p-5 border-gray-200 border rounded-lg  bg-white">
        <div className="mt-2 ">
          <LogoAndText />
        </div>

        <h2 className="text-3xl mt-4 mb-1 w-full text-center font-medium text-[#333]">
          Welcome back
        </h2>
        <p className="mb-7 text-muted-foreground text-xs font-medium text-center">
          Enter your email and password to access your account
        </p>

        {/* Login Form */}
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(login)} className="space-y-5">
            {/* Email Field */}
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoFocus
                        placeholder="Enter your email"
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {/* Password Field */}
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your password"
                        autoComplete="password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Forgot Password Button */}
            <div className="flex flex-1 justify-end">
              <Link
                href={"/password/forgot"}
                className="no-underline text-primary ml-1 hover:text-primary/70 text-xs font-semibold"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant={"default"}
              size={"sm"}
              disabled={!loginForm.formState.isValid}
              className="w-full"
            >
              Login to your account
            </Button>
          </form>
        </Form>

        {/* Google Sign-In Button*/}
        <div className="flex flex-1 justify-center items-center my-2">
          <Button
            type="submit"
            variant={"outline"}
            size={"sm"}
            className="w-full"
          >
            <i className="ci ci-google ci-1x mr-1"></i>
            <span>Sign in with Google</span>
          </Button>
        </div>

        {/* Don't Have An Account? Sign Up link */}
        <div className="mt-5 mb-6 text-sm font-medium flex flex-1 justify-center">
          <span>Don't have an account yet?</span>
          <Link
            href={"/register"}
            className="no-underline text-primary ml-1 hover:text-primary/70"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
