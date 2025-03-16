import { z } from "zod";
import {
  appUseCaseNames,
  featureFrequencyOfUse,
  reportTypeValues,
} from "./constants";

export const verificationCodeSchema = z.string().min(1).max(24);
export const emailSchema = z
  .string()
  .email({ message: "Please enter a valid email address." })
  .min(4, { message: "Email must be at least 4 characters long." })
  .max(255, { message: "Email must not exceed 255 characters." });
export const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters long." })
  .max(255, { message: "Password must not exceed 255 characters." });

export const authFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerFormSchema = authFormSchema
  .extend({
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    resetCode: verificationCodeSchema,
    newPassword: passwordSchema,
    confirmNewPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

// Onboading Form
export const onboardingFormSchema = z.object({
  avatar: z.string().min(1),
  name: z
    .string()
    .min(2, { message: "Your name must be at least 2 characters long." })
    .max(255, { message: "Your name must not exceed 255 characters." }),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  reason_for_using: z.array(z.enum(appUseCaseNames)).min(1, {
    message: "At least one use case must be selected.",
  }),
});

// Support Form
export const supportFormSchema = z.object({
  email: emailSchema,
  message: z
    .string()
    .min(4, { message: "Your message must be at least 4 characters long." })
    .max(2000, { message: "Your message must not exceed 2000 characters." }),
});

// Report Form
export const reportFormSchema = z.object({
  reportType: z
    .enum(reportTypeValues, {
      errorMap: () => ({ message: "Please select a type of report." }),
    })
    .refine((val) => reportTypeValues.includes(val), {
      message: "Please select a valid type of report.",
    }),
  reportMessage: z
    .string()
    .min(4, { message: "Your report must be at least 4 characters long." })
    .max(2000, { message: "Your report must not exceed 2000 characters." }),
  reportScreenshot: z.string().optional(),
});

// Feature Request Form
export const featureRequestSchema = z.object({
  category: z.string().min(1, { message: "Category is required." }),

  featureDescription: z
    .string()
    .min(10, {
      message: "Your feature description must be at least 10 characters.",
    })
    .max(1000, {
      message: "Your feature description should not exceed 1000 characters.",
    }),

  frequencyOfUse: z.enum(featureFrequencyOfUse as [string, ...string[]], {
    errorMap: () => ({ message: "Please select a valid frequency." }),
  }),

  expectedOutcome: z.string().optional(),
});
