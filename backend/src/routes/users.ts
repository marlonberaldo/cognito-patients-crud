import { FastifyInstance } from "fastify";
import { createUser } from "../controllers/users/create-user";
import { getAllUsers } from "../controllers/users/get-users";
import { deleteUser } from "../controllers/users/delete-user";
import { updateUser } from "../controllers/users/update-user";
import { getUserById } from "../controllers/users/get-user-by-id";
import { ensureAuthenticated } from "../middleware/auth";

export async function usersRoutes(app: FastifyInstance) {
  app.addHook("preHandler",
    async (req, res) => {
      const { payload, errorMessage } = await ensureAuthenticated(req);

      if (!payload) {
        res.status(401).send({ message: errorMessage });
      }
    });

  app.post("/create", createUser);

  app.get("/get-by-id/:userId", getUserById);
  app.get("/get-all", getAllUsers);

  app.patch("/update/:id", updateUser);

  app.delete("/delete/:id", deleteUser);
}