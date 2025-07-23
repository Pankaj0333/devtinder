const { z } = require('zod');

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email({message:"Invalid email"}),
  password: z.string().min(1, "Password is required"),
});

module.exports = { registerSchema, loginSchema };
