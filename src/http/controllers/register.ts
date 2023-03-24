import { FastifyRequest, FastifyReply } from "fastify";
import { hash } from "bcryptjs";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  const passwordHash = await hash(password, 6);

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: passwordHash
    }
  });

  return reply.status(201).send();
}