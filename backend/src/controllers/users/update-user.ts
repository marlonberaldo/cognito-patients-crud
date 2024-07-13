import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { UpdateUserSchema } from "../../schemas/user-schemas";
import { prisma } from "../../lib/prisma";

export async function updateUser(req: FastifyRequest, reply: FastifyReply) {
  try {
    const paramsSchema = z.object({
      id: z
        .string()
        .uuid()
    });

    const { id } = paramsSchema.parse(req.params);

    const parsedData = UpdateUserSchema.safeParse(req.body);

    if (!parsedData.success) {
      return reply.status(400).send({ message: "Invalid data" });
    }

    const { name, email, address } = parsedData.data;

    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return reply.status(404).send({ message: "User not found" });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        address: {
          update: address
        }
      }
    });

    return reply.status(200).send(updatedUser);
  } catch (error) {
    console.error(error);

    return reply.status(500).send({ message: "Internal server error" });
  }
}
