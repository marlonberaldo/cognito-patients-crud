import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";

export async function getAllUsers(req: FastifyRequest, reply: FastifyReply) {
  try {
    const querySchema = z.object({
      page: z
        .string()
        .optional()
        .default("1"),
      perPage: z
        .string()
        .optional()
        .default("10"),
      userName: z
        .string()
        .optional(),
    });

    const { page, perPage, userName } = querySchema.parse(req.query);

    const formattedPerPage = Number(perPage);
    const formattedPage = Number(page);

    const skip = (formattedPage - 1) * formattedPerPage;
    const take = formattedPerPage;

    const whereCondition: Prisma.UserWhereInput = {
      ...(userName && {
        name: {
          contains: userName,
        }
      })
    };

    const users = await prisma.user.findMany({
      where: whereCondition,
      skip: skip,
      take: take + 1,
      orderBy: {
        createdAt: "desc"
      },
      include: {
        address: true
      }
    });

    const hasNextPage = users.length > formattedPerPage;

    return reply
      .status(200)
      .send({
        users: hasNextPage ? users.slice(0, -1) : users,
        pageInfo: {
          currentPage: formattedPage,
          perPage: formattedPerPage,
          hasPreviousPage: formattedPage > 1,
          hasNextPage: hasNextPage,
        }
      });
  } catch (error) {
    console.error(error);

    return reply.status(500).send({ message: "Internal server error" });
  }
}
