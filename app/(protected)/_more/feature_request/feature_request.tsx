import React, { useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { featureRequestSchema } from "@/lib/schema_validation";
import { delay } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Rocket } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { featureCategories, featureFrequencyOfUse } from "@/lib/constants";

const FeatureRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const featureRequestForm = useForm<z.infer<typeof featureRequestSchema>>({
    resolver: zodResolver(featureRequestSchema),
    defaultValues: {
      featureDescription: "",
      expectedOutcome: "",
      frequencyOfUse: "Daily",
      category: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof featureRequestSchema>) => {
    setIsLoading(true);
    await delay(1000);
    // TODO: Submit Request to Feature Requests DB Store
    console.log(values);
    setIsLoading(false);
  };

  return (
    <Form {...featureRequestForm}>
      <form
        onSubmit={featureRequestForm.handleSubmit(onSubmit)}
        className="flex flex-col max-h-[90vh] w-full"
      >
        <div className="h-[65vh] pt-2 pb-6 overflow-y-auto px-6 space-y-4">
          <p className="mb-5 text-muted-foreground text-xs">
            We're always eager to hear about your needs, wishes, and requests.
            When you request a feature, we carefully analyze it and add it to
            our backlog. You’ll be kept updated on the progress until it’s ready
            to be shipped. Feel free to tell us about the feature you'd like to
            see!
          </p>

          {/* Feature Category: select */}
          <FormField
            control={featureRequestForm.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        className="text-xs"
                        placeholder="Select a feature category"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {featureCategories.map((featureCategory) => (
                      <SelectItem
                        className="text-xs"
                        key={featureCategory.value}
                        value={featureCategory.value}
                      >
                        {featureCategory.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Feature Description */}
          <FormField
            control={featureRequestForm.control}
            name="featureDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please describe the feature you'd like us to develop for you..."
                    className="max-h-[90px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Feature Frequency of Use: select */}
          <FormField
            control={featureRequestForm.control}
            name="frequencyOfUse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frequency Of Use</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        className="text-xs"
                        placeholder="Select your expected frequency of use"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {featureFrequencyOfUse.map((frequency) => (
                      <SelectItem
                        className="text-xs"
                        key={frequency}
                        value={frequency}
                      >
                        {frequency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Expected Outcome */}
          <FormField
            control={featureRequestForm.control}
            name="expectedOutcome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expected Outcome</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="What do you expects to achieve with this feature and can you explain the impact of this feature on your work or experience."
                    className="max-h-[90px]"
                    {...field}
                  />
                </FormControl>
                <div className="h-1"></div>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end w-full bg-white border-t-2 border-neutral-400/20 px-7 py-4 bottom-0 left-0 ">
          <Button
            type="submit"
            variant={"default"}
            size={"sm"}
            disabled={!featureRequestForm.formState.isValid || isLoading}
            className="w-36"
          >
            {isLoading ? (
              <Loader2 className="animate-spin text-white" />
            ) : (
              <span className="flex gap-1">
                <Rocket />
                <span> Request feature</span>
              </span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FeatureRequest;
