"use server";

import { revalidateTag } from "next/cache";

import { CreateUserSchema, TCreateUserSchema, TUpdateUserSchema } from "@/lib/schemas/user-schema";

import { createQueryParams } from "@/utils/create-query-params";
import { getData } from "@/utils/get-data";

export async function createUser(inputs: TCreateUserSchema) {

  const safe = CreateUserSchema.safeParse(inputs);

  if (safe.success) {
    const data = await getData("/users/create", {
      method: "POST",
      body: JSON.stringify(inputs),
    });

    revalidateTag("users");

    return data.status;
  }
}

export async function getUsers(filters: TFilters = {}) {
  const queryParams = createQueryParams(filters);

  const data = await getData(`/users/get-all?${queryParams}`, {
    next: {
      tags: ["users"]
    }
  });

  return data as { users: TUser[] };
}

export async function getUserById(userId: string) {
  const data = await getData(`/users/get-by-id/${userId}`);

  return data as TUser;
}

export async function updateUser(userId: string, inputs: TUpdateUserSchema) {
  const data = await getData(`/users/update/${userId}`, {
    method: "PATCH",
    body: JSON.stringify(inputs),
  });

  revalidateTag("users");

  return data.status;
}

export async function deleteUser(userId: string) {
  const data = await getData(`/users/delete/${userId}`, {
    method: "DELETE",
  });

  revalidateTag("users");

  return data.status;
}