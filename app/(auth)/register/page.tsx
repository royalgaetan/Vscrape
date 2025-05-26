"use client";

import { registerFormSchema } from "@/lib/schema_validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import LogoAndText from "../_components/logo_and_text";
import { useAuth } from "@/hooks/useAuth";
import CustomLoader from "@/components/global/loader";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { isValid, z } from "zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import TextSeparator from "@/components/global/text_separator";

const RegisterPage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
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
          Sign Up
        </h2>
        <p className="mb-7 text-muted-foreground text-xs font-medium text-center">
          The future of automation is here—scrape, extract, and export on
          autopilot.
        </p>

        {/* Register Form */}
        <Form {...registerForm}>
          <form
            onSubmit={registerForm.handleSubmit(() => {})}
            className="space-y-5"
          >
            {/* Email Field */}
            <FormField
              control={registerForm.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
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
              control={registerForm.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Confirm Password Field */}
            <FormField
              control={registerForm.control}
              name="confirmPassword"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Confirm your password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant={"default"}
              size={"sm"}
              className="w-full"
              disabled={!registerForm.formState.isValid}
            >
              Sign Up
            </Button>
          </form>
        </Form>

        {/* Already have an account? Login link */}
        <div className="mt-5 mb-6 text-sm font-medium flex flex-1 justify-center">
          <span>Already have an account?</span>
          <Link
            href={"/login"}
            className="no-underline text-primary ml-1 hover:text-primary/70"
          >
            Login
          </Link>
        </div>

        {/* Separator */}
        <TextSeparator text="or" />

        {/* Google Sign-In Button*/}
        <div className="flex flex-1 justify-center items-center mt-2 mb-8">
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
      </div>
    </div>
  );
};

export default RegisterPage;
