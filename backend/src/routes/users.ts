import { FastifyInstance } from "fastify";
import { createUser } from "../controllers/users/create-user";
import { getAllUsers } from "../controllers/users/get-users";
import { deleteUser } from "../controllers/users/delete-user";
import { updateUser } from "../controllers/users/update-user";
import { getUserById } from "../controllers/users/get-user-by-id";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/create", createUser);

  app.get("/get-by-id/:userId", getUserById);
  app.get("/get-all", getAllUsers);

  app.patch("/update/:id", updateUser);

  app.delete("/delete/:id", deleteUser);
}