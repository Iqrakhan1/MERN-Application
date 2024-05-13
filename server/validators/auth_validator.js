const { z } = require("zod");

//create object schema

const signUpSchema = z.object({
  username: z
    .string({ require_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be atlest 3 chars. " })
    .max(255, { message: "Name must be less then 255 characters" }),
  email: z
    .string({ require_error: "email is required" })
    .trim()
    .email({ require_error: "invalid email adress" })
    .min(3, { message: "Name must be atlest 3 chars. " })
    .max(255, { message: "Name must be less then 255 characters" }),
  phone: z
    .string({ require_error: "Phone is required" })
    .trim()
    .min(10, { message: "phone must be atlest 10  digits. " })
    .max(20, { message: "phone must be less then 255 characters" }),
  Password: z
    .string({ require_error: "Password is required" })
    .min(8, { message: "password must be atlest 3 chars. " })
    .max(1024, { message: "password must be less then 1024 characters" }),
});

module.exports = signUpSchema;
