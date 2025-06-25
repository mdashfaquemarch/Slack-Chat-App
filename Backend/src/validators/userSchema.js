import { z } from 'zod';

const userSignUpSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string()
});

const userSignInSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export { userSignInSchema, userSignUpSchema };
