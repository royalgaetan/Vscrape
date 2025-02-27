"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { appName, appUseCases } from "@/lib/constants";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { onboardingFormSchema } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { generateAvatar } from "@/lib/avatar";
import { RefreshCwIcon } from "lucide-react";

const OnboaringPage = () => {
  const [open, setOpen] = useState(true);
  const pathName = usePathname();
  const [avatarImage, setAvatarImage] = useState("");

  const onboardingForm = useForm<z.infer<typeof onboardingFormSchema>>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      avatar: "",
      name: "",
      reason_for_using: [],
    },
  });

  useEffect(() => {
    generateRandomAvatar();
  }, []);

  useEffect(() => {
    if (pathName === "/onboarding") {
      setOpen(true);
    }
  }, [pathName, open]);

  const handleOnboardingForm = () => {
    redirect("/wizard");
    setOpen(false);
  };

  const generateRandomAvatar = (seed?: string) => {
    setAvatarImage((prev) => generateAvatar(seed)?.toDataUri() ?? "");
    onboardingForm.setValue("avatar", avatarImage);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)} modal>
      <DialogContent
        hideCloseButton
        className="flex flex-col gap-2 w-[min(600px,90%)] h-auto md:px-10"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-3xl mt-4 mb-1 w-full text-center font-medium text-[#333]">
            Welcome to {appName}
          </DialogTitle>
          <DialogDescription className="mb-7 text-muted-foreground text-xs font-medium text-center">
            Tell us a bit about you and how you plan to use the app...
          </DialogDescription>
        </DialogHeader>
        <div className="gap-4 py-4 mt-5">
          <Form {...onboardingForm}>
            <form
              onSubmit={onboardingForm.handleSubmit(handleOnboardingForm)}
              className=""
            >
              <div className="flex flex-1 max-sm:flex-col gap-4 mb-7">
                {/* Avatar Field (Image) */}
                <div className="flex w-1/4 items-start justify-center max-sm:w-full">
                  <FormField
                    control={onboardingForm.control}
                    name="avatar"
                    render={({ field }) => {
                      return (
                        <div className="w-20 h-20 rounded-full mb-3 relative">
                          <Image
                            alt="Avatar Image"
                            src={avatarImage}
                            fill
                            className="object-cover rounded-full select-none"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              generateRandomAvatar();
                            }}
                            className="active:scale-90 transition-all duration-100 ease-in-out absolute bg-secondary cursor-pointer rounded-full p-1 -bottom-1 -right-0 border-white border-2 flex flex-1 justify-center items-center"
                          >
                            <RefreshCwIcon
                              size={"0.9rem"}
                              className="stroke-secondary-foreground/80"
                            />
                          </button>
                        </div>
                      );
                    }}
                  />
                </div>

                <div className="flex flex-col gap-4 w-full">
                  {/* Name Field */}
                  <FormField
                    control={onboardingForm.control}
                    name="name"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Your name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              autoFocus
                              placeholder="What is your name?"
                              autoComplete="name"
                              className="mb-4"
                              onChange={(e) => {
                                field.onChange(e);
                                generateRandomAvatar(e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  {/* Reason for Using */}

                  <FormField
                    control={onboardingForm.control}
                    name="reason_for_using"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-col mt-4">
                          <FormLabel className="mb-3">
                            What’s your main reason for trying {appName}?
                          </FormLabel>

                          <FormControl>
                            <div
                              className="flex flex-wrap gap-2 pb-2"
                              {...field}
                            >
                              {Object.entries(appUseCases).map(
                                ([name, icon]) => {
                                  const Icon = icon;
                                  const isSelected = field.value.includes(name);
                                  return (
                                    <Badge
                                      key={name}
                                      onClick={() => {
                                        const newSelection =
                                          field.value.includes(name)
                                            ? field.value.filter(
                                                (reason) => reason !== name
                                              )
                                            : [...field.value, name];

                                        field.onChange(newSelection);
                                      }}
                                      variant="secondary"
                                      className={cn(
                                        "hover:bg-secondary/60 transition-all duration-100 text-muted-foreground font-medium cursor-pointer",
                                        isSelected &&
                                          "bg-primary text-white font-semibold hover:bg-primary"
                                      )}
                                    >
                                      <Icon size={"0.8rem"} className="mr-1" />
                                      {name}
                                    </Badge>
                                  );
                                }
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-1 justify-end sm:space-x-2">
                <Button
                  type="submit"
                  variant={"default"}
                  size={"sm"}
                  disabled={!onboardingForm.formState.isValid}
                  className="w-fit"
                >
                  Save changes
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboaringPage;
