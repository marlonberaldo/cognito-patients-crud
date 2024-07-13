import { FastifyInstance } from "fastify";
import { usersRoutes } from "./users";

export default function routes(app: FastifyInstance, opts: any, done: () => void) {
  app.get("/", (req, reply) => {
    return reply.send("Api MedCloud- Working");
  });

  app.register(usersRoutes, { prefix: "/users" });

  done();
}