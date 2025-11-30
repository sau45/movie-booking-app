const { z } = require("zod");

const userZodSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long").optional(), // because DB me required nahi tha
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"), // recommended
});

module.exports = userZodSchema;
