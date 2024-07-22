import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string()
    .email({ message: "Email inválido." })
    .min(2, { message: "Email deve ser maior que 2 caracteres." }),
  password: z.string().min(6, {
    message: "Senha deve ter no mínimo 6 caracteres."
  })
});
export type TSignIn = z.infer<typeof SignInSchema>;

export const SignUpSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter no mínimo duas letras." }).trim(),
  email: z.string().email({ message: "Email inválido" }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character."
    })
    .regex(/[A-Z]/, { message: "Contain at least one capital letter." })
    .trim(),
});
export type TSignUp = z.infer<typeof SignUpSchema>;

export const ConfirmSignUpSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  code: z.string().length(6, { message: "Code must be 6 characters long." })
});
export type TConfirmSignUp = z.infer<typeof ConfirmSignUpSchema>;
