import type { FastifyInstance } from "fastify";

import { create } from "./create";
import { search } from "./search";
import { fetchNearby } from "./fetch-nearby";

import { verifyJWT } from "../../middlewares/verify-jwt";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/gyms/search", search);
  app.get("/gyms/nearby", fetchNearby);

  app.post("gyms", create);
}
