import { z } from "zod";
import { appUseCaseNames } from "./constants";

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
