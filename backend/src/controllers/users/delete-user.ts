import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function deleteUser(req: FastifyRequest, reply: FastifyReply) {
  try {
    const paramsSchema = z.object({
      id: z
        .string()
        .uuid()
    });

    const { id: userId } = paramsSchema.parse(req.params);

    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!existingUser) {
      return reply.status(404).send({ message: "User not found" });
    }

    await prisma.user.delete({
      where: { id: userId }
    });

    return reply.status(200).send({ message: "User successfully deleted" });
  } catch (error) {
    console.error(error);

    return reply.status(500).send({ message: "Internal server error" });
  }
}