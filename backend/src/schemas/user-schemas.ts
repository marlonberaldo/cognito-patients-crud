import { z } from "zod";

const AddressSchema = z.object({
  cep: z
    .string(),
  street: z
    .string(),
  number: z
    .string(),
  complement: z
    .string()
    .optional(),
  neighborhood: z
    .string(),
  city: z
    .string(),
  state: z
    .string(),
  country: z
    .string(),
});

export const CreateUserSchema = z.object({
  email: z
    .string()
    .email(),
  name: z
    .string(),
  birthDate: z
    .string(),
  cpf: z
    .string()
    .length(11),
  address: AddressSchema,
});

export const UpdateUserSchema = z.object({
  name: z
    .string()
    .optional(),
  email: z
    .string()
    .email()
    .optional(),
  address: AddressSchema.optional(),
});