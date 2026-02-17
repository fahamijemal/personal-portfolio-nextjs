import { z } from "zod";

/**
 * Contact form schema - shared between API route and client.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or less")
    .trim(),
  email: z.string().email("Invalid email address").max(254),
  subject: z
    .string()
    .max(200, "Subject must be 200 characters or less")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(1, "Message is required")
    .max(5000, "Message must be 5000 characters or less"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Sign-up form schema - client-side password validation.
 */
export const signUpSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must include uppercase, lowercase, and a number"
      ),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
