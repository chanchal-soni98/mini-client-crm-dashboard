import { z } from "zod";

const phoneRegex = /^[6-9]\d{9}$/;
const zipRegex = /^\d{5,6}$/;

export const clientSchema = z.object({
  name: z
    .string()
    .min(2, "Name should be at least 2 characters")
    .trim()
    .refine((val) => val.length > 0, { message: "Name is required" }),

  email: z.string().email("Invalid email").trim(),

  phone: z
    .string()
    .regex(phoneRegex, "Invalid phone number")
    .refine((val) => val.length === 10, { message: "Phone must be 10 digits" }),

 tags: z
    .array(z.string().min(1, "Tag cannot be empty"))
    .min(1, { message: "At least one tag is required" }),

  address: z.object({
    city: z
      .string()
      .trim()
      .min(3, { message: "City is required" }),

    state: z
      .string()
      .trim()
      .min(2, { message: "State is required" }),

    zip: z
      .string()
      .regex(zipRegex, "Invalid zip code (must be 5 or 6 digits)")
      .min(5, "Zip must be at least 5 digits"),
  }),
});
