"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgotPasswordSchema } from "@/lib/schema_validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ForgotPassword = () => {
  const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const sendResetCode = (code: z.infer<typeof forgotPasswordSchema>) => {
    redirect("/password/reset");
  };

  return (
    <div className="flex flex-1 w-screen h-screen items-center justify-center">
      <div className="flex flex-col justify-start gap-2 w-[min(450px,90%)] md:px-10 h-auto p-5 border-gray-200 border rounded-lg  bg-white">
        <h2 className="text-3xl mt-4 mb-1 w-full text-center font-medium text-[#333]">
          Forgot your Password?
        </h2>
        <p className="mb-7 text-muted-foreground text-xs font-medium text-center">
          No worries! Enter your email, and we'll send you a reset link.
        </p>

        {/* Forgot Password Form */}
        <Form {...forgotPasswordForm}>
          <form
            onSubmit={forgotPasswordForm.handleSubmit(sendResetCode)}
            className="space-y-5 mb-10"
          >
            {/* Email Field */}
            <FormField
              control={forgotPasswordForm.control}
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

            {/* Submit Button */}
            <Button
              type="submit"
              variant={"default"}
              size={"sm"}
              disabled={!forgotPasswordForm.formState.isValid}
              className="w-full"
            >
              Send Reset Link
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
