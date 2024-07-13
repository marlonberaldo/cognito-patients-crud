import { z } from "zod";

const AddressSchema = z.object({
  cep: z
    .string()
    .length(8, { message: "CEP deve ter 8 caracteres." }),
  street: z
    .string()
    .min(3, { message: "Rua é obrigatório." }),
  number: z
    .string()
    .min(1, { message: "Número é obrigatório." }),
  complement: z
    .string()
    .optional(),
  neighborhood: z
    .string()
    .min(3, { message: "Bairro é obrigatório." }),
  city: z
    .string()
    .min(3, { message: "Cidade é obrigatório." }),
  state: z
    .string(),
  country: z
    .string()
    .min(3, { message: "País é obrigatório." }),
});

export const CreateUserSchema = z.object({
  email: z
    .string()
    .email(),
  name: z
    .string()
    .min(3, { message: "Nome deve ter no mínimo 3 caracteres." })
  ,
  birthDate: z
    .coerce
    .date(),
  cpf: z
    .string()
    .length(11, { message: "CPF deve ter 11 caracteres." }),
  address: AddressSchema,
});
export type TCreateUserSchema = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = z.object({
  email: z
    .string()
    .email()
    .optional(),
  name: z
    .string()
    .optional(),
  birthDate: z
    .coerce
    .date()
    .readonly()
    .optional(),
  cpf: z
    .string()
    .readonly()
    .optional(),
  address: AddressSchema.optional(),
});
export type TUpdateUserSchema = z.infer<typeof UpdateUserSchema>;