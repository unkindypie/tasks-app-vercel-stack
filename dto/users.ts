import z from 'zod';

export const LoginUserDTO = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(6)
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .describe(
        'Password must contain at least 8 characters, 1 special symbol, 1 uppercase character and 1 number.',
      ),
  })
  .required({
    email: true,
    password: true,
  });

export type LoginUserDTOType = z.infer<typeof LoginUserDTO>;

export const SignUpUserDTO = z
  .object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email().max(255),
    password: z
      .string()
      .min(6)
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .describe(
        'Password must contain at least 8 characters, 1 special symbol, 1 uppercase character and 1 number.',
      )
      .max(255),
  })
  .required({
    email: true,
    password: true,
    firstName: true,
    lastName: true,
  });

export type SignUpUserDTOType = z.infer<typeof SignUpUserDTO>;
