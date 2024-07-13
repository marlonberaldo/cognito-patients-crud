import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function getUserById(req: FastifyRequest, reply: FastifyReply) {
  try {
    const paramsSchema = z.object({
      userId: z
        .string()
    });

    const { userId } = paramsSchema.parse(req.params);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        address: true,
      }
    });

    if (!user) {
      return reply.status(404).send({ message: "User not found" });
    }

    return reply.status(200).send(user);
  } catch (error) {
    console.error(error);

    return reply.status(500).send({ message: error });
  }
}