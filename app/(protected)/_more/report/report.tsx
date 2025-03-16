import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { reportFormSchema } from "@/lib/schema_validation";
import { delay } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImportIcon, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { reportTypes } from "@/lib/constants";

const Report = () => {
  const [isLoading, setIsLoading] = useState(false);
  const reportForm = useForm<z.infer<typeof reportFormSchema>>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      reportMessage: "",
      reportScreenshot: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof reportFormSchema>) => {
    setIsLoading(true);
    await delay(1000);
    // TODO: Submit Report Message to Reports DB Store
    console.log(values);
    setIsLoading(false);
  };

  return (
    <div className="h-fit pt-2 pb-6 max-h-[70vh] w-full overflow-y-auto px-6">
      <div>
        <h3 className="text-muted-foreground mb-2 text-xs">
          Let us know what went wrong. Whether it’s a bug or something unusual,
          feel free to include as much detail as possible, including screenshot
          if possible.
        </h3>
      </div>
      <Form {...reportForm}>
        <form
          onSubmit={reportForm.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Report Type: select */}
          <FormField
            control={reportForm.control}
            name="reportType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Report Type</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        className="text-xs"
                        placeholder="Select a report type"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {reportTypes.map((option) => (
                      <SelectItem
                        className="text-xs"
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Report Message Field */}
          <FormField
            control={reportForm.control}
            name="reportMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Report Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your report message here..."
                    className="max-h-[90px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Drag and Drop Area */}
          <FormField
            name="reportScreenshot"
            control={reportForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Report Screenshot (Optional)</FormLabel>
                <FormControl>
                  <div className="h-20 mb-10 mt-3 flex flex-1 justify-center gap-2 items-center rounded-lg bg-gray-200/40 hover:bg-gray-200/80 cursor-pointer transition-all duration-200">
                    <div className="flex gap-2 text-neutral-500 stroke-neutral-400 justify-center items-center">
                      <ImportIcon />
                      <span className="font-semibold text-xs">
                        Drag and drop your screenshot file here, or
                      </span>
                    </div>
                    <div>
                      <div className="flex justify-between w-full">
                        <Button
                          type="button"
                          variant={"ghost"}
                          size={"sm"}
                          className="w-fit bg-black text-white hover:text-white hover:bg-black/80 transition-all duration-100"
                          onClick={() => {}}
                        >
                          Import from your computer
                        </Button>
                      </div>
                    </div>
                  </div>
                </FormControl>
                <div className="h-1"></div>
                <FormDescription className="text-muted-foreground my-2 text-xs"></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-1 justify-end w-full">
            <Button
              type="submit"
              variant={"default"}
              size={"sm"}
              disabled={!reportForm.formState.isValid || isLoading}
              className="w-32"
            >
              {isLoading ? (
                <Loader2 className="animate-spin text-white" />
              ) : (
                "Send your report"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Report;
