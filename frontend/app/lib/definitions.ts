import { z } from 'zod';

export const SignupFormSchema = z
  .object({
    name: z.string().min(3, { message: 'Name must be at least 2 characters long.' }).trim(),
    surname: z.string().min(3, { message: 'Surname must be at least 3 characters long.' }).trim(),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
      .string()
      .min(8, { message: 'Be at least 8 characters long' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
      })
      .trim(),
    confirm: z
      .string()
      .min(8, { message: 'Be at least 8 characters long' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
      })
      .trim(),
    gender: z.string().trim(),
    birthdate: z
      .date({
        required_error: 'Please select a date and time',
        invalid_type_error: "That's not a date!",
      })
      .max(new Date(), { message: 'Too young!' }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

export type FormState =
  | {
      errors?: {
        name?: string[];
        surname?: string[];
        email?: string[];
        password?: string[];
        confirm?: string[];
        birthdate?: string[];
        gender?: string[];
      };
      message?: string;
    }
  | undefined;
