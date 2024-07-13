import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../lib/prisma";
import { CreateUserSchema } from "../../schemas/user-schemas";

export async function createUser(req: FastifyRequest, reply: FastifyReply) {
  try {
    const parsedData = CreateUserSchema.safeParse(req.body);

    if (!parsedData.success) {
      console.error(parsedData.error.errors);

      return reply.status(400).send({ errors: parsedData.error.errors });
    }

    const { name, email, cpf, birthDate, address } = parsedData.data;

    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { cpf }
        ]
      }
    });

    if (userAlreadyExists) {
      return reply.status(400).send({ message: "User already exists" });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        cpf,
        birthDate,
        address: {
          create: address
        }
      },
      include: {
        address: true
      }
    });

    return reply.status(201).send({ statusCode: 201, user: newUser });
  } catch (error) {
    console.error(error);

    return reply.status(500).send({ message: "Internal server error" });
  }
}