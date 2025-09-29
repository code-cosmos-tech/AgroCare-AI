const {z} = require("zod");

const registerSchema = z.object({
    username: z
    .string({required_error: "Username is required."})
    .trim()
    .min(4, {message: "Username must be of atleast 4 characters."}),
    email: z
    .string({required_error: "Email is required."})
    .email({message: "Invalid email"})
    .trim(),
    phone: z
    .string({required_error: "Phone is required."})
    .trim()
    .regex(/^[6-9]\d{9}$/, {message: "Invalid phone number format."}),
    password: z
    .string({required_error: "Password is required."})
    .trim()
    .min(6, {message: "Password must be atleast 6 characters."})
});

const loginSchema = z.object({
    email: z
    .string({required_error: "Email is required."})
    .email({message: "Invalid email"})
    .trim(),
    password: z
    .string({required_error: "Password is required."})
    .trim()
    .min(6, {message: "Password must be atleast 6 characters."})
});

module.exports = {registerSchema, loginSchema};