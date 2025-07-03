import { z } from "zod";

const phoneRegex = /^[6-9]\d{9}$/;
const zipRegex = /^\d{5,6}$/;

export const clientSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .trim()
    .refine((val) => val.length > 0, { message: "Name cannot be empty" }),

  email: z.string().email("Invalid email").trim(),

  phone: z
    .string()
    .regex(phoneRegex, "Invalid phone number")
    .refine((val) => val.length === 10, { message: "Phone must be 10 digits" }),

  tags: z
    .array(z.string().min(1, "Tag cannot be empty"))
    .min(1, "At least 1 tag required")
    .optional(),

  address: z.object({
    city: z.string().min(1, "City is required").trim(),

    state: z.string().min(1, "State is required").trim(),

    zip: z
      .string()
      .regex(zipRegex, "Invalid zip code")
      .min(5, "Zip must be at least 5 digits"),
  }),
});
