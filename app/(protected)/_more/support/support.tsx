import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { userEmail } from "@/lib/fake_data";
import { supportFormSchema } from "@/lib/schema_validation";
import { delay } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Headset, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Support = () => {
  const [isLoading, setIsLoading] = useState(false);
  const supportForm = useForm<z.infer<typeof supportFormSchema>>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      email: userEmail,
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof supportFormSchema>) => {
    setIsLoading(true);
    await delay(1000);
    // TODO: Submit Message to Support Ticket DB Store
    console.log(values);
    setIsLoading(false);
  };

  return (
    <div className="h-fit pt-2 pb-6 max-h-[60vh] w-full overflow-y-auto px-6">
      <Form {...supportForm}>
        <form
          onSubmit={supportForm.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormField
            control={supportForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={supportForm.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your message here..."
                    className="max-h-[90px]"
                    {...field}
                  />
                </FormControl>
                <div className="h-1"></div>
                <FormDescription className="text-muted-foreground my-2 text-xs">
                  Your message will be forwarded to our support team, and you’ll
                  receive a direct reply via email. Keep an eye on your inbox.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-1 justify-end w-full">
            <Button
              type="submit"
              variant={"default"}
              size={"sm"}
              disabled={!supportForm.formState.isValid || isLoading}
              className="w-36"
            >
              {isLoading ? (
                <Loader2 className="animate-spin text-white" />
              ) : (
                <span className="flex gap-1">
                  Send to Support
                  <Headset />
                </span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Support;
