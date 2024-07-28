import * as z from "zod";

export const SchemaCreateSoal = z.object({
  category: z.string().nonempty("Category is required"),
  amount: z
    .number()
    .min(5, "Minimum number of questions is 5")
    .nonnegative("Amount is required"),
  difficulty: z.string().optional().default(""),
  type: z.string().optional().default(""),
  timer: z.number().optional().default(5),
});

export const SchemaContentSoal = z.object({
  type: z.string().optional().default(""),
});

export const SchemaLogin = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Minimum password length is 8"),
});
