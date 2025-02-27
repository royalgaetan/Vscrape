"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { resetPasswordSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";

const ResetPassword = () => {
  const [showPasswordField, setShowPasswordField] = useState(false);
  const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      resetCode: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  useEffect(() => {
    const resetCodeValue = resetPasswordForm.watch("resetCode");
    setShowPasswordField(resetCodeValue?.length > 1);
  }, [resetPasswordForm.watch("resetCode")]);

  return (
    <div className="flex flex-1 w-screen h-screen items-center justify-center">
      <div className="flex flex-col justify-start gap-2 w-[min(450px,90%)] md:px-10 h-auto p-5 border-gray-200 border rounded-lg  bg-white">
        <h2 className="text-3xl mt-4 mb-1 w-full text-center font-medium text-[#333]">
          Reset Your Password
        </h2>
        <p className="mb-7 text-muted-foreground text-xs font-medium text-center">
          Almost there! Enter the reset code we sent to your email and set your
          new password below.
        </p>

        {/* Forgot Password Form */}
        <Form {...resetPasswordForm}>
          <form
            onSubmit={resetPasswordForm.handleSubmit((val) => {})}
            className="space-y-5 mb-10"
          >
            {/* Reset Code Field */}
            <FormField
              control={resetPasswordForm.control}
              name="resetCode"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        autoFocus
                        placeholder="Enter your reset code"
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* New Password Field */}
            {showPasswordField && (
              <>
                <FormField
                  control={resetPasswordForm.control}
                  name="newPassword"
                  render={({ field }) => {
                    return (
                      <FormItem className={cn()}>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Create a new password"
                            autoComplete="password"
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
                  control={resetPasswordForm.control}
                  name="confirmNewPassword"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Confirm your new password"
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant={"default"}
              size={"sm"}
              disabled={!resetPasswordForm.formState.isValid}
              className="w-full"
            >
              Update Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
